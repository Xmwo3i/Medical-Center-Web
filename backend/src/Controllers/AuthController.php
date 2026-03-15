<?php

namespace Controllers;

class AuthController {
    private $db;
    private $table = 'users';
    private $secretKey;

    public function __construct() {
        $database = new \Database();
        $this->db = $database->getConnection();
        $this->secretKey = getenv('JWT_SECRET') ?: 'your-secret-key-change-this';
    }

    // Login
    public function login() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['username']) || !isset($data['password'])) {
            http_response_code(400);
            return ['success' => false, 'message' => 'نام کاربری و رمز عبور الزامی است'];
        }

        $sql = "SELECT * FROM {$this->table} WHERE username = ? AND is_active = 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$data['username']]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($data['password'], $user['password_hash'])) {
            http_response_code(401);
            return ['success' => false, 'message' => 'نام کاربری یا رمز عبور اشتباه است'];
        }

        // Generate JWT token
        $token = $this->generateToken($user);

        // Remove sensitive data
        unset($user['password_hash']);

        return [
            'success' => true,
            'message' => 'ورود موفق',
            'token' => $token,
            'user' => $user
        ];
    }

    // Logout (client-side removes token)
    public function logout() {
        return ['success' => true, 'message' => 'خروج موفق'];
    }

    // Get current user
    public function me() {
        $headers = getallheaders();
        
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            return ['success' => false, 'message' => 'توکن یافت نشد'];
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);
        $decoded = $this->verifyToken($token);

        if (!$decoded) {
            http_response_code(401);
            return ['success' => false, 'message' => 'توکن نامعتبر است'];
        }

        $sql = "SELECT id, username, email, full_name, role FROM {$this->table} WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$decoded['user_id']]);
        $user = $stmt->fetch();

        if (!$user) {
            http_response_code(404);
            return ['success' => false, 'message' => 'کاربر یافت نشد'];
        }

        return ['success' => true, 'user' => $user];
    }

    // Generate JWT token
    private function generateToken($user) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'user_id' => $user['id'],
            'username' => $user['username'],
            'role' => $user['role'],
            'iat' => time(),
            'exp' => time() + (7 * 24 * 60 * 60) // 7 days
        ]);

        $base64UrlHeader = $this->base64UrlEncode($header);
        $base64UrlPayload = $this->base64UrlEncode($payload);
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $this->secretKey, true);
        $base64UrlSignature = $this->base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    // Verify JWT token
    private function verifyToken($token) {
        $tokenParts = explode('.', $token);
        
        if (count($tokenParts) !== 3) {
            return false;
        }

        list($header, $payload, $signature) = $tokenParts;

        $validSignature = hash_hmac('sha256', $header . "." . $payload, $this->secretKey, true);
        $validSignature = $this->base64UrlEncode($validSignature);

        if ($signature !== $validSignature) {
            return false;
        }

        $decodedPayload = json_decode($this->base64UrlDecode($payload), true);

        // Check expiration
        if (isset($decodedPayload['exp']) && $decodedPayload['exp'] < time()) {
            return false;
        }

        return $decodedPayload;
    }

    // Helper: Base64 URL encode
    private function base64UrlEncode($text) {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($text));
    }

    // Helper: Base64 URL decode
    private function base64UrlDecode($text) {
        return base64_decode(str_replace(['-', '_'], ['+', '/'], $text));
    }
}