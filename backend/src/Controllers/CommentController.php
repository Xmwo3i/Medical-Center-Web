<?php

namespace Controllers;

use Middleware\Auth;

class CommentController
{
    private \PDO $db;
    private string $table = 'comments';

    public function __construct()
    {
        $this->db = (new \Database())->getConnection();
    }

    // GET /comments?entity_type=scan|article&entity_id=1&page&limit
    public function index(): array
    {
        $page       = max(1, (int)($_GET['page']        ?? 1));
        $limit      = min(50, max(1, (int)($_GET['limit'] ?? 10)));
        $offset     = ($page - 1) * $limit;
        $entityType = $_GET['entity_type'] ?? '';
        $entityId   = (int)($_GET['entity_id'] ?? 0);

        // Public endpoint returns only approved comments
        // Admins (Authorization header present) can see all
        $adminPayload = Auth::user();
        $onlyApproved = !$adminPayload;

        $where  = [];
        $params = [];

        if ($onlyApproved) {
            $where[]  = 'is_approved = 1';
        }
        if ($entityType !== '') {
            $where[]  = 'entity_type = ?';
            $params[] = $entityType;
        }
        if ($entityId > 0) {
            $where[]  = 'entity_id = ?';
            $params[] = $entityId;
        }

        $whereClause = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

        $stmt = $this->db->prepare(
            "SELECT id, entity_type, entity_id, user_name, rating, comment, is_approved, created_at
             FROM {$this->table} $whereClause
             ORDER BY created_at DESC LIMIT ? OFFSET ?"
        );
        $stmt->execute([...$params, $limit, $offset]);
        $comments = $stmt->fetchAll();

        $countStmt = $this->db->prepare(
            "SELECT COUNT(*) FROM {$this->table} $whereClause"
        );
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();

        return [
            'success'    => true,
            'data'       => $comments,
            'pagination' => [
                'page'  => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => (int)ceil($total / $limit),
            ],
        ];
    }

    // POST /comments  (public — anyone can submit)
    public function store(): array
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        if (empty($data['entity_type']) || empty($data['entity_id'])
            || empty($data['user_name']) || empty($data['user_email'])
            || empty($data['comment'])) {
            http_response_code(400);
            return ['success' => false, 'message' => 'اطلاعات ناقص است'];
        }

        if (!in_array($data['entity_type'], ['scan', 'article'], true)) {
            http_response_code(400);
            return ['success' => false, 'message' => 'نوع موجودیت نامعتبر است'];
        }

        $rating = isset($data['rating']) ? max(1, min(5, (int)$data['rating'])) : null;

        $stmt = $this->db->prepare("
            INSERT INTO {$this->table}
                (entity_type, entity_id, user_name, user_email,
                 rating, comment, ip_address, user_agent)
            VALUES (?,?,?,?,?,?,?,?)
        ");
        $stmt->execute([
            $data['entity_type'],
            (int)$data['entity_id'],
            htmlspecialchars($data['user_name'],  ENT_QUOTES, 'UTF-8'),
            filter_var($data['user_email'], FILTER_VALIDATE_EMAIL) ?: '',
            $rating,
            htmlspecialchars($data['comment'], ENT_QUOTES, 'UTF-8'),
            $_SERVER['REMOTE_ADDR']          ?? null,
            $_SERVER['HTTP_USER_AGENT']      ?? null,
        ]);

        http_response_code(201);
        return ['success' => true, 'message' => 'نظر شما ثبت شد و پس از تأیید نمایش داده می‌شود'];
    }

    // PUT /comments/{id}/approve  (admin only)
    public function approve(int $id): array
    {
        Auth::require();
        $this->db->prepare(
            "UPDATE {$this->table} SET is_approved = 1 WHERE id = ?"
        )->execute([$id]);
        return ['success' => true, 'message' => 'نظر تأیید شد'];
    }

    // DELETE /comments/{id}  (admin only)
    public function delete(int $id): array
    {
        Auth::require();
        $this->db->prepare(
            "DELETE FROM {$this->table} WHERE id = ?"
        )->execute([$id]);
        return ['success' => true, 'message' => 'نظر حذف شد'];
    }
}
