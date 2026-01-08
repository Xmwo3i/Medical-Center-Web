<?php
session_start();
require_once 'includes/functions.php';

// تنظیم عنوان صفحه
$page_title = 'مرکز پزشکی هسته‌ای کاسپین';

// دریافت داده‌های دینامیک از دیتابیس
$scans = getScans(4); // 4 اسکن اول برای نمایش
$articles = getArticles(3); // 3 مقاله آخر
?>

<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?></title>
    
    <!-- Fonts -->
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vazirmatn@33.003/font.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Styles -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="assets/images/caspian.png">
    
    <style>
        /* استایل‌های اضافی */
        .scan-image {
            background: linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(11, 110, 79, 0.1) 100%);
            padding: 20px;
            border-radius: 20px;
            text-align: center;
        }
        
        .stats-counter {
            background: var(--grad-soft);
            padding: 40px;
            border-radius: var(--border-radius);
            text-align: center;
            margin: 50px 0;
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: bold;
            color: var(--green-dark);
            display: block;
        }
        
        .stat-label {
            color: var(--gray-dark);
            font-size: 1.2rem;
        }
    </style>
</head>
<body>
    <!-- Loading Screen -->
    <div class="loading">
        <div class="loader"></div>
    </div>

    <!-- Scroll Progress Bar -->
    <div class="scroll-progress"></div>

    <!-- Navigation -->
    <?php include 'includes/navbar.php'; ?>

    <!-- Hero Section with Video -->
    <header class="first-page">
        <section class="bg-video">
            <video autoplay muted loop>
                <source src="assets/videos/scan-device.mp4" type="video/mp4">
                مرورگر شما از تگ ویدیو پشتیبانی نمی‌کند.
            </video>
        </section>

        <div class="type-writer">
            <h1 class="type-title">
                <span id="typed"></span><span class="cursor">|</span>
            </h1>
            <p class="lead mt-4" style="color: white; font-size: 1.2rem; max-width: 600px; margin: 20px auto;">
                ارائه‌دهنده خدمات تخصصی اسکن‌های هسته‌ای، آزمایش‌های هورمونی و درمان‌های تخصصی با بیش از دو دهه تجربه
            </p>
            <div class="mt-4">
                <a href="#services" class="btn btn-cta--sweep" style="font-size: 1.1rem; padding: 15px 30px;">
                    <i class="fas fa-stethoscope me-2"></i>مشاهده خدمات
                </a>
                <a href="pages/appointment.php" class="btn" style="background: white; color: var(--green-dark); margin-right: 15px; font-size: 1.1rem; padding: 15px 30px;">
                    <i class="fas fa-calendar-check me-2"></i>نوبت‌گیری آنلاین
                </a>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="container">
        <!-- Statistics -->
        <div class="stats-counter fade-in">
            <div class="row">
                <div class="col-md-3 mb-4">
                    <span class="stat-number">۲۳+</span>
                    <span class="stat-label">سال تجربه</span>
                </div>
                <div class="col-md-3 mb-4">
                    <span class="stat-number">۱۵+</span>
                    <span class="stat-label">نوع اسکن</span>
                </div>
                <div class="col-md-3 mb-4">
                    <span class="stat-number">۵۰,۰۰۰+</span>
                    <span class="stat-label">بیمار راضی</span>
                </div>
                <div class="col-md-3 mb-4">
                    <span class="stat-number">۱۰+</span>
                    <span class="stat-label">پزشک متخصص</span>
                </div>
            </div>
        </div>

        <!-- Insurance Partners -->
        <h2 class="fade-in">بیمه‌های طرف قرارداد ما</h2>
        <div class="swiper my-train pulse-glow">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="assets/images/insurance/khadamatDarmani.png" alt="خدمات درمانی"></div>
                <div class="swiper-slide"><img src="assets/images/insurance/NiroMosalah.png" alt="بیمه نیروهای مسلح"></div>
                <div class="swiper-slide"><img src="assets/images/insurance/bimeMelat.png" alt="بیمه ملت"></div>
                <div class="swiper-slide"><img src="assets/images/insurance/bankMeli.png" alt="بانک ملی"></div>
                <div class="swiper-slide"><img src="assets/images/insurance/BankRefahKargaran.png" alt="بانک رفاه کارگران"></div>
                <div class="swiper-slide"><img src="assets/images/insurance/tamin-ejtemaee.png" alt="تامین اجتماعی"></div>
                <!-- بقیه بیمه‌ها -->
            </div>
        </div>

        <!-- Scans Section with 3D Effects -->
        <h2 class="scan-title slide-up" id="services">اسکن‌های تخصصی</h2>
        <section class="scans">
            <div class="scan-image">
                <img src="assets/images/medical-center.png" alt="مرکز پزشکی" class="rotate-3d" style="max-width: 100%;">
            </div>
            
            <div class="scan-details">
                <?php if (!empty($scans)): ?>
                    <?php foreach ($scans as $index => $scan): ?>
                    <div class="scan" style="animation-delay: <?php echo $index * 0.1; ?>s;">
                        <section class="scan-head">
                            <img src="<?php echo $scan['image_url'] ?: 'assets/images/scans/default.png'; ?>" 
                                 alt="<?php echo htmlspecialchars($scan['name_fa']); ?>"
                                 style="width: 60px; height: 60px;">
                            <h3><?php echo htmlspecialchars($scan['name_fa']); ?></h3>
                        </section>
                        <p><?php echo truncateText($scan['description'] ?? '', 120); ?></p>
                        <div class="mt-3">
                            <a href="pages/scan-detail.php?id=<?php echo $scan['id']; ?>" 
                               class="btn btn-sm" 
                               style="background: var(--green-mid); color: white; padding: 8px 20px;">
                                جزئیات بیشتر
                            </a>
                        </div>
                    </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <div class="col-12 text-center py-5">
                        <i class="fas fa-stethoscope fa-3x text-muted mb-3"></i>
                        <h4 class="text-muted">در حال بارگذاری خدمات...</h4>
                    </div>
                <?php endif; ?>
            </div>
        </section>

        <!-- Articles Section -->
        <h2 class="mt-5 mb-4 slide-up">مقالات آموزشی</h2>
        <div class="row">
            <?php if (!empty($articles)): ?>
                <?php foreach ($articles as $article): ?>
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title"><?php echo htmlspecialchars($article['title']); ?></h5>
                            <p class="card-text text-muted">
                                <?php echo truncateText($article['excerpt'] ?? '', 100); ?>
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">
                                    <i class="far fa-calendar me-1"></i>
                                    <?php echo date('Y/m/d', strtotime($article['published_date'])); ?>
                                </small>
                                <a href="pages/article-detail.php?id=<?php echo $article['id']; ?>" 
                                   class="btn btn-sm" 
                                   style="background: var(--green-mid); color: white;">
                                    مطالعه
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
        
        <div class="text-center mt-4">
            <a href="pages/articles.php" class="btn" style="background: var(--grad-button); color: white; padding: 12px 40px;">
                <i class="fas fa-newspaper me-2"></i>مشاهده همه مقالات
            </a>
        </div>

        <!-- Contact CTA -->
        <section class="services-cta slide-up" style="text-align: center; margin: 5rem 0; padding: 4rem; background: var(--grad-soft); border-radius: var(--border-radius);">
            <h2 style="color: var(--green-dark); margin-bottom: 2rem;">نیاز به مشاوره تخصصی دارید؟</h2>
            <p style="font-size: 1.2rem; margin-bottom: 3rem; max-width: 800px; margin-left: auto; margin-right: auto;">
                تیم پزشکی متخصص ما آماده پاسخگویی به سوالات شما و ارائه مشاوره رایگان می‌باشد.
            </p>
            <a href="pages/contact.php" class="btn btn-cta--sweep" style="font-size: 1.2rem; padding: 1rem 3rem; margin: 0 10px;">
                <i class="fas fa-phone me-2"></i>تماس با ما
            </a>
            <a href="pages/appointment.php" class="btn" style="background: var(--green-dark); color: white; font-size: 1.2rem; padding: 1rem 3rem; margin: 0 10px;">
                <i class="fas fa-calendar-alt me-2"></i>دریافت نوبت
            </a>
        </section>
    </main>

    <!-- Footer -->
    <?php include 'includes/footer.php'; ?>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>