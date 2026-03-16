<?php

namespace Controllers;

use Middleware\Auth;

class ArticleController
{
    private \PDO $db;
    private string $table = 'articles';

    public function __construct()
    {
        $this->db = (new \Database())->getConnection();
    }

    // GET /articles?page&limit&search&category&featured
    public function index(): array
    {
        $page     = max(1, (int)($_GET['page']     ?? 1));
        $limit    = min(50, max(1, (int)($_GET['limit'] ?? 10)));
        $offset   = ($page - 1) * $limit;
        $search   = trim($_GET['search']   ?? '');
        $category = trim($_GET['category'] ?? '');
        $featured = isset($_GET['featured']) ? (int)$_GET['featured'] : null;

        $where  = ['is_published = 1'];
        $params = [];

        if ($search !== '') {
            $where[]  = '(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
            $params[] = "%$search%";
            $params[] = "%$search%";
            $params[] = "%$search%";
        }
        if ($category !== '') {
            $where[]  = 'category = ?';
            $params[] = $category;
        }
        if ($featured !== null) {
            $where[]  = 'is_featured = ?';
            $params[] = $featured;
        }

        $whereClause = implode(' AND ', $where);

        $stmt = $this->db->prepare("
            SELECT id, title, slug, excerpt, author_name, category, tags,
                   is_featured, view_count, reading_time, published_at, created_at
            FROM {$this->table}
            WHERE $whereClause
            ORDER BY is_featured DESC, published_at DESC, created_at DESC
            LIMIT ? OFFSET ?
        ");
        $stmt->execute([...$params, $limit, $offset]);
        $articles = $stmt->fetchAll();

        $countStmt = $this->db->prepare(
            "SELECT COUNT(*) FROM {$this->table} WHERE $whereClause"
        );
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();

        return [
            'success'    => true,
            'data'       => $articles,
            'pagination' => [
                'page'  => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => (int)ceil($total / $limit),
            ],
        ];
    }

    // GET /articles/{slug}
    public function show(string $slug): array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table} WHERE slug = ? AND is_published = 1"
        );
        $stmt->execute([$slug]);
        $article = $stmt->fetch();

        if (!$article) {
            http_response_code(404);
            return ['success' => false, 'message' => 'مقاله یافت نشد'];
        }

        $this->db->prepare(
            "UPDATE {$this->table} SET view_count = view_count + 1 WHERE id = ?"
        )->execute([$article['id']]);

        return ['success' => true, 'data' => $article];
    }

    // POST /articles  (admin only)
    public function store(): array
    {
        $user = Auth::require();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        if (empty($data['title']) || empty($data['content'])) {
            http_response_code(400);
            return ['success' => false, 'message' => 'عنوان و محتوا الزامی است'];
        }

        $slug = $this->uniqueSlug($data['title']);

        $stmt = $this->db->prepare("
            INSERT INTO {$this->table}
                (title, slug, excerpt, content, featured_image,
                 author_name, category, tags, is_featured,
                 reading_time, meta_description, meta_keywords,
                 published_at, created_by)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ");
        $stmt->execute([
            $data['title'],
            $slug,
            $data['excerpt']          ?? null,
            $data['content'],
            $data['featured_image']   ?? null,
            $data['author_name']      ?? null,
            $data['category']         ?? null,
            $data['tags']             ?? null,
            $data['is_featured']      ?? 0,
            $data['reading_time']     ?? null,
            $data['meta_description'] ?? null,
            $data['meta_keywords']    ?? null,
            $data['published_at']     ?? date('Y-m-d H:i:s'),
            $user['user_id'],
        ]);

        http_response_code(201);
        return ['success' => true, 'message' => 'مقاله با موفقیت ایجاد شد', 'id' => $this->db->lastInsertId()];
    }

    // PUT /articles/{slug}  (admin only)
    public function update(string $slug): array
    {
        Auth::require();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $stmt = $this->db->prepare("
            UPDATE {$this->table} SET
                title             = COALESCE(?, title),
                excerpt           = COALESCE(?, excerpt),
                content           = COALESCE(?, content),
                featured_image    = COALESCE(?, featured_image),
                author_name       = COALESCE(?, author_name),
                category          = COALESCE(?, category),
                tags              = COALESCE(?, tags),
                is_featured       = COALESCE(?, is_featured),
                is_published      = COALESCE(?, is_published),
                reading_time      = COALESCE(?, reading_time),
                meta_description  = COALESCE(?, meta_description),
                meta_keywords     = COALESCE(?, meta_keywords),
                published_at      = COALESCE(?, published_at)
            WHERE slug = ?
        ");
        $stmt->execute([
            $data['title']            ?? null,
            $data['excerpt']          ?? null,
            $data['content']          ?? null,
            $data['featured_image']   ?? null,
            $data['author_name']      ?? null,
            $data['category']         ?? null,
            $data['tags']             ?? null,
            $data['is_featured']      ?? null,
            $data['is_published']     ?? null,
            $data['reading_time']     ?? null,
            $data['meta_description'] ?? null,
            $data['meta_keywords']    ?? null,
            $data['published_at']     ?? null,
            $slug,
        ]);

        return ['success' => true, 'message' => 'مقاله با موفقیت بروزرسانی شد'];
    }

    // DELETE /articles/{slug}  (admin only)
    public function delete(string $slug): array
    {
        Auth::require();
        $this->db->prepare("DELETE FROM {$this->table} WHERE slug = ?")->execute([$slug]);
        return ['success' => true, 'message' => 'مقاله با موفقیت حذف شد'];
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
