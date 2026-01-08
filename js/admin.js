// فایل JavaScript بخش مدیریت

document.addEventListener('DOMContentLoaded', function() {
    // فعال‌سازی جدول‌های DataTable
    initDataTables();
    
    // سیستم آپلود تصویر
    initImageUpload();
    
    // سیستم ویرایش سریع
    initQuickEdit();
    
    // سیستم تایید/رد سریع
    initQuickActions();
    
    // سیستم پیش‌نمایش
    initPreview();
    
    // سیستم اعتبارسنجی فرم‌ها
    initFormValidation();
    
    // سیستم گزارش‌گیری
    initReporting();
});

// فعال‌سازی DataTables
function initDataTables() {
    const tables = document.querySelectorAll('.admin-table');
    
    tables.forEach(table => {
        // افزودن قابلیت‌های DataTable ساده
        addTableFeatures(table);
    });
}

// افزودن ویژگی‌های جدول
function addTableFeatures(table) {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'جستجو...';
    searchInput.className = 'table-search';
    
    const tableHeader = table.closest('.admin-table-container').querySelector('.table-header');
    if (tableHeader) {
        tableHeader.appendChild(searchInput);
    }
    
    // قابلیت جستجو
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
    
    // قابلیت مرتب‌سازی
    const headers = table.querySelectorAll('thead th');
    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            sortTable(table, index);
        });
    });
}

// مرتب‌سازی جدول
function sortTable(table, column) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isAscending = table.getAttribute('data-sort-dir') !== 'asc';
    
    rows.sort((a, b) => {
        const aText = a.children[column].textContent.trim();
        const bText = b.children[column].textContent.trim();
        
        // چک کردن عددی بودن
        const aNum = parseFloat(aText);
        const bNum = parseFloat(bText);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return isAscending ? aNum - bNum : bNum - aNum;
        }
        
        // مرتب‌سازی متنی
        return isAscending 
            ? aText.localeCompare(bText, 'fa')
            : bText.localeCompare(aText, 'fa');
    });
    
    // حذف ردیف‌های قدیمی
    rows.forEach(row => tbody.removeChild(row));
    
    // افزودن ردیف‌های مرتب شده
    rows.forEach(row => tbody.appendChild(row));
    
    // ذخیره جهت مرتب‌سازی
    table.setAttribute('data-sort-dir', isAscending ? 'asc' : 'desc');
}

// سیستم آپلود تصویر
function initImageUpload() {
    const uploadContainers = document.querySelectorAll('.image-upload');
    
    uploadContainers.forEach(container => {
        const input = container.querySelector('input[type="file"]');
        const preview = container.querySelector('.image-preview');
        
        if (input) {
            input.addEventListener('change', function(e) {
                const file = this.files[0];
                if (!file) return;
                
                // بررسی نوع فایل
                if (!file.type.match('image.*')) {
                    showAlert('لطفا فقط فایل تصویری انتخاب کنید', 'error');
                    this.value = '';
                    return;
                }
                
                // بررسی سایز فایل (حداکثر 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    showAlert('حجم فایل نباید بیشتر از 5 مگابایت باشد', 'error');
                    this.value = '';
                    return;
                }
                
                // ایجاد پیش‌نمایش
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (!preview) {
                        const imgPreview = document.createElement('div');
                        imgPreview.className = 'image-preview';
                        imgPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                        container.appendChild(imgPreview);
                    } else {
                        preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                        preview.style.display = 'block';
                    }
                };
                reader.readAsDataURL(file);
            });
        }
        
        // قابلیت drag and drop
        container.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        container.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        container.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0 && input) {
                input.files = files;
                input.dispatchEvent(new Event('change'));
            }
        });
    });
}

// سیستم ویرایش سریع
function initQuickEdit() {
    const editButtons = document.querySelectorAll('.edit-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');
            const id = this.getAttribute('data-id');
            const type = this.getAttribute('data-type');
            
            // تبدیل سلول‌ها به فیلد ویرایش
            cells.forEach((cell, index) => {
                if (index === 0 || cell.classList.contains('actions')) return;
                
                const currentText = cell.textContent;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentText;
                input.className = 'quick-edit-input';
                cell.textContent = '';
                cell.appendChild(input);
            });
            
            // تغییر دکمه‌ها
            this.style.display = 'none';
            
            const saveBtn = document.createElement('button');
            saveBtn.className = 'btn btn-success btn-sm';
            saveBtn.innerHTML = '<i class="fas fa-save"></i>';
            saveBtn.onclick = () => saveQuickEdit(id, type, row);
            
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'btn btn-danger btn-sm';
            cancelBtn.innerHTML = '<i class="fas fa-times"></i>';
            cancelBtn.onclick = () => cancelQuickEdit(row);
            
            const actionsCell = row.querySelector('.actions');
            actionsCell.appendChild(saveBtn);
            actionsCell.appendChild(cancelBtn);
        });
    });
}

// ذخیره ویرایش سریع
async function saveQuickEdit(id, type, row) {
    const inputs = row.querySelectorAll('.quick-edit-input');
    const data = {};
    
    inputs.forEach((input, index) => {
        const fieldName = getFieldNameByIndex(index, type);
        data[fieldName] = input.value;
    });
    
    try {
        const response = await fetch(`admin/quick-edit.php?type=${type}&id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('تغییرات با موفقیت ذخیره شد', 'success');
            
            // بازگرداندن به حالت نمایش
            inputs.forEach((input, index) => {
                const cell = input.parentElement;
                cell.textContent = input.value;
            });
            
            // بازگرداندن دکمه‌ها
            const actionsCell = row.querySelector('.actions');
            actionsCell.querySelectorAll('button').forEach(btn => btn.remove());
            actionsCell.querySelector('.edit-btn').style.display = '';
        } else {
            showAlert('خطا در ذخیره تغییرات', 'error');
        }
    } catch (error) {
        showAlert('خطا در ارتباط با سرور', 'error');
        console.error('Error saving quick edit:', error);
    }
}

// لغو ویرایش سریع
function cancelQuickEdit(row) {
    const inputs = row.querySelectorAll('.quick-edit-input');
    
    inputs.forEach(input => {
        const cell = input.parentElement;
        cell.textContent = input.value; // نگه داشتن مقادیر
    });
    
    // بازگرداندن دکمه‌ها
    const actionsCell = row.querySelector('.actions');
    actionsCell.querySelectorAll('button').forEach(btn => btn.remove());
    actionsCell.querySelector('.edit-btn').style.display = '';
}

// گرفتن نام فیلد بر اساس ایندکس
function getFieldNameByIndex(index, type) {
    const fieldMaps = {
        'scan': ['name_fa', 'category', 'duration', 'price'],
        'article': ['title', 'author', 'views', 'status'],
        'user': ['username', 'email', 'role', 'created_at']
    };
    
    return fieldMaps[type]?.[index] || `field_${index}`;
}

// سیستم تایید/رد سریع
function initQuickActions() {
    const approveButtons = document.querySelectorAll('.approve-btn');
    const rejectButtons = document.querySelectorAll('.reject-btn');
    
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const type = this.getAttribute('data-type');
            approveItem(id, type, this);
        });
    });
    
    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const type = this.getAttribute('data-type');
            rejectItem(id, type, this);
        });
    });
}

// تایید آیتم
async function approveItem(id, type, button) {
    if (!confirm('آیا از تایید این مورد اطمینان دارید؟')) return;
    
    try {
        const response = await fetch(`admin/approve-item.php?type=${type}&id=${id}`);
        const result = await response.json();
        
        if (result.success) {
            showAlert('مورد با موفقیت تایید شد', 'success');
            const row = button.closest('tr');
            row.querySelector('.status-badge').textContent = 'تایید شده';
            row.querySelector('.status-badge').className = 'status-badge approved';
            button.closest('.quick-actions').remove();
        } else {
            showAlert('خطا در تایید مورد', 'error');
        }
    } catch (error) {
        showAlert('خطا در ارتباط با سرور', 'error');
        console.error('Error approving item:', error);
    }
}

// رد آیتم
async function rejectItem(id, type, button) {
    if (!confirm('آیا از رد این مورد اطمینان دارید؟')) return;
    
    try {
        const response = await fetch(`admin/reject-item.php?type=${type}&id=${id}`);
        const result = await response.json();
        
        if (result.success) {
            showAlert('مورد با موفقیت رد شد', 'success');
            const row = button.closest('tr');
            row.remove();
        } else {
            showAlert('خطا در رد مورد', 'error');
        }
    } catch (error) {
        showAlert('خطا در ارتباط با سرور', 'error');
        console.error('Error rejecting item:', error);
    }
}

// سیستم پیش‌نمایش
function initPreview() {
    const previewButtons = document.querySelectorAll('.preview-btn');
    
    previewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const type = this.getAttribute('data-type');
            showPreview(id, type);
        });
    });
}

// نمایش پیش‌نمایش
async function showPreview(id, type) {
    try {
        const response = await fetch(`admin/get-preview.php?type=${type}&id=${id}`);
        const result = await response.json();
        
        if (result.success) {
            const modal = document.createElement('div');
            modal.className = 'preview-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>پیش‌نمایش</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${result.preview}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // استایل‌دهی مدال
            Object.assign(modal.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '10000'
            });
            
            // بستن مدال
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => modal.remove());
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });
        }
    } catch (error) {
        showAlert('خطا در دریافت پیش‌نمایش', 'error');
        console.error('Error getting preview:', error);
    }
}

// سیستم اعتبارسنجی فرم‌ها
function initFormValidation() {
    const forms = document.querySelectorAll('.admin-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

// اعتبارسنجی فرم
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            highlightError(field, 'این فیلد الزامی است');
        } else {
            removeError(field);
        }
        
        // اعتبارسنجی خاص بر اساس نوع فیلد
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                highlightError(field, 'ایمیل معتبر وارد کنید');
            }
        }
        
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^09[0-9]{9}$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                highlightError(field, 'شماره تلفن معتبر وارد کنید');
            }
        }
    });
    
    return isValid;
}

// هایلایت خطا
function highlightError(field, message) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    let errorDiv = formGroup.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--danger-red)';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    
    field.style.borderColor = 'var(--danger-red)';
}

// حذف خطا
function removeError(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    
    field.style.borderColor = '';
}

// سیستم گزارش‌گیری
function initReporting() {
    const reportForms = document.querySelectorAll('.report-form');
    
    reportForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            try {
                // نمایش لودینگ
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال تولید گزارش...';
                submitBtn.disabled = true;
                
                const response = await fetch('admin/generate-report.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // نمایش گزارش
                    showReport(result.data);
                } else {
                    showAlert('خطا در تولید گزارش', 'error');
                }
            } catch (error) {
                showAlert('خطا در ارتباط با سرور', 'error');
                console.error('Error generating report:', error);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });
}

// نمایش گزارش
function showReport(data) {
    const modal = document.createElement('div');
    modal.className = 'report-modal';
    
    let reportHtml = '<h3>گزارش تولید شده</h3>';
    
    if (data.type === 'chart') {
        reportHtml += '<div class="chart-container"><canvas id="reportChart"></canvas></div>';
    } else if (data.type === 'table') {
        reportHtml += '<div class="table-responsive"><table class="report-table">';
        reportHtml += '<thead><tr>';
        data.headers.forEach(header => {
            reportHtml += `<th>${header}</th>`;
        });
        reportHtml += '</tr></thead><tbody>';
        
        data.rows.forEach(row => {
            reportHtml += '<tr>';
            row.forEach(cell => {
                reportHtml += `<td>${cell}</td>`;
            });
            reportHtml += '</tr>';
        });
        
        reportHtml += '</tbody></table></div>';
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>گزارش</h3>
                <button class="modal-close">&times;</button>
                <button class="export-btn" onclick="exportReport()">
                    <i class="fas fa-download"></i> خروجی
                </button>
            </div>
            <div class="modal-body">
                ${reportHtml}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // استایل‌دهی مدال
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000'
    });
    
    // بستن مدال
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => modal.remove());
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // ایجاد چارت اگر لازم باشد
    if (data.type === 'chart') {
        setTimeout(() => createReportChart(data), 100);
    }
}

// ایجاد چارت گزارش
function createReportChart(data) {
    const ctx = document.getElementById('reportChart').getContext('2d');
    
    new Chart(ctx, {
        type: data.chartType || 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: data.datasetLabel,
                data: data.values,
                backgroundColor: data.backgroundColor || 'rgba(13, 110, 253, 0.2)',
                borderColor: data.borderColor || 'rgba(13, 110, 253, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// خروجی گرفتن از گزارش
function exportReport() {
    const table = document.querySelector('.report-table');
    if (!table) {
        const canvas = document.getElementById('reportChart');
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'report.png';
            link.href = canvas.toDataURL();
            link.click();
        }
        return;
    }
    
    let csv = [];
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('th, td');
        
        cells.forEach(cell => {
            rowData.push(cell.textContent);
        });
        
        csv.push(rowData.join(','));
    });
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, 'report.csv');
    } else {
        link.href = URL.createObjectURL(blob);
        link.download = 'report.csv';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// نمایش آلرت (همانند main.js)
function showAlert(message, type = 'info') {
    // پیاده‌سازی مشابه main.js
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// تابع کمکی برای نمایش آلرت در کنسول (موقت)
console.showAlert = showAlert;