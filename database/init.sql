-- Create Database
CREATE DATABASE IF NOT EXISTS caspian_nuclear CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE caspian_nuclear;

-- Users Table (Admin only)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'super_admin') DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Scans Table
CREATE TABLE IF NOT EXISTS scans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    full_content LONGTEXT,
    icon_image VARCHAR(255),
    main_image VARCHAR(255),
    category VARCHAR(100),
    preparation_info TEXT,
    procedure_info TEXT,
    duration VARCHAR(50),
    price DECIMAL(10,2),
    is_published BOOLEAN DEFAULT TRUE,
    view_count INT DEFAULT 0,
    meta_description VARCHAR(300),
    meta_keywords VARCHAR(500),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_published (is_published),
    FULLTEXT INDEX idx_search (title, description, full_content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(255),
    author_name VARCHAR(100),
    category VARCHAR(100),
    tags TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    reading_time INT COMMENT 'in minutes',
    meta_description VARCHAR(300),
    meta_keywords VARCHAR(500),
    published_at TIMESTAMP NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_published (is_published),
    INDEX idx_featured (is_featured),
    FULLTEXT INDEX idx_search (title, excerpt, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comments Table
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('scan', 'article') NOT NULL,
    entity_id INT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_approved (is_approved),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string',
    description VARCHAR(500),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Default Admin User (password: Admin@123)
INSERT INTO users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@caspian.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'مدیر سیستم', 'super_admin');

-- Insert Sample Scans
INSERT INTO scans (title, slug, description, full_content, category, duration, is_published) VALUES
('اسکن قلب (تالیوم اسکن)', 'heart-scan', 'اسکن قلب روشی غیرتهاجمی برای بررسی جریان خون و عملکرد قلب است که در تشخیص تنگی عروق و آسیب‌های قلبی کاربرد دارد.', 'اسکن قلب یا تالیوم اسکن یکی از دقیق‌ترین روش‌های تشخیصی برای ارزیابی عملکرد قلب و جریان خون در عضله قلب است. این روش به پزشکان کمک می‌کند تا وضعیت عروق کرونری را بررسی کرده و مشکلاتی مانند تنگی عروق، آسیب به عضله قلب پس از سکته قلبی و یا ضعف عملکرد قلب را تشخیص دهند.', 'قلب و عروق', '3-4 ساعت', 1),
('اسکن استخوان', 'bone-scan', 'این اسکن نوعی تصویربرداری دقیق از استخوان‌ها و مفاصل می‌باشد که به تشخیص بیماری‌هایی مانند آرتروز، روماتیسم مفصلی و متاستاز استخوانی کمک می‌کند.', 'اسکن استخوان یک روش تصویربرداری پزشکی هسته‌ای است که برای شناسایی تغییرات غیرطبیعی در استخوان‌ها استفاده می‌شود. این تست می‌تواند مشکلاتی مانند شکستگی‌های خفیف، عفونت‌های استخوانی، آرتریت، و متاستاز سرطان به استخوان را تشخیص دهد.', 'استخوان و مفاصل', '2-3 ساعت', 1),
('اسکن کلیه (DMSA - DTPA)', 'kidney-scan', 'کلیه یکی از اندام‌های حیاتی بدن است که وظیفه اصلی آن تصفیه خون و دفع مواد زائد می‌باشد.', 'اسکن کلیه با استفاده از مواد رادیواکتیو به ارزیابی عملکرد، ساختار و جریان خون کلیه‌ها می‌پردازد. این تست شامل دو نوع اصلی است: DMSA که برای بررسی ساختار و عملکرد کلیه استفاده می‌شود و DTPA که جریان خون و تخلیه کلیه را ارزیابی می‌کند.', 'کلیه و مجاری ادراری', '2-4 ساعت', 1),
('اسکن تیروئید', 'thyroid-scan', 'اسکن تیروئید روش تصویربرداری تخصصی برای بررسی غده تیروئید است که متابولیسم بدن را کنترل می‌کند.', 'اسکن تیروئید به منظور بررسی ساختار، اندازه و عملکرد غده تیروئید انجام می‌شود. این تست می‌تواند برای تشخیص پرکاری یا کم‌کاری تیروئید، ندول‌های تیروئیدی، و سرطان تیروئید استفاده شود.', 'غدد درون‌ریز', '30-60 دقیقه', 1);

-- Insert Sample Articles  
INSERT INTO articles (title, slug, excerpt, content, author_name, category, is_published, is_featured, reading_time) VALUES
('آشنایی با پزشکی هسته‌ای', 'introduction-nuclear-medicine', 'پزشکی هسته‌ای شاخه‌ای از علوم پزشکی است که از مواد رادیواکتیو برای تشخیص و درمان بیماری‌ها استفاده می‌کند.', 'پزشکی هسته‌ای یکی از جدیدترین و پیشرفته‌ترین شاخه‌های علوم پزشکی است که با استفاده از مواد رادیواکتیو و دستگاه‌های تصویربرداری پیشرفته، امکان تشخیص دقیق و زودهنگام بسیاری از بیماری‌ها را فراهم می‌آورد. در این مقاله به بررسی کاربردها، مزایا و ایمنی این روش می‌پردازیم.', 'دکتر احمد محمدی', 'آموزشی', 1, 1, 5),
('اهمیت تشخیص زودهنگام بیماری‌های قلبی', 'early-heart-disease-detection', 'تشخیص به‌موقع بیماری‌های قلبی می‌تواند نقش مهمی در پیشگیری از عوارض جدی داشته باشد.', 'بیماری‌های قلبی و عروقی یکی از شایع‌ترین علل مرگ و میر در جهان هستند. تشخیص زودهنگام این بیماری‌ها می‌تواند به طور قابل توجهی شانس درمان موفقیت‌آمیز را افزایش دهد. در این مقاله به روش‌های مختلف تشخیص زودهنگام و اهمیت آن می‌پردازیم.', 'دکتر سارا رضایی', 'قلب و عروق', 1, 0, 7);

-- Insert Sample Settings
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'مرکز پزشکی هسته‌ای کاسپین', 'string', 'نام سایت'),
('site_phone', '011-33XXXXXX', 'string', 'شماره تماس'),
('site_email', 'info@caspian-nuclear.ir', 'string', 'ایمیل سایت'),
('site_address', 'ایران، مازندران، ساری', 'string', 'آدرس مرکز'),
('comments_require_approval', '1', 'boolean', 'نیاز به تایید نظرات');