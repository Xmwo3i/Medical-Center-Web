<?php

namespace Controllers;

use Middleware\Auth;

class AuthController
{
    private \PDO $db;
    private string $table = 'users';

    public function __construct()
    {
        $this->db = (new \Database())->getConnection();
    }

    // POST /auth/login
    public function login(): array
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        if (empty($data['username']) || empty($data['password'])) {
            http_response_code(400);
            return ['success' => false, 'message' => 'نام کاربری و رمز عبور الزامی است'];
        }

        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table} WHERE username = ? AND is_active = 1"
        );
        $stmt->execute([$data['username']]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($data['password'], $user['password_hash'])) {
            http_response_code(401);
            return ['success' => false, 'message' => 'نام کاربری یا رمز عبور اشتباه است'];
        }

        $token = Auth::generateToken($user);
        unset($user['password_hash']);

        return [
            'success' => true,
            'message' => 'ورود موفق',
            'token'   => $token,
            'user'    => $user,
        ];
    }

    // POST /auth/logout  (client drops the token — nothing to do server-side)
    public function logout(): array
    {
        return ['success' => true, 'message' => 'خروج موفق'];
    }

    // GET /auth/me
    public function me(): array
    {
        $payload = Auth::require();   // exits with 401 if invalid

        $stmt = $this->db->prepare(
            "SELECT id, username, email, full_name, role FROM {$this->table} WHERE id = ?"
        );
        $stmt->execute([$payload['user_id']]);
        $user = $stmt->fetch();

        if (!$user) {
            http_response_code(404);
            return ['success' => false, 'message' => 'کاربر یافت نشد'];
        }

        return ['success' => true, 'user' => $user];
    }
}
