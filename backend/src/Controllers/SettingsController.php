<?php

namespace Controllers;

use Middleware\Auth;

class SettingsController
{
    private \PDO $db;

    public function __construct()
    {
        $this->db = (new \Database())->getConnection();
    }

    // GET /settings  — public (returns all settings as key→value map)
    public function index(): array
    {
        $stmt = $this->db->query(
            "SELECT setting_key, setting_value, setting_type FROM settings ORDER BY setting_key"
        );
        $rows = $stmt->fetchAll();

        // Cast booleans stored as '0'/'1'
        $data = array_map(function ($row) {
            $value = $row['setting_value'];
            if ($row['setting_type'] === 'boolean') {
                $value = (bool)(int)$value;
            }
            return [
                'key'   => $row['setting_key'],
                'value' => $value,
            ];
        }, $rows);

        return ['success' => true, 'data' => $data];
    }

    // PUT /settings  — admin only, accepts { key, value } pairs
    public function update(): array
    {
        Auth::require();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        if (empty($data['key'])) {
            http_response_code(400);
            return ['success' => false, 'message' => 'کلید تنظیمات الزامی است'];
        }

        $stmt = $this->db->prepare(
            "UPDATE settings SET setting_value = ? WHERE setting_key = ?"
        );
        $stmt->execute([$data['value'] ?? '', $data['key']]);

        return ['success' => true, 'message' => 'تنظیمات بروزرسانی شد'];
    }
}
