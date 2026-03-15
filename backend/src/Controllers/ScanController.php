<?php

namespace Controllers;

class ScanController {
    private $db;
    private $table = 'scans';

    public function __construct() {
        $database = new \Database();
        $this->db = $database->getConnection();
    }

    // Get all scans with pagination and filters
    public function index() {
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        $offset = ($page - 1) * $limit;
        $search = isset($_GET['search']) ? $_GET['search'] : '';
        $category = isset($_GET['category']) ? $_GET['category'] : '';

        // Build query
        $sql = "SELECT * FROM {$this->table} WHERE is_published = 1";
        $params = [];

        if ($search) {
            $sql .= " AND (title LIKE ? OR description LIKE ?)";
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
        }

        if ($category) {
            $sql .= " AND category = ?";
            $params[] = $category;
        }

        $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $scans = $stmt->fetchAll();

        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM {$this->table} WHERE is_published = 1";
        $countParams = [];
        
        if ($search) {
            $countSql .= " AND (title LIKE ? OR description LIKE ?)";
            $countParams[] = "%{$search}%";
            $countParams[] = "%{$search}%";
        }

        if ($category) {
            $countSql .= " AND category = ?";
            $countParams[] = $category;
        }

        $countStmt = $this->db->prepare($countSql);
        $countStmt->execute($countParams);
        $total = $countStmt->fetch()['total'];

        return [
            'success' => true,
            'data' => $scans,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => (int)$total,
                'pages' => ceil($total / $limit)
            ]
        ];
    }

    // Get single scan by slug
    public function show($slug) {
        $sql = "SELECT * FROM {$this->table} WHERE slug = ? AND is_published = 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$slug]);
        $scan = $stmt->fetch();

        if (!$scan) {
            http_response_code(404);
            return ['success' => false, 'message' => 'اسکن یافت نشد'];
        }

        // Increment view count
        $updateSql = "UPDATE {$this->table} SET view_count = view_count + 1 WHERE id = ?";
        $updateStmt = $this->db->prepare($updateSql);
        $updateStmt->execute([$scan['id']]);

        return ['success' => true, 'data' => $scan];
    }

    // Create new scan (Admin only)
    public function store() {
        // Check authentication
        if (!$this->isAuthenticated()) {
            http_response_code(401);
            return ['success' => false, 'message' => 'دسترسی غیرمجاز'];
        }

        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (!isset($data['title']) || !isset($data['description'])) {
            http_response_code(400);
            return ['success' => false, 'message' => 'اطلاعات ناقص است'];
        }

        // Generate slug
        $slug = $this->generateSlug($data['title']);

        $sql = "INSERT INTO {$this->table} 
                (title, slug, description, full_content, category, preparation_info, 
                 procedure_info, duration, price, icon_image, main_image, created_by) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            $data['title'],
            $slug,
            $data['description'],
            $data['full_content'] ?? null,
            $data['category'] ?? null,
            $data['preparation_info'] ?? null,
            $data['procedure_info'] ?? null,
            $data['duration'] ?? null,
            $data['price'] ?? null,
            $data['icon_image'] ?? null,
            $data['main_image'] ?? null,
            $this->getCurrentUserId()
        ]);

        if ($result) {
            http_response_code(201);
            return ['success' => true, 'message' => 'اسکن با موفقیت ایجاد شد', 'id' => $this->db->lastInsertId()];
        }

        http_response_code(500);
        return ['success' => false, 'message' => 'خطا در ایجاد اسکن'];
    }

    // Update scan (Admin only)
    public function update($slug) {
        if (!$this->isAuthenticated()) {
            http_response_code(401);
            return ['success' => false, 'message' => 'دسترسی غیرمجاز'];
        }

        $data = json_decode(file_get_contents('php://input'), true);

        $sql = "UPDATE {$this->table} SET 
                title = COALESCE(?, title),
                description = COALESCE(?, description),
                full_content = COALESCE(?, full_content),
                category = COALESCE(?, category),
                preparation_info = COALESCE(?, preparation_info),
                procedure_info = COALESCE(?, procedure_info),
                duration = COALESCE(?, duration),
                price = COALESCE(?, price),
                icon_image = COALESCE(?, icon_image),
                main_image = COALESCE(?, main_image),
                is_published = COALESCE(?, is_published)
                WHERE slug = ?";

        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            $data['title'] ?? null,
            $data['description'] ?? null,
            $data['full_content'] ?? null,
            $data['category'] ?? null,
            $data['preparation_info'] ?? null,
            $data['procedure_info'] ?? null,
            $data['duration'] ?? null,
            $data['price'] ?? null,
            $data['icon_image'] ?? null,
            $data['main_image'] ?? null,
            $data['is_published'] ?? null,
            $slug
        ]);

        if ($result) {
            return ['success' => true, 'message' => 'اسکن با موفقیت بروزرسانی شد'];
        }

        http_response_code(500);
        return ['success' => false, 'message' => 'خطا در بروزرسانی اسکن'];
    }

    // Delete scan (Admin only)
    public function delete($slug) {
        if (!$this->isAuthenticated()) {
            http_response_code(401);
            return ['success' => false, 'message' => 'دسترسی غیرمجاز'];
        }

        $sql = "DELETE FROM {$this->table} WHERE slug = ?";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([$slug]);

        if ($result) {
            return ['success' => true, 'message' => 'اسکن با موفقیت حذف شد'];
        }

        http_response_code(500);
        return ['success' => false, 'message' => 'خطا در حذف اسکن'];
    }

    // Helper: Generate slug from title
    private function generateSlug($title) {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));
        return $slug . '-' . time();
    }

    // Helper: Check if user is authenticated
    private function isAuthenticated() {
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            return false;
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);
        // Implement JWT validation here
        return true; // Simplified for now
    }

    // Helper: Get current user ID from JWT
    private function getCurrentUserId() {
        return 1; // Simplified for now
    }
}