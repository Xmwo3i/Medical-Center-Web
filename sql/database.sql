-- ایجاد دیتابیس
CREATE DATABASE IF NOT EXISTS caspian_medical_center;
USE caspian_medical_center;

-- جدول اسکن‌ها
CREATE TABLE scans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_fa VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    description TEXT,
    preparation TEXT,
    image_url VARCHAR(500),
    duration VARCHAR(100),
    price DECIMAL(10, 2),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول مقالات
CREATE TABLE articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    excerpt TEXT,
    image_url VARCHAR(500),
    author VARCHAR(255),
    published_date DATE,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول نظرات
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    item_id INT NOT NULL,
    item_type ENUM('scan', 'article') NOT NULL,
    content TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- جدول کاربران
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    role ENUM('admin', 'editor', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول نوبت‌گیری
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    scan_id INT,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (scan_id) REFERENCES scans(id)
);

-- درج اطلاعات اولیه اسکن‌ها
INSERT INTO scans (name_fa, name_en, description, preparation, category) VALUES
('اسکن قلب (تالیوم اسکن)', 'Cardiac Scan (Thallium Scan)', 
 'اسکن قلب با استفاده از ماده رادیواکتیو تالیوم برای ارزیابی عملکرد قلب، تشخیص بیماری‌های عروق کرونر و بررسی جریان خون عضله قلب انجام می‌شود.',
 'ناشتایی ۴-۶ ساعت قبل از اسکن، پرهیز از مصرف کافئین و سیگار از ۲۴ ساعت قبل، در صورت مصرف داروهای قلبی با پزشک خود مشورت کنید.',
 'cardiac'),
 
('اسکن کلیه (DMSA - DTPA)', 'Kidney Scan (DMSA - DTPA)',
 'اسکن کلیه با استفاده از مواد رادیواکتیو DMSA و DTPA برای بررسی عملکرد کلیه‌ها، تشخیص عفونت‌ها، ارزیابی جریان خون کلیه و شناسایی بافت اسکار انجام می‌شود.',
 'نوشیدن مقدار کافی آب قبل از اسکن، در برخی موارد ممکن است نیاز به قطع موقت برخی داروها باشد.',
 'kidney'),
 
('اسکن کیسه صفرا و مجاری صفراوی (HIDA)', 'Gallbladder and Biliary Scan (HIDA Scan)',
 'اسکن HIDA برای ارزیابی عملکرد کیسه صفرا، تشخیص انسداد مجاری صفراوی، بررسی التهاب کیسه صفرا (کله سیستیت) و ارزیابی ترشح صفرا انجام می‌شود.',
 'ناشتایی ۴-۶ ساعت قبل از اسکن، در برخی موارد تزریق ماده تحریک کننده کیسه صفرا لازم است.',
 'hepatobiliary'),
 
('اسکن گوارشی و همانژیوم کبدی', 'Gastrointestinal and Hepatic Hemangioma Scan',
 'این اسکن برای تشخیص خونریزی‌های گوارشی، بررسی عملکرد معده و روده، و شناسایی همانژیوم کبدی (توده خوش خیم عروقی در کبد) انجام می‌شود.',
 'ناشتایی از شب قبل، در صورت مصرف داروهای ضد انعقاد با پزشک خود مشورت کنید.',
 'gastrointestinal'),
 
('اسکن تمام بدن استخوان', 'Whole Body Bone Scan',
 'اسکن استخوان برای تشخیص متاستازهای استخوانی، عفونت‌های استخوان، بیماری پاژه استخوان، شکستگی‌های استرسی و بررسی دردهای استخوانی با علت نامشخص انجام می‌شود.',
 'نوشیدن مقدار زیادی آب قبل و بعد از تزریق ماده رادیواکتیو، تخلیه مثانه قبل از اسکن.',
 'bone'),
 
('اسکن تیروئید و پاراتی‌روئید', 'Thyroid and Parathyroid Scan',
 'اسکن تیروئید برای بررسی عملکرد تیروئید، تشخیص گره‌های تیروئیدی، ارزیابی پرکاری تیروئید و اسکن پاراتی‌روئید برای شناسایی آدنوم پاراتی‌روئید انجام می‌شود.',
 'در صورت مصرف داروهای تیروئیدی با پزشک خود درباره زمان قطع موقت دارو مشورت کنید.',
 'endocrine'),
 
('اسکن پرفیوژن ریه', 'Lung Perfusion Scan',
 'برای ارزیابی جریان خون ریه‌ها و تشخیص آمبولی ریه انجام می‌شود. این اسکن به همراه اسکن ونتیلاسیون انجام می‌شود.',
 'نیاز به آمادگی خاصی ندارد، اما باید در صورت بارداری یا شیردهی به پزشک اطلاع دهید.',
 'pulmonary'),
 
('اسکن RBC نشان‌دار جهت خون‌ریزی گوارشی', 'Tagged RBC Scan for GI Bleeding',
 'برای شناسایی محل خونریزی در دستگاه گوارش، مخصوصاً در مواردی که اندوسکوپی قادر به تشخیص نیست، انجام می‌شود.',
 'ناشتایی ۴-۶ ساعت قبل از اسکن، قطع داروهای ضد انعقاد طبق دستور پزشک.',
 'gastrointestinal'),
 
('اسکن پستان (پستان‌نگاری هسته‌ای)', 'Breast Scan (Scintimammography)',
 'برای بررسی توده‌های پستان، مخصوصاً در مواردی که ماموگرافی نتایج مبهم دارد، انجام می‌شود.',
 'نیاز به آمادگی خاصی ندارد، عدم استفاده از دئودورانت یا لوسیون در ناحیه پستان.',
 'breast'),
 
('اسکن عفونت (گالیوم اسکن)', 'Infection Scan (Gallium Scan)',
 'برای شناسایی عفونت‌های عمقی، آبسه‌ها و التهاب‌های سیستمیک انجام می‌شود.',
 'ممکن است نیاز به تزریق گالیوم ۲۴-۷۲ ساعت قبل از اسکن باشد.',
 'infection'),
 
('اسکن تومور (ایندیم اسکن)', 'Tumor Scan (Indium Scan)',
 'برای شناسایی و مرحله‌بندی برخی انواع تومورها مانند لنفوم و ملانوما انجام می‌شود.',
 'نیاز به آمادگی خاصی ندارد، اما باید اطلاعات کامل درباره بیماری به پزشک ارائه شود.',
 'oncology'),
 
('اسکن مغز (CBF اسکن)', 'Brain Scan (CBF Scan)',
 'برای بررسی جریان خون مغزی، تشخیص سکته مغزی، صرع و دمانس انجام می‌شود.',
 'ناشتایی ۴-۶ ساعت قبل از اسکن، قطع برخی داروها طبق دستور پزشک.',
 'neurological'),
 
('اسکن کبد و طحال', 'Liver and Spleen Scan',
 'برای بررسی عملکرد کبد و طحال، تشخیص تومورها، عفونت‌ها و بیماری‌های مزمن کبدی انجام می‌شود.',
 'نیاز به آمادگی خاصی ندارد، اما ممکن است نیاز به ناشتایی کوتاه مدت باشد.',
 'hepatobiliary'),
 
('اسکن پاراتیروئید با سستامیبی', 'Parathyroid Scan with Sestamibi',
 'برای شناسایی آدنوم پاراتیروئید در بیماران با هایپرپاراتیروئیدیسم انجام می‌شود.',
 'ناشتایی ۴-۶ ساعت قبل از اسکن، قطع مکمل‌های کلسیم و ویتامین D طبق دستور پزشک.',
 'endocrine'),
 
('اسکن سالیواری (غدد بزاقی)', 'Salivary Gland Scan',
 'برای بررسی عملکرد غدد بزاقی، تشخیص انسداد مجاری و بیماری‌های التهابی انجام می‌شود.',
 'ناشتایی از شب قبل، عدم مصرف غذاهای تحریک کننده ترشح بزاق.',
 'head-neck');

-- ایجاد کاربر ادمین پیش‌فرض
INSERT INTO users (username, email, password, full_name, role) VALUES
('admin', 'admin@caspian-nuclear.ir', SHA2('admin123', 256), 'مدیر سیستم', 'admin');