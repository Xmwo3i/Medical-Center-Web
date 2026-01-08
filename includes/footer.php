    <!-- Footer -->
    <footer class="bg-dark text-white mt-5 py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-4">
                    <h5 class="mb-3">
                        <i class="fas fa-hospital me-2"></i>
                        مرکز پزشکی هسته‌ای کاسپین
                    </h5>
                    <p class="text-white-50">
                        ارائه‌دهنده خدمات تخصصی اسکن‌های هسته‌ای با بیش از دو دهه تجربه
                    </p>
                    <div class="mt-3">
                        <a href="#" class="text-white me-3"><i class="fab fa-instagram fa-lg"></i></a>
                        <a href="#" class="text-white me-3"><i class="fab fa-telegram fa-lg"></i></a>
                        <a href="#" class="text-white"><i class="fab fa-whatsapp fa-lg"></i></a>
                    </div>
                </div>
                
                <div class="col-md-4 mb-4">
                    <h5 class="mb-3">لینک‌های سریع</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="index.php" class="text-white-50 text-decoration-none">خانه</a></li>
                        <li class="mb-2"><a href="#services" class="text-white-50 text-decoration-none">خدمات اسکن</a></li>
                        <li class="mb-2"><a href="#articles" class="text-white-50 text-decoration-none">مقالات</a></li>
                        <li class="mb-2"><a href="#about" class="text-white-50 text-decoration-none">درباره ما</a></li>
                        <li class="mb-2"><a href="#contact" class="text-white-50 text-decoration-none">تماس با ما</a></li>
                    </ul>
                </div>
                
                <div class="col-md-4 mb-4">
                    <h5 class="mb-3">تماس با ما</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <i class="fas fa-map-marker-alt text-primary me-2"></i>
                            تهران، خیابان ولیعصر
                        </li>
                        <li class="mb-2">
                            <i class="fas fa-phone text-primary me-2"></i>
                            ۰۲۱-۸۸۸۸۸۸۸۸
                        </li>
                        <li class="mb-2">
                            <i class="fas fa-envelope text-primary me-2"></i>
                            info@caspian-nuclear.ir
                        </li>
                    </ul>
                </div>
            </div>
            
            <hr class="bg-light">
            
            <div class="text-center pt-3">
                <p class="mb-0 text-white-50">
                    © ۱۴۰۳ کلیه حقوق برای مرکز پزشکی هسته‌ای کاسپین محفوظ است.
                </p>
            </div>
        </div>
    </footer>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Custom JS -->
    <script src="js/main.js"></script>
    
    <script>
    // JavaScript ساده
    document.addEventListener('DOMContentLoaded', function() {
        // اسکرول نرم برای لینک‌ها
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        console.log('Medical Center System Loaded');
    });
    </script>
</body>
</html>