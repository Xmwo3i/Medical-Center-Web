<?php
$current_page = basename($_SERVER['PHP_SELF']);
?>
<nav class="navbar">
    <div class="nav-left">
        <div class="contact">
            <a href="pages/contact.php" class="btn-cta btn-cta--sweep">تماس با ما</a>
        </div>
        <div class="search">
            <img src="assets/images/search.png" alt="جستجو">
        </div>
    </div>
    
    <ul class="nav-links">
        <li><a href="index.php" class="<?php echo $current_page == 'index.php' ? 'active' : ''; ?>">
            <i class="fas fa-home me-1"></i>صفحه اصلی
        </a></li>
        <li><a href="pages/scans.php" class="<?php echo $current_page == 'scans.php' ? 'active' : ''; ?>">
            <i class="fas fa-stethoscope me-1"></i>اسکن‌ها
        </a></li>
        <li><a href="pages/articles.php" class="<?php echo $current_page == 'articles.php' ? 'active' : ''; ?>">
            <i class="fas fa-newspaper me-1"></i>مقالات
        </a></li>
        <li><a href="pages/about.php" class="<?php echo $current_page == 'about.php' ? 'active' : ''; ?>">
            <i class="fas fa-info-circle me-1"></i>درباره ما
        </a></li>
        <li><a href="pages/contact.php" class="<?php echo $current_page == 'contact.php' ? 'active' : ''; ?>">
            <i class="fas fa-phone me-1"></i>تماس با ما
        </a></li>
    </ul>
    
    <div class="logo">
        <img src="assets/images/caspian.png" alt="لوگو مرکز کاسپین" class="float-animation">
    </div>
</nav>

<!-- Spacer for fixed navbar -->
<div style="height: 80px;"></div>