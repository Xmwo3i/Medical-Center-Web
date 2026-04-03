<?php

namespace Controllers;

use Middleware\Auth;

class ScanController
{
    private \PDO $db;
    private string $table = 'scans';

    public function __construct()
    {
        $this->db = (new \Database())->getConnection();
    }

    // GET /scans?page&limit&search&category
    public function index(): array
    {
        $page     = max(1, (int)($_GET['page']     ?? 1));
        $limit    = min(50, max(1, (int)($_GET['limit'] ?? 10)));
        $offset   = ($page - 1) * $limit;
        $search   = trim($_GET['search']   ?? '');
        $category = trim($_GET['category'] ?? '');

        $where  = ['is_published = 1'];
        $params = [];

        if ($search !== '') {
            $where[]  = '(title LIKE ? OR description LIKE ? OR title_en LIKE ? OR description_en LIKE ?)';
            $params[] = "%$search%";
            $params[] = "%$search%";
            $params[] = "%$search%";
            $params[] = "%$search%";
        }
        if ($category !== '') {
            $where[]  = 'category = ?';
            $params[] = $category;
        }

        $whereClause = implode(' AND ', $where);

        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table} WHERE $whereClause ORDER BY created_at DESC LIMIT ? OFFSET ?"
        );
        $stmt->execute([...$params, $limit, $offset]);
        $scans = $stmt->fetchAll();

        $countStmt = $this->db->prepare(
            "SELECT COUNT(*) AS total FROM {$this->table} WHERE $whereClause"
        );
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();

        return [
            'success'    => true,
            'data'       => $scans,
            'pagination' => [
                'page'  => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => (int)ceil($total / $limit),
            ],
        ];
    }

    // GET /scans/{slug}
    public function show(string $slug): array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table} WHERE slug = ? AND is_published = 1"
        );
        $stmt->execute([$slug]);
        $scan = $stmt->fetch();

        if (!$scan) {
            http_response_code(404);
            return ['success' => false, 'message' => 'اسکن یافت نشد'];
        }

        // Increment view count
        $this->db->prepare(
            "UPDATE {$this->table} SET view_count = view_count + 1 WHERE id = ?"
        )->execute([$scan['id']]);

        return ['success' => true, 'data' => $scan];
    }

    // POST /scans  (admin only)
    public function store(): array
    {
        $user = Auth::require();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        if (empty($data['title']) || empty($data['description'])) {
            http_response_code(400);
            return ['success' => false, 'message' => 'عنوان و توضیحات الزامی است'];
        }

        $slug = $this->uniqueSlug($data['title']);

        $stmt = $this->db->prepare("
            INSERT INTO {$this->table}
                (title, slug, description, full_content, category,
                 preparation_info, procedure_info, duration, price,
                 icon_image, main_image, created_by)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
        ");
        $stmt->execute([
            $data['title'],
            $slug,
            $data['description'],
            $data['full_content']      ?? null,
            $data['category']          ?? null,
            $data['preparation_info']  ?? null,
            $data['procedure_info']    ?? null,
            $data['duration']          ?? null,
            $data['price']             ?? null,
            $data['icon_image']        ?? null,
            $data['main_image']        ?? null,
            $user['user_id'],
        ]);

        http_response_code(201);
        return ['success' => true, 'message' => 'اسکن با موفقیت ایجاد شد', 'id' => $this->db->lastInsertId()];
    }

    // PUT /scans/{slug}  (admin only)
    public function update(string $slug): array
    {
        Auth::require();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $stmt = $this->db->prepare("
            UPDATE {$this->table} SET
                title            = COALESCE(?, title),
                description      = COALESCE(?, description),
                full_content     = COALESCE(?, full_content),
                category         = COALESCE(?, category),
                preparation_info = COALESCE(?, preparation_info),
                procedure_info   = COALESCE(?, procedure_info),
                duration         = COALESCE(?, duration),
                price            = COALESCE(?, price),
                icon_image       = COALESCE(?, icon_image),
                main_image       = COALESCE(?, main_image),
                is_published     = COALESCE(?, is_published)
            WHERE slug = ?
        ");
        $stmt->execute([
            $data['title']            ?? null,
            $data['description']      ?? null,
            $data['full_content']     ?? null,
            $data['category']         ?? null,
            $data['preparation_info'] ?? null,
            $data['procedure_info']   ?? null,
            $data['duration']         ?? null,
            $data['price']            ?? null,
            $data['icon_image']       ?? null,
            $data['main_image']       ?? null,
            $data['is_published']     ?? null,
            $slug,
        ]);

        return ['success' => true, 'message' => 'اسکن با موفقیت بروزرسانی شد'];
    }

    // DELETE /scans/{slug}  (admin only)
    public function delete(string $slug): array
    {
        Auth::require();
        $this->db->prepare("DELETE FROM {$this->table} WHERE slug = ?")->execute([$slug]);
        return ['success' => true, 'message' => 'اسکن با موفقیت حذف شد'];
    }

    // ── Helpers ────────────────────────────────────────────────────────────────
    private function uniqueSlug(string $title): string
    {
        $base = strtolower(trim(preg_replace('/[^A-Za-z0-9]+/', '-', $title), '-'));
        $slug = $base;
        $i    = 1;
        while ($this->slugExists($slug)) {
            $slug = "$base-$i";
            $i++;
        }
        return $slug;
    }

    private function slugExists(string $slug): bool
    {
        $stmt = $this->db->prepare("SELECT 1 FROM {$this->table} WHERE slug = ?");
        $stmt->execute([$slug]);
        return (bool)$stmt->fetchColumn();
    }
}
