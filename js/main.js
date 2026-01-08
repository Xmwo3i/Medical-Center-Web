// فایل JavaScript اصلی

document.addEventListener('DOMContentLoaded', function() {
    // فعال کردن منوهای فعلی
    highlightCurrentPage();
    
    // سیستم فیلتر خدمات
    initFilterSystem();
    
    // سیستم نظرات
    initCommentSystem();
    
    // سیستم نوبت‌گیری
    initAppointmentSystem();
    
    // اسکرول نرم
    initSmoothScroll();
    
    // لودر تصاویر
    initImageLoader();
});

// هایلایت صفحه جاری در منو
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.php')) {
            link.classList.add('active');
        }
    });
}

// سیستم فیلتر خدمات
function initFilterSystem() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // حذف کلاس active از همه دکمه‌ها
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // افزودن کلاس active به دکمه کلیک شده
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // فیلتر کردن کارت‌ها
            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// سیستم نظرات
function initCommentSystem() {
    const commentForms = document.querySelectorAll('.comment-form form');
    
    commentForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            try {
                // نمایش لودینگ
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
                submitBtn.disabled = true;
                
                // ارسال نظرات (این بخش باید با PHP پیاده‌سازی شود)
                const response = await submitComment(formData);
                
                if (response.success) {
                    // نمایش پیام موفقیت
                    showAlert('نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود.', 'success');
                    this.reset();
                    
                    // رفرش نظرات
                    if (response.commentsHtml) {
                        document.querySelector('.comments-list').innerHTML = response.commentsHtml;
                    }
                } else {
                    showAlert(response.message || 'خطا در ارسال نظر', 'error');
                }
            } catch (error) {
                showAlert('خطا در ارتباط با سرور', 'error');
                console.error('Error submitting comment:', error);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });
    
    // نمایش/مخفی کردن فرم پاسخ
    const replyButtons = document.querySelectorAll('.reply-btn');
    replyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const commentId = this.getAttribute('data-comment-id');
            const replyForm = document.querySelector(`#reply-form-${commentId}`);
            
            if (replyForm.style.display === 'none' || !replyForm.style.display) {
                replyForm.style.display = 'block';
                replyForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                replyForm.style.display = 'none';
            }
        });
    });
}

// سیستم نوبت‌گیری
function initAppointmentSystem() {
    const appointmentForms = document.querySelectorAll('.appointment-form');
    
    appointmentForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // اعتبارسنجی اولیه
            if (!validateAppointmentForm(this)) {
                return;
            }
            
            try {
                // نمایش لودینگ
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ثبت...';
                submitBtn.disabled = true;
                
                // ارسال درخواست نوبت
                const response = await submitAppointment(formData);
                
                if (response.success) {
                    showAlert('نوبت شما با موفقیت ثبت شد. همکاران ما به زودی با شما تماس خواهند گرفت.', 'success');
                    this.reset();
                    
                    // ریست تاریخ‌ها
                    resetDateTimePickers();
                } else {
                    showAlert(response.message || 'خطا در ثبت نوبت', 'error');
                }
            } catch (error) {
                showAlert('خطا در ارتباط با سرور', 'error');
                console.error('Error submitting appointment:', error);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });
    
    // تنظیم حداقل تاریخ برای انتخاب
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.min = today;
    });
}

// اعتبارسنجی فرم نوبت‌گیری
function validateAppointmentForm(form) {
    const phone = form.querySelector('input[name="phone"]');
    const date = form.querySelector('input[name="date"]');
    const time = form.querySelector('input[name="time"]');
    
    // اعتبارسنجی شماره تلفن
    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(phone.value)) {
        showAlert('لطفا شماره تلفن معتبر وارد کنید (مثال: 09123456789)', 'error');
        phone.focus();
        return false;
    }
    
    // اعتبارسنجی تاریخ
    if (!date.value) {
        showAlert('لطفا تاریخ را انتخاب کنید', 'error');
        date.focus();
        return false;
    }
    
    // اعتبارسنجی زمان
    if (!time.value) {
        showAlert('لطفا زمان را انتخاب کنید', 'error');
        time.focus();
        return false;
    }
    
    return true;
}

// اسکرول نرم
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // ارتفاع نوبار
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// لودر تصاویر
function initImageLoader() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 100px 0px'
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);
    
    images.forEach(img => imageObserver.observe(img));
}

// نمایش آلرت
function showAlert(message, type = 'info') {
    // حذف آلرت قبلی اگر وجود دارد
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // ایجاد آلرت جدید
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-${getAlertIcon(type)}"></i>
            <span>${message}</span>
            <button class="alert-close">&times;</button>
        </div>
    `;
    
    // استایل‌دهی آلرت
    Object.assign(alert.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '9999',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        animation: 'slideIn 0.3s ease-out',
        maxWidth: '400px'
    });
    
    // تعیین رنگ بر اساس نوع
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    alert.style.backgroundColor = colors[type] || colors.info;
    
    // افزودن به صفحه
    document.body.appendChild(alert);
    
    // بستن آلرت
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.addEventListener('click', () => alert.remove());
    
    // بستن خودکار بعد از 5 ثانیه
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
}

// گرفتن آیکون مناسب برای آلرت
function getAlertIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// افزودن استایل‌های انیمیشن
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .custom-alert .alert-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .custom-alert .alert-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-right: auto;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s;
    }
    
    .custom-alert .alert-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// توابع شبیه‌سازی ارسال به سرور
async function submitComment(formData) {
    // این تابع باید با PHP پیاده‌سازی شود
    // اینجا فقط یک شبیه‌سازی است
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'نظر شما با موفقیت ثبت شد'
            });
        }, 1000);
    });
}

async function submitAppointment(formData) {
    // این تابع باید با PHP پیاده‌سازی شود
    // اینجا فقط یک شبیه‌سازی است
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'نوبت شما ثبت شد'
            });
        }, 1500);
    });
}

// ریست کردن انتخاب‌گرهای تاریخ و زمان
function resetDateTimePickers() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const timeInputs = document.querySelectorAll('input[type="time"]');
    
    dateInputs.forEach(input => input.value = '');
    timeInputs.forEach(input => input.value = '');
}

// جستجو در خدمات
function searchServices(query) {
    const serviceCards = document.querySelectorAll('.service-card');
    const noResults = document.getElementById('no-results');
    
    let hasResults = false;
    
    serviceCards.forEach(card => {
        const title = card.querySelector('.service-title').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const searchQuery = query.toLowerCase();
        
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
            hasResults = true;
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // نمایش پیام عدم یافتن نتیجه
    if (noResults) {
        if (!hasResults && query) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
}

// مقداردهی اولیه جستجو
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        searchServices(this.value);
    });
}