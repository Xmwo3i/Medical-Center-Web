<?php
session_start();
require_once '../includes/functions.php';

$page_title = 'همه خدمات اسکن | مرکز پزشکی هسته‌ای کاسپین';

// دریافت همه اسکن‌ها
$scans = getScans(50); // همه اسکن‌ها

// فیلتر بر اساس دسته‌بندی
$category = $_GET['category'] ?? null;
if ($category) {
    $scans = getScans(50, $category);
}
?>

<?php include '../includes/header.php'; ?>

<div class="container py-5">
    <h1 class="mb-4">خدمات تخصصی اسکن</h1>
    
    <!-- فیلتر دسته‌بندی‌ها -->
    <div class="mb-4">
        <h5>فیلتر بر اساس دسته‌بندی:</h5>
        <div class="d-flex flex-wrap gap-2">
            <a href="?category=all" class="btn <?php echo !$category ? 'btn-primary' : 'btn-outline-primary'; ?>">
                همه
            </a>
            <a href="?category=cardiac" class="btn <?php echo $category == 'cardiac' ? 'btn-primary' : 'btn-outline-primary'; ?>">
                قلبی
            </a>
            <a href="?category=kidney" class="btn <?php echo $category == 'kidney' ? 'btn-primary' : 'btn-outline-primary'; ?>">
                کلیه
            </a>
            <a href="?category=bone" class="btn <?php echo $category == 'bone' ? 'btn-primary' : 'btn-outline-primary'; ?>">
                استخوان
            </a>
            <!-- بقیه دسته‌بندی‌ها -->
        </div>
    </div>
    
    <!-- لیست اسکن‌ها -->
    <div class="row">
        <?php if (!empty($scans)): ?>
            <?php foreach ($scans as $scan): ?>
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <?php if ($scan['image_url']): ?>
                    <img src="<?php echo $scan['image_url']; ?>" 
                         class="card-img-top" 
                         alt="<?php echo safe_output($scan['name_fa']); ?>"
                         style="height: 200px; object-fit: cover;">
                    <?php endif; ?>
                    
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">
                            <?php echo getCategoryName($scan['category']); ?>
                        </span>
                        <h5 class="card-title"><?php echo safe_output($scan['name_fa']); ?></h5>
                        <p class="card-text"><?php echo truncateText($scan['description'], 150); ?></p>
                        
                        <?php if ($scan['duration']): ?>
                        <p class="text-muted small">
                            <i class="fas fa-clock me-1"></i>
                            مدت زمان: <?php echo $scan['duration']; ?>
                        </p>
                        <?php endif; ?>
                    </div>
                    
                    <div class="card-footer bg-white border-0">
                        <div class="d-flex justify-content-between">
                            <a href="scan-detail.php?id=<?php echo $scan['id']; ?>" 
                               class="btn btn-sm btn-primary">
                                <i class="fas fa-info-circle me-1"></i>جزئیات
                            </a>
                            <a href="../pages/appointment.php?scan=<?php echo $scan['id']; ?>" 
                               class="btn btn-sm" style="background: var(--green-mid); color: white;">
                                <i class="fas fa-calendar-plus me-1"></i>نوبت
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        <?php else: ?>
            <div class="col-12 text-center py-5">
                <i class="fas fa-stethoscope fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">هیچ خدمتی یافت نشد</h4>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php include '../includes/footer.php'; ?>