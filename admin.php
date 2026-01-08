<?php
// Enable all error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require_once 'config/database.php';
require_once 'includes/functions.php';
// ... rest of your code

session_start();
require_once 'config/database.php';
require_once 'includes/functions.php';

// بررسی لاگین بودن
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

// دریافت آمار
$stats = getAdminStats();
$page_title = 'پنل مدیریت';
?>

<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?></title>
    
    <!-- Styles -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vazirmatn@33.003/font.css">
    
    <style>
        .admin-container {
            display: flex;
            min-height: 100vh;
            background: var(--grad-soft);
        }
        
        .admin-sidebar {
            width: 280px;
            background: var(--grad-navbar);
            color: white;
            padding: 20px 0;
        }
        
        .admin-content {
            flex: 1;
            padding: 30px;
            background: white;
        }
        
        .stat-card {
            background: white;
            padding: 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-md);
            text-align: center;
            margin-bottom: 20px;
            transition: var(--transition);
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }
        
        .stat-icon {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            font-size: 1.8rem;
            background: var(--grad-soft);
            color: var(--green-dark);
        }
        
        .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--green-dark);
            margin: 10px 0;
        }
        
        .stat-label {
            color: var(--gray-dark);
            font-size: 1rem;
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <!-- Sidebar -->
        <div class="admin-sidebar">
            <div class="text-center p-4">
                <img src="assets/images/caspian.png" alt="Logo" style="height: 80px; margin-bottom: 20px;">
                <h4 class="mb-0">پنل مدیریت</h4>
                <small class="text-white-50">مرکز پزشکی هسته‌ای کاسپین</small>
            </div>
            
            <nav class="p-3">
                <ul class="list-unstyled">
                    <li class="mb-2">
                        <a href="admin.php" class="d-block p-3 text-white text-decoration-none rounded active">
                            <i class="fas fa-tachometer-alt me-2"></i>داشبورد
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="admin/manage-scans.php" class="d-block p-3 text-white text-decoration-none rounded">
                            <i class="fas fa-stethoscope me-2"></i>مدیریت اسکن‌ها
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="admin/manage-articles.php" class="d-block p-3 text-white text-decoration-none rounded">
                            <i class="fas fa-newspaper me-2"></i>مدیریت مقالات
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="admin/manage-users.php" class="d-block p-3 text-white text-decoration-none rounded">
                            <i class="fas fa-users me-2"></i>مدیریت کاربران
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="admin/manage-comments.php" class="d-block p-3 text-white text-decoration-none rounded">
                            <i class="fas fa-comments me-2"></i>مدیریت نظرات
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="admin/manage-appointments.php" class="d-block p-3 text-white text-decoration-none rounded">
                            <i class="fas fa-calendar-check me-2"></i>مدیریت نوبت‌ها
                        </a>
                    </li>
                    <li class="mt-4">
                        <a href="index.php" class="d-block p-3 text-white text-decoration-none rounded" 
                           style="background: rgba(255,255,255,0.1);">
                            <i class="fas fa-home me-2"></i>بازگشت به سایت
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        
        <!-- Main Content -->
        <div class="admin-content">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="mb-0" style="color: var(--green-dark);">داشبورد مدیریت</h1>
                <div>
                    <span class="me-3">خوش آمدید، <?php echo $_SESSION['user_name'] ?? 'کاربر'; ?></span>
                    <a href="logout.php" class="btn btn-sm" style="background: var(--green-dark); color: white;">
                        <i class="fas fa-sign-out-alt me-1"></i>خروج
                    </a>
                </div>
            </div>
            
            <!-- Statistics Cards -->
            <div class="row">
                <div class="col-md-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-stethoscope"></i>
                        </div>
                        <div class="stat-number"><?php echo $stats['total_scans']; ?></div>
                        <div class="stat-label">اسکن</div>
                    </div>
                </div>
                
                <div class="col-md-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-newspaper"></i>
                        </div>
                        <div class="stat-number"><?php echo $stats['total_articles']; ?></div>
                        <div class="stat-label">مقاله</div>
                    </div>
                </div>
                
                <div class="col-md-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-comments"></i>
                        </div>
                        <div class="stat-number"><?php echo $stats['total_comments']; ?></div>
                        <div class="stat-label">نظر جدید</div>
                    </div>
                </div>
                
                <div class="col-md-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-number"><?php echo $stats['total_users']; ?></div>
                        <div class="stat-label">کاربر</div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="row mt-4">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title" style="color: var(--green-dark);">دسترسی سریع</h5>
                            <div class="d-flex flex-wrap gap-3 mt-3">
                                <a href="admin/manage-scans.php?action=add" class="btn" 
                                   style="background: var(--grad-button); color: white;">
                                    <i class="fas fa-plus me-2"></i>افزودن اسکن جدید
                                </a>
                                <a href="admin/manage-articles.php?action=add" class="btn" 
                                   style="background: var(--green-mid); color: white;">
                                    <i class="fas fa-file-alt me-2"></i>افزودن مقاله
                                </a>
                                <a href="admin/manage-appointments.php" class="btn" 
                                   style="background: var(--blue-accent); color: white;">
                                    <i class="fas fa-calendar-check me-2"></i>مشاهده نوبت‌ها
                                </a>
                            </div>
                        </div>