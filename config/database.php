<?php
// تنظیمات اتصال به دیتابیس برای Docker
define('DB_HOST', 'mysql');  // نام سرویس در docker-compose
define('DB_USER', 'medical_user');
define('DB_PASS', 'medical_pass');
define('DB_NAME', 'caspian_medical_center');

// ایجاد اتصال
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // بررسی اتصال
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // تنظیم کدگذاری
    $conn->set_charset("utf8mb4");
    
} catch (Exception $e) {
    die("Database connection error: " . $e->getMessage());
}

// تابع امن برای کوئری
function db_query($sql, $params = []) {
    global $conn;
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        return false;
    }
    
    if (!empty($params)) {
        $types = str_repeat('s', count($params));
        $stmt->bind_param($types, ...$params);
    }
    
    if (!$stmt->execute()) {
        return false;
    }
    
    $result = $stmt->get_result();
    
    if ($result) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        $stmt->close();
        return $data;
    }
    
    $stmt->close();
    return $stmt->affected_rows > 0;
}