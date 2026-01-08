<?php
// توابع پرکاربرد - ترکیب شده با منطق قبلی

// دریافت اسکن‌ها
function getScans($limit = 6, $category = null) {
    if ($category) {
        $sql = "SELECT * FROM scans WHERE category = ? ORDER BY id DESC LIMIT ?";
        return db_query($sql, [$category, $limit]) ?: [];
    } else {
        $sql = "SELECT * FROM scans ORDER BY id DESC LIMIT ?";
        return db_query($sql, [$limit]) ?: [];
    }
}

// دریافت مقالات
function getArticles($limit = 3) {
    $sql = "SELECT * FROM articles ORDER BY published_date DESC LIMIT ?";
    return db_query($sql, [$limit]) ?: [];
}

// دریافت جزئیات اسکن
function getScanById($id) {
    $sql = "SELECT * FROM scans WHERE id = ?";
    $result = db_query($sql, [$id]);
    return $result ? $result[0] : null;
}

// دریافت جزئیات مقاله
function getArticleById($id) {
    $sql = "SELECT * FROM articles WHERE id = ?";
    $result = db_query($sql, [$id]);
    return $result ? $result[0] : null;
}

// دریافت نظرات
function getComments($item_id, $item_type) {
    $sql = "SELECT c.*, u.username, u.full_name 
            FROM comments c 
            LEFT JOIN users u ON c.user_id = u.id 
            WHERE c.item_id = ? AND c.item_type = ? AND c.status = 'approved'
            ORDER BY c.created_at DESC";
    return db_query($sql, [$item_id, $item_type]) ?: [];
}

// ثبت نظر جدید
function addComment($user_id, $item_id, $item_type, $content, $rating = null) {
    $sql = "INSERT INTO comments (user_id, item_id, item_type, content, rating, status) 
            VALUES (?, ?, ?, ?, ?, 'pending')";
    return db_query($sql, [$user_id, $item_id, $item_type, $content, $rating]);
}

// کوتاه کردن متن
function truncateText($text, $length = 100) {
    if (mb_strlen($text, 'UTF-8') > $length) {
        return mb_substr($text, 0, $length, 'UTF-8') . '...';
    }
    return $text;
}

// امن‌سازی خروجی
function safe_output($text) {
    return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

// دریافت نام دسته‌بندی
function getCategoryName($category) {
    $categories = [
        'cardiac' => 'قلبی',
        'kidney' => 'کلیه',
        'hepatobiliary' => 'کبد و صفرا',
        'gastrointestinal' => 'گوارشی',
        'bone' => 'استخوان',
        'endocrine' => 'غدد',
        'pulmonary' => 'ریه',
        'breast' => 'پستان',
        'infection' => 'عفونت',
        'oncology' => 'انکولوژی',
        'neurological' => 'عصبی',
        'head-neck' => 'سر و گردن'
    ];
    
    return $categories[$category] ?? $category;
}

// بررسی لاگین بودن
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// بررسی نقش کاربر
function checkRole($role) {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] === $role;
}

// نمایش پیام
function showMessage($message, $type = 'success') {
    $icons = [
        'success' => 'check-circle',
        'error' => 'exclamation-circle',
        'warning' => 'exclamation-triangle',
        'info' => 'info-circle'
    ];
    
    $icon = $icons[$type] ?? 'info-circle';
    
    return <<<HTML
    <div class="alert alert-$type">
        <i class="fas fa-$icon me-2"></i>
        $message
    </div>
HTML;
}

// ثبت نوبت
function bookAppointment($data) {
    $sql = "INSERT INTO appointments (user_id, scan_id, full_name, phone, email, appointment_date, appointment_time, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    return db_query($sql, [
        $data['user_id'] ?? null,
        $data['scan_id'] ?? null,
        $data['full_name'],
        $data['phone'],
        $data['email'] ?? '',
        $data['appointment_date'],
        $data['appointment_time'],
        $data['notes'] ?? ''
    ]);
}

// دریافت آمار برای پنل مدیریت
function getAdminStats() {
    $stats = [
        'total_scans' => db_query("SELECT COUNT(*) as count FROM scans")[0]['count'] ?? 0,
        'total_articles' => db_query("SELECT COUNT(*) as count FROM articles")[0]['count'] ?? 0,
        'total_comments' => db_query("SELECT COUNT(*) as count FROM comments WHERE status = 'pending'")[0]['count'] ?? 0,
        'total_users' => db_query("SELECT COUNT(*) as count FROM users")[0]['count'] ?? 0,
        'total_appointments' => db_query("SELECT COUNT(*) as count FROM appointments WHERE status = 'pending'")[0]['count'] ?? 0
    ];
    
    return $stats;
}