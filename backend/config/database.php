<?php

class Database
{
    private string $host;
    private string $db_name;
    private string $username;
    private string $password;

    public function __construct()
    {
        $this->host     = getenv('DB_HOST')     ?: 'mysql';
        $this->db_name  = getenv('DB_DATABASE') ?: 'caspian_nuclear';
        $this->username = getenv('DB_USERNAME') ?: 'caspian_user';
        $this->password = getenv('DB_PASSWORD') ?: 'password';
    }

    public function getConnection(): PDO
    {
        try {
            $pdo = new PDO(
                "mysql:host={$this->host};dbname={$this->db_name};charset=utf8mb4",
                $this->username,
                $this->password,
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                    // Force utf8mb4 at the connection level — this is the critical fix.
                    // Without this, MySQL can silently downgrade to latin1 and corrupt
                    // multi-byte characters like Persian/Arabic text.
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
                ]
            );
            return $pdo;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'خطا در اتصال به پایگاه داده',
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
}
