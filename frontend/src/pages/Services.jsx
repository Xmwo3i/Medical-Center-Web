import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box, Container, Grid, Typography, Card, CardContent,
  Chip, Button, Divider, Paper
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  HeartIcon, BoneIcon, KidneyIcon, ThyroidIcon, BrainIcon,
  LungIcon, LiverIcon, ParathyroidIcon, GIIcon,
  CystographyIcon, RBCIcon, MeckelIcon
} from '../components/MedicalIcons'

const MotionCard = motion(Card)
const MotionBox  = motion(Box)

// Real scan images for the 4 that have them
const IMAGE_MAP = {
  'myocardial-perfusion-scan':  '/assets/images/heart-scan.png',
  'bone-scan':                  '/assets/images/bone-scan.png',
  'dmsa-renal-scan':            '/assets/images/DMSA_Renal_Cortical_Scintigraphy.jpg',
  'dtpa-renal-scan':            '/assets/images/kidney-scan.png',
  'thyroid-scan':               '/assets/images/thyroid-scan-result-icon-vector.jpg',
  'brain-perfusion-spect':      '/assets/images/brain-biometric-scanner-glyph-icon-illustration-vector.jpg',
  'radionuclide-cystography':   '/assets/images/Direct_Radionuclide_Cystography(DRC).jpg',
  'meckel-scan':                '/assets/images/Diverticulum_Scintigraphy.jpg',
  'hida-scan':                  '/assets/images/hepatobiliary_iminodiacetic_acid_scan_icon.jpg',
  'labeled-rbc-scan':           '/assets/images/Labeled_Red_Blood_Cell_Scintigraphy.jpg',
  'lung-perfusion-scan':        '/assets/images/Perfusion_LungScan.jpg',
  'parathyroid-scan':            '/assets/images/thyroid-scan.png',
}

// ─── Full service data — exported so ServiceDetail can import it ──────────────
export const SERVICES = [
  {
    slug: 'parathyroid-scan',
    title: 'اسکن پاراتیروئید',
    subtitle: 'Parathyroid Scintigraphy',
    category: 'غدد درون‌ریز',
    duration: '2-3 ساعت',
    color: '#d53f8c',
    gradient: 'linear-gradient(135deg, #d53f8c 0%, #b83280 100%)',
    icon: (c) => <ParathyroidIcon size={72} color={c} />,
    description: 'تشخیص آدنوم پاراتیروئید، بررسی توده‌های مشکوک گردنی و ارزیابی پرکاری پاراتیروئید',
    fullContent: 'اسکن پاراتیروئید با استفاده از ماده رادیواکتیو Sestamibi (Tc-99m) انجام می‌شود. این روش دقیق‌ترین روش غیرتهاجمی برای تشخیص موقعیت دقیق غدد پاراتیروئید بزرگ‌شده (آدنوم) است. تصویربرداری در دو مرحله زودهنگام (۱۵ دقیقه) و دیررس (۲ ساعت) انجام می‌شود تا تفاوت جذب بین بافت تیروئید و پاراتیروئید مشخص شود.',
    tracer: 'Tc-99m Sestamibi',
    radiation: 'معادل با ۲ رادیوگرافی',
    resultTime: '24 ساعت',
    details: [
      'تشخیص آدنوم پاراتیروئید قبل از جراحی',
      'بررسی توده‌های مشکوک گردنی',
      'تأیید هیپرپاراتیروئیدیسم اولیه',
      'بررسی پرکاری مداوم پس از جراحی',
      'یافتن غدد ناجابجا (ectopic)',
      'کمک به برنامه‌ریزی جراحی minimal invasive',
    ],
    preparation: [
      'ناشتا بودن ۴ ساعت قبل از اسکن',
      'قطع داروهای کلسیم با نظر پزشک',
      'آوردن آزمایش PTH و کلسیم اخیر',
      'داروهای ضروری را با آب کم می‌توانید مصرف کنید',
      'پوشیدن لباس راحت بدون زیپ و دکمه فلزی',
    ],
    procedure: [
      { title: 'تزریق ماده رادیواکتیو', desc: 'Tc-99m Sestamibi از طریق ورید محیطی تزریق می‌شود.' },
      { title: 'تصویربرداری اولیه', desc: '۱۵ دقیقه پس از تزریق اولین سری تصاویر از ناحیه گردن و قفسه سینه گرفته می‌شود.' },
      { title: 'انتظار', desc: '۲ ساعت استراحت — در این مدت می‌توانید آب بخورید و فعالیت سبک داشته باشید.' },
      { title: 'تصویربرداری نهایی', desc: 'تصاویر دیررس گرفته شده و با تصاویر اولیه مقایسه می‌شود تا محل دقیق آدنوم مشخص شود.' },
    ],
    faq: [
      { q: 'آیا اسکن دردناک است؟', a: 'خیر. تنها یک آمپول وریدی کوچک زده می‌شود و تصویربرداری کاملاً بدون درد است.' },
      { q: 'آیا باید بستری شوم؟', a: 'خیر. این یک روش سرپایی است و بلافاصله پس از اسکن می‌توانید به منزل بروید.' },
      { q: 'مدت اثر ماده رادیواکتیو چقدر است؟', a: 'نیمه عمر Tc-99m فقط ۶ ساعت است و در طی ۲۴ ساعت از بدن دفع می‌شود.' },
    ],
    safety: [
      'خانم‌های باردار یا احتمال بارداری دارند باید اطلاع دهند',
      'مادران شیرده باید ۲۴ ساعت شیردهی را قطع کنند',
      'پس از اسکن با کودکان زیر ۵ سال فاصله کوتاهی حفظ کنید',
    ],
  },
  {
    slug: 'thyroid-scan',
    title: 'اسکن تیروئید',
    subtitle: 'Thyroid Scintigraphy',
    category: 'غدد درون‌ریز',
    duration: '30-60 دقیقه',
    color: '#dd6b20',
    gradient: 'linear-gradient(135deg, #dd6b20 0%, #c05621 100%)',
    icon: (c) => <ThyroidIcon size={72} color={c} />,
    description: 'بررسی ساختار و عملکرد غده تیروئید، تشخیص ندول‌های Hot/Cold و پرکاری و کم‌کاری',
    fullContent: 'اسکن تیروئید با Tc-99m Pertechnetate توزیع عملکردی غده تیروئید را نمایش می‌دهد. نواحی پرفعالیت (ندول Hot) در تصویر روشن‌تر و نواحی کم‌فعالیت (ندول Cold) تاریک‌تر دیده می‌شوند. ندول‌های Cold خطر بدخیمی بیشتری دارند. این اسکن مکمل سونوگرافی و آزمایش TSH است.',
    tracer: 'Tc-99m Pertechnetate',
    radiation: 'معادل با ۱ رادیوگرافی',
    resultTime: '24 ساعت',
    details: [
      'تشخیص ندول‌های Hot و Cold تیروئید',
      'ارزیابی گواتر و بزرگی تیروئید',
      'بررسی پرکاری تیروئید (هیپرتیروئیدیسم)',
      'تشخیص نوع پرکاری (گریوز، ندول Hot، تیروئیدیت)',
      'تعیین محل بافت تیروئید باقیمانده پس از جراحی',
      'پیگیری پس از درمان با ید رادیواکتیو',
    ],
    preparation: [
      'قطع داروهای تیروئیدی (PTU، متیمازول) ۴-۷ روز قبل با نظر پزشک',
      'ناشتا بودن ۴ ساعت قبل از اسکن',
      'اجتناب از مواد حاوی ید (داروها، کنتراست، جلبک) ۱ ماه قبل',
      'خانم‌های باردار یا شیرده حتماً اطلاع دهند',
      'اطلاع از مصرف داروهای قلبی حاوی آمیودارون',
    ],
    procedure: [
      { title: 'تزریق ماده رادیواکتیو', desc: 'Tc-99m Pertechnetate از طریق ورید تزریق می‌شود.' },
      { title: 'انتظار ۲۰-۳۰ دقیقه', desc: 'ماده در بافت تیروئید تجمع می‌یابد.' },
      { title: 'تصویربرداری', desc: 'تصاویر از چند زاویه از ناحیه گردن گرفته می‌شود. ۱۵-۲۰ دقیقه طول می‌کشد.' },
      { title: 'تفسیر', desc: 'پزشک هسته‌ای توزیع ماده رادیواکتیو را ارزیابی و گزارش می‌نویسد.' },
    ],
    faq: [
      { q: 'تفاوت ندول Hot و Cold چیست؟', a: 'ندول Hot فعال‌تر از بافت اطراف است (معمولاً خوش‌خیم). ندول Cold کم‌فعال است و ۱۵-۲۰٪ احتمال بدخیمی دارد.' },
      { q: 'آیا می‌توان داروی تیروئید را قطع نکرد؟', a: 'قطع دارو برای نتیجه دقیق ضروری است. با پزشک ارجاع‌دهنده مشورت کنید.' },
    ],
    safety: [
      'بارداری و شیردهی موارد منع مطلق هستند',
      'قطع شیردهی ۲۴ ساعت الزامی است',
      'مصرف ید اضافه کیفیت تصویر را کاهش می‌دهد',
    ],
  },
  {
    slug: 'myocardial-perfusion-scan',
    title: 'اسکن پرفیوژن میوکارد',
    subtitle: 'Myocardial Perfusion Imaging (MPI)',
    category: 'قلب و عروق',
    duration: '3-4 ساعت',
    color: '#c53030',
    gradient: 'linear-gradient(135deg, #c53030 0%, #9b2c2c 100%)',
    icon: (c) => <HeartIcon size={72} color={c} />,
    description: 'دقیق‌ترین روش غیرتهاجمی برای بررسی جریان خون عضله قلب در حالت استراحت و استرس',
    fullContent: 'اسکن پرفیوژن میوکارد (MPI) با استفاده از Tc-99m MIBI جریان خون عضله قلب را در دو حالت استراحت و استرس (ورزش روی تردمیل یا تزریق داروی آدنوزین) ارزیابی می‌کند. نواحی ایسکمیک (کم‌خون) در حین استرس تاریک‌تر از حالت استراحت دیده می‌شوند. این اسکن اطلاعاتی فراتر از نوار قلب و اکوکاردیوگرافی ارائه می‌دهد.',
    tracer: 'Tc-99m MIBI / Tetrofosmin',
    radiation: 'معادل با ۵-۶ رادیوگرافی',
    resultTime: '24-48 ساعت',
    details: [
      'تشخیص بیماری عروق کرونری (CAD)',
      'بررسی ایسکمی و انفارکتوس میوکارد',
      'تعیین بافت Viable (زنده) میوکارد',
      'ارزیابی عملکرد بطن چپ (EF)',
      'خطر‌سنجی قبل از جراحی',
      'پیگیری پس از آنژیوپلاستی یا بای‌پس',
    ],
    preparation: [
      'ناشتا بودن ۴ ساعت قبل از اسکن (آب مجاز)',
      'قطع کامل کافئین ۲۴ ساعت قبل (چای، قهوه، شکلات، نوشابه)',
      'آوردن داروهای قلبی و نشان دادن به پزشک',
      'پوشیدن کفش ورزشی راحت برای تست ورزش',
      'اطلاع از آسم، برونشواسپاسم و بلوک قلبی',
    ],
    procedure: [
      { title: 'مرحله استرس', desc: 'بیمار روی تردمیل ورزش می‌کند تا ضربان قلب به ۸۵٪ حداکثر برسد، سپس ماده رادیواکتیو تزریق می‌شود. برای بیمارانی که نمی‌توانند ورزش کنند، آدنوزین تزریق می‌شود.' },
      { title: 'تصویربرداری استرس', desc: '۳۰-۶۰ دقیقه پس از تزریق SPECT از قلب در حالت استرس انجام می‌شود.' },
      { title: 'مرحله استراحت', desc: 'چند ساعت بعد، دوز دوم تزریق شده و تصویربرداری در حالت استراحت انجام می‌شود.' },
      { title: 'آنالیز', desc: 'تصاویر استرس و استراحت مقایسه شده و نقشه سه‌بعدی پرفیوژن قلب ترسیم می‌شود.' },
    ],
    faq: [
      { q: 'تفاوت با اکو استرس چیست؟', a: 'MPI حساسیت بالاتری دارد (۸۵-۹۰٪ در مقابل ۷۵-۸۵٪) و اطلاعات کمی‌تری درباره EF و پرفیوژن دقیق می‌دهد.' },
      { q: 'آیا داروهای قلبی را باید قطع کنم؟', a: 'بتابلاکرها را باید با نظر پزشک ۴۸ ساعت قبل قطع کنید. داروهای دیگر معمولاً ادامه می‌یابند.' },
    ],
    safety: [
      'بیماران آسمی باید حتماً اطلاع دهند (پروتکل جایگزین)',
      'بارداری منع مطلق دارد',
      'بلوک AV درجه ۲ و ۳ باید اعلام شود',
    ],
  },
  {
    slug: 'brain-perfusion-spect',
    title: 'اسکن پرفیوژن مغز',
    subtitle: 'Brain Perfusion SPECT',
    category: 'مغز و اعصاب',
    duration: '2-3 ساعت',
    color: '#553c9a',
    gradient: 'linear-gradient(135deg, #553c9a 0%, #44337a 100%)',
    icon: (c) => <BrainIcon size={72} color={c} />,
    description: 'تصویربرداری سه‌بعدی جریان خون مغزی برای تشخیص دمانس، صرع، سکته و اختلالات نورولوژیک',
    fullContent: 'اسکن SPECT مغز با Tc-99m HMPAO یا ECD جریان خون را در تمام نواحی مغز به‌صورت سه‌بعدی نمایش می‌دهد. برخلاف MRI که ساختار را نشان می‌دهد، SPECT عملکرد مغز را می‌بیند. نواحی با جریان خون کاهش‌یافته ممکن است ساختار طبیعی داشته باشند اما در SPECT قابل تشخیص هستند.',
    tracer: 'Tc-99m HMPAO / ECD',
    radiation: 'معادل با ۴-۵ رادیوگرافی',
    resultTime: '24-48 ساعت',
    details: [
      'تشخیص زوال عقل آلزایمر و تمایز از FTD',
      'بررسی TIA و سکته مغزی مزمن',
      'کمک به تشخیص کانون صرع پیش از جراحی',
      'ارزیابی ضربه مغزی (TBI) مزمن',
      'بررسی اثربخشی درمان‌های نورولوژیک',
      'تشخیص افسردگی مقاوم به درمان',
    ],
    preparation: [
      'آرامش کامل در اتاق تاریک ۲۰ دقیقه قبل از تزریق',
      'بستن چشم‌ها و گوش‌ها با پنبه در زمان تزریق (کاهش تحریک حسی)',
      'قطع داروهای آرام‌بخش با نظر پزشک',
      'اطلاع از داروهای ضدصرع مصرفی',
      'اجتناب از مصرف کافئین روز اسکن',
    ],
    procedure: [
      { title: 'آماده‌سازی محیط', desc: 'بیمار ۲۰ دقیقه در اتاق ساکت و تاریک استراحت می‌کند تا برانگیختگی مغزی به حداقل برسد.' },
      { title: 'تزریق HMPAO', desc: 'در حالت آرامش کامل ماده رادیواکتیو تزریق می‌شود. HMPAO در ۱ دقیقه در بافت مغز ثابت می‌شود.' },
      { title: 'انتظار ۳۰-۶۰ دقیقه', desc: 'بیمار در محیط آرام منتظر می‌ماند.' },
      { title: 'SPECT تصویربرداری', desc: 'دوربین گاما دور سر می‌چرخد و تصاویر مقطعی سه‌بعدی ایجاد می‌کند.' },
    ],
    faq: [
      { q: 'تفاوت با PET مغز چیست؟', a: 'PET دقت بالاتری دارد اما گران‌تر و کمتر در دسترس است. SPECT برای تشخیص اولیه روش مناسبی است.' },
      { q: 'آیا نتیجه قطعی است؟', a: 'SPECT یک ابزار کمکی است و باید با تاریخچه بالینی، آزمون‌های شناختی و MRI تفسیر شود.' },
    ],
    safety: [
      'بارداری منع مطلق دارد',
      'بیماران صرعی باید در روز اسکن داروهایشان را مصرف کنند',
      'اطلاع از کلاستروفوبی لازم است',
    ],
  },
  {
    slug: 'bone-scan',
    title: 'اسکن استخوان',
    subtitle: 'Bone Scintigraphy',
    category: 'استخوان و مفاصل',
    duration: '3-4 ساعت',
    color: '#2c7a7b',
    gradient: 'linear-gradient(135deg, #2c7a7b 0%, #285e61 100%)',
    icon: (c) => <BoneIcon size={72} color={c} />,
    description: 'تصویربرداری کامل از اسکلت بدن برای تشخیص متاستاز، عفونت، شکستگی و بیماری‌های متابولیک',
    fullContent: 'اسکن استخوان با Tc-99m MDP حساس‌ترین روش برای تشخیص تغییرات متابولیک استخوان است. متاستازهای استخوانی ۳-۶ ماه زودتر از رادیوگرافی ساده قابل تشخیص هستند. ماده رادیواکتیو در نواحی با بازسازی فعال استخوان تجمع می‌یابد.',
    tracer: 'Tc-99m MDP',
    radiation: 'معادل با ۳-۴ رادیوگرافی',
    resultTime: '24-48 ساعت',
    details: [
      'غربالگری و پیگیری متاستازهای استخوانی',
      'تشخیص استئومیلیت (عفونت استخوان)',
      'شکستگی‌های استرسی و آسیب‌های ورزشی',
      'نکروز آواسکولر (مرگ بافت استخوانی)',
      'بیماری پاژه استخوان',
      'ارزیابی پروتزها و ایمپلنت‌های استخوانی',
    ],
    preparation: [
      'نوشیدن ۴-۶ لیوان آب بین تزریق و اسکن (دفع ماده اضافه از کلیه)',
      'ادرار کردن قبل از شروع تصویربرداری',
      'برداشتن اشیاء فلزی، جواهرات و کمربند',
      'اطلاع از جراحی‌های اخیر و شکستگی‌های قدیمی',
      'بیاورید رادیوگرافی یا MRI اخیر اگر دارید',
    ],
    procedure: [
      { title: 'تزریق MDP', desc: 'Tc-99m MDP از طریق ورید تزریق می‌شود.' },
      { title: 'انتظار ۲-۳ ساعت', desc: 'در این مدت آب فراوان بخورید و ادرار کنید تا ماده اضافه از بدن خارج شود.' },
      { title: 'تصویربرداری کل بدن', desc: 'دوربین گاما از سر تا پا اسکن می‌کند (۳۰-۴۵ دقیقه). تصاویر قدامی و خلفی گرفته می‌شود.' },
      { title: 'تصاویر تکمیلی', desc: 'در صورت نیاز تصاویر SPECT از نواحی مشکوک گرفته می‌شود.' },
    ],
    faq: [
      { q: 'چرا باید آب زیاد بخورم؟', a: 'آب کمک می‌کند ماده رادیواکتیو جذب‌نشده از طریق ادرار دفع شود و تصویر واضح‌تری ایجاد شود.' },
      { q: 'آیا شکستگی قدیمی اسکن را مشکل می‌کند؟', a: 'شکستگی‌های التیام‌یافته هنوز در اسکن مشخص می‌شوند. اطلاع از سابقه آن‌ها برای تفسیر صحیح ضروری است.' },
    ],
    safety: [
      'بارداری منع مطلق دارد',
      'مادران شیرده باید ۲۴ ساعت شیردهی را قطع کنند',
      'ادرار ۲۴ ساعت اول مختصری رادیواکتیو است',
    ],
  },
  {
    slug: 'hida-scan',
    title: 'اسکن HIDA',
    subtitle: 'Hepatobiliary Iminodiacetic Acid Scan',
    category: 'کبد و صفرا',
    duration: '2-4 ساعت',
    color: '#b7791f',
    gradient: 'linear-gradient(135deg, #b7791f 0%, #975a16 100%)',
    icon: (c) => <LiverIcon size={72} color={c} />,
    description: 'ارزیابی عملکرد کبد، کیسه صفرا و مجاری صفراوی برای تشخیص کوله‌سیستیت و انسداد صفراوی',
    fullContent: 'اسکن HIDA با Tc-99m IDA توسط سلول‌های کبدی جذب شده و از طریق صفرا دفع می‌شود. این روش ارزیابی دقیقی از عملکرد ترشح صفرا، پرشدن کیسه صفرا، و تخلیه آن ارائه می‌دهد. کسر تخلیه کیسه صفرا (GBEF) به‌صورت کمی محاسبه می‌شود.',
    tracer: 'Tc-99m IDA (HIDA/DISIDA)',
    radiation: 'معادل با ۳-۴ رادیوگرافی',
    resultTime: '24 ساعت',
    details: [
      'کوله‌سیستیت حاد (دقت ۹۵٪)',
      'کوله‌سیستیت مزمن و دیسکینزی صفراوی',
      'انسداد مجرای صفراوی مشترک',
      'نشت صفرا پس از جراحی لاپاروسکوپیک',
      'ارزیابی عملکرد پیوند کبد',
      'بیلیاری آترزی در نوزادان',
    ],
    preparation: [
      'ناشتا بودن ۴-۶ ساعت قبل از اسکن',
      'قطع داروهای مورفین و آنالوگ‌ها ۲ ساعت قبل',
      'اطلاع از مصرف آنتی‌بیوتیک‌های اخیر',
      'آوردن سونوگرافی شکمی اخیر',
    ],
    procedure: [
      { title: 'تزریق IDA', desc: 'ماده رادیواکتیو از طریق ورید تزریق می‌شود.' },
      { title: 'تصویربرداری پیوسته', desc: 'تصاویر هر ۵ دقیقه برای ۶۰ دقیقه گرفته می‌شود تا جریان صفرا دنبال شود.' },
      { title: 'تزریق CCK (در صورت نیاز)', desc: 'برای سنجش GBEF، هورمون CCK تزریق شده و تخلیه کیسه صفرا ارزیابی می‌شود.' },
      { title: 'تصاویر تأخیری', desc: 'در موارد انسداد، تصاویر تا ۴-۲۴ ساعت ادامه می‌یابد.' },
    ],
    faq: [
      { q: 'GBEF طبیعی چند درصد است؟', a: 'بیشتر از ۳۵٪ طبیعی است. کمتر از ۳۵٪ نشانه دیسکینزی صفراوی است.' },
      { q: 'آیا می‌توانم قبل از آمدن آب بخورم؟', a: 'بله، آب مجاز است. فقط از خوردن غذا و نوشیدنی‌های دیگر خودداری کنید.' },
    ],
    safety: [
      'بارداری منع مطلق دارد',
      'مورفین باید قطع شود زیرا اسفنکتر اودی را منقبض می‌کند',
      'نوزادان نیاز به تست بیلیروبین قبل از اسکن دارند',
    ],
  },
  {
    slug: 'dmsa-renal-scan',
    title: 'اسکن کلیه (DMSA)',
    subtitle: 'DMSA Renal Cortical Scintigraphy',
    category: 'کلیه و مجاری ادراری',
    duration: '4-5 ساعت',
    color: '#2b6cb0',
    gradient: 'linear-gradient(135deg, #2b6cb0 0%, #2c5282 100%)',
    icon: (c) => <KidneyIcon size={72} color={c} />,
    description: 'بررسی دقیق بافت فعال کلیه، تشخیص اسکار و ارزیابی عملکرد تفکیکی هر کلیه',
    fullContent: 'اسکن DMSA طلای استاندارد برای تشخیص اسکار کلیوی است. این ماده در سلول‌های لوله‌ای کلیه ثابت می‌شود و نقشه دقیقی از بافت فعال کلیه می‌دهد. نواحی اسکار یا آسیب‌دیده به‌صورت کاهش جذب (cold area) دیده می‌شوند.',
    tracer: 'Tc-99m DMSA',
    radiation: 'معادل با ۲-۳ رادیوگرافی',
    resultTime: '24 ساعت',
    details: [
      'تشخیص اسکار کلیوی پس از پیلونفریت',
      'ارزیابی عملکرد تفکیکی (Differential Function)',
      'تشخیص هیپوپلازی و دیسپلازی کلیه',
      'کلیه نعلی (Horseshoe Kidney)',
      'ارزیابی پس از ترمیم VUR',
      'پیگیری کودکان با UTI مکرر',
    ],
    preparation: [
      'هیدراتاسیون مناسب: ۲-۳ لیوان آب قبل از مراجعه',
      'ادرار کردن قبل از شروع تصویربرداری',
      'آوردن سونوگرافی کلیه اخیر',
      'اطلاع از سابقه عفونت ادراری و UTI',
      'کودکان ممکن است نیاز به آرام‌بخش داشته باشند',
    ],
    procedure: [
      { title: 'تزریق DMSA', desc: 'ماده رادیواکتیو تزریق می‌شود.' },
      { title: 'انتظار ۳-۴ ساعت', desc: 'DMSA در سلول‌های لوله‌ای کلیه ثابت می‌شود.' },
      { title: 'تصویربرداری ثابت', desc: 'تصاویر از زوایای مختلف از کلیه‌ها گرفته می‌شود.' },
      { title: 'محاسبه DF', desc: 'عملکرد تفکیکی هر کلیه به درصد محاسبه می‌شود (طبیعی: 45-55%).' },
    ],
    faq: [
      { q: 'چه موقع باید بعد از UTI اسکن بگیریم؟', a: 'معمولاً ۳-۶ ماه پس از بهبود عفونت تا نتیجه دقیق حاصل شود.' },
      { q: 'اسکن DMSA چه تفاوتی با سونوگرافی دارد؟', a: 'سونوگرافی ساختار را نشان می‌دهد اما اسکار کوچک را نمی‌بیند. DMSA حساسیت ۸۰-۹۰٪ برای اسکار دارد.' },
    ],
    safety: [
      'بارداری منع مطلق دارد',
      'برای کودکان دوز تطبیق‌یافته بر اساس وزن تجویز می‌شود',
      'شیردهی باید ۲۴ ساعت قطع شود',
    ],
  },
  {
    slug: 'dtpa-renal-scan',
    title: 'اسکن کلیه (DTPA)',
    subtitle: 'DTPA Dynamic Renal Scintigraphy',
    category: 'کلیه و مجاری ادراری',
    duration: '1-2 ساعت',
    color: '#2b6cb0',
    gradient: 'linear-gradient(135deg, #2b6cb0 0%, #2c5282 100%)',
    icon: (c) => <KidneyIcon size={72} color={c} />,
    description: 'بررسی دینامیک فانکشن کلیه، محاسبه GFR هر کلیه و تشخیص انسداد دستگاه ادراری',
    fullContent: 'اسکن DTPA از طریق فیلتراسیون گلومرولی دفع می‌شود و اطلاعات دینامیک از جریان خون کلیوی، فیلتراسیون و تخلیه ادرار ارائه می‌دهد. این روش می‌تواند GFR هر کلیه را به‌صورت جداگانه محاسبه کند که با آزمایش خون قابل انجام نیست.',
    tracer: 'Tc-99m DTPA / MAG3',
    radiation: 'معادل با ۲ رادیوگرافی',
    resultTime: '24 ساعت',
    details: [
      'محاسبه GFR هر کلیه به‌طور جداگانه',
      'تشخیص و تعیین درجه انسداد UPJ یا UVJ',
      'بررسی تنگی شریان کلیوی (RAS)',
      'ارزیابی کلیه پیوندی',
      'بررسی ریفلاکس وزیکواورترال همراه با کیست',
      'پایش عملکرد کلیه در بیماران مزمن',
    ],
    preparation: [
      'نوشیدن ۵۰۰ میلی‌لیتر آب ۳۰ دقیقه قبل از مراجعه',
      'ادرار کردن قبل از شروع اسکن',
      'قطع داروهای مدر ۲۴ ساعت قبل با نظر پزشک',
      'داروهای ضدفشار خون ACE inhibitor را اعلام کنید',
    ],
    procedure: [
      { title: 'قرارگیری در دستگاه', desc: 'بیمار زیر دوربین گاما دراز می‌کشد.' },
      { title: 'تزریق و شروع تصویربرداری', desc: 'بلافاصله پس از تزریق DTPA، تصویربرداری دینامیک شروع می‌شود.' },
      { title: 'ثبت رنوگرام', desc: 'منحنی زمان-فعالیت (رنوگرام) برای هر کلیه رسم می‌شود.' },
      { title: 'تزریق فوروزماید (در صورت نیاز)', desc: 'برای تفکیک انسداد واقعی از گشادی بدون انسداد، داروی دیورتیک تزریق می‌شود.' },
    ],
    faq: [
      { q: 'منحنی رنوگرام چه اطلاعاتی می‌دهد؟', a: 'فاز اول: جریان خون. فاز دوم: فیلتراسیون گلومرولی. فاز سوم: تخلیه ادرار. تأخیر یا توقف در هر فاز نوع مشکل را نشان می‌دهد.' },
      { q: 'چه وقت MAG3 به جای DTPA استفاده می‌شود؟', a: 'MAG3 در نارسایی کلیه و نوزادان ترجیح دارد زیرا مستقل از GFR از طریق ترشح لوله‌ای دفع می‌شود.' },
    ],
    safety: [
      'بارداری منع مطلق دارد',
      'آلرژی به فوروزماید باید اعلام شود',
      'در دیابت احتیاط بیشتری لازم است',
    ],
  },
  {
    slug: 'labeled-rbc-scan',
    title: 'اسکن RBC نشاندار',
    subtitle: 'Labeled Red Blood Cell Scintigraphy',
    category: 'گوارش',
    duration: '2-4 ساعت',
    color: '#c53030',
    gradient: 'linear-gradient(135deg, #c53030 0%, #9b2c2c 100%)',
    icon: (c) => <RBCIcon size={72} color={c} />,
    description: 'تشخیص دقیق محل خونریزی دستگاه گوارش و شناسایی همانژیوم کبدی',
    fullContent: 'در این روش گلبول‌های قرمز خون بیمار با Tc-99m برچسب‌زده شده و مجدداً تزریق می‌شوند. خونریزی فعال حتی با سرعت کم (۰.۱ میلی‌لیتر در دقیقه) قابل شناسایی است — ۱۰ برابر حساس‌تر از آنژیوگرافی. تصویربرداری پیوسته تا ۴ ساعت (و در صورت لزوم تا ۲۴ ساعت) ادامه می‌یابد.',
    tracer: 'Tc-99m RBC',
    radiation: 'معادل با ۴-۵ رادیوگرافی',
    resultTime: '24 ساعت',
    details: [
      'خونریزی آهسته GI که آنژیوگرافی آن را نمی‌بیند',
      'تشخیص همانژیوم کبدی (دقت ۹۵٪)',
      'خونریزی از دیورتیکول روده بزرگ',
      'مشخص‌کردن محل خونریزی قبل از جراحی',
      'ارزیابی آنژیودیسپلازی روده',
      'تأیید خونریزی در اسکن مکل',
    ],
    preparation: [
      'هیچ آمادگی خاصی لازم نیست',
      'اطلاع کامل از داروهای مصرفی',
      'آوردن نتایج آندوسکوپی اخیر (در صورت وجود)',
      'اطلاع از سابقه بیماری‌های گوارشی',
    ],
    procedure: [
      { title: 'نمونه‌گیری خون', desc: '۳ میلی‌لیتر خون از بیمار گرفته می‌شود.' },
      { title: 'برچسب‌زنی RBC', desc: 'گلبول‌های قرمز با Tc-99m در آزمایشگاه هسته‌ای برچسب می‌خورند (۳۰ دقیقه).' },
      { title: 'تزریق مجدد', desc: 'RBC نشاندار به بیمار تزریق می‌شود.' },
      { title: 'تصویربرداری پیوسته', desc: 'تصویربرداری بلافاصله شروع شده و تا ۴ ساعت ادامه دارد. محل خونریزی به‌صورت تجمع موضعی رادیواکتیو دیده می‌شود.' },
    ],
    faq: [
      { q: 'چرا از خون خودم استفاده می‌شود؟', a: 'استفاده از RBC خود بیمار از واکنش آلرژیک جلوگیری می‌کند و برچسب‌زنی پایدارتری ایجاد می‌شود.' },
      { q: 'اگر در حین اسکن خونریزی متوقف شود چه؟', a: 'ممکن است خونریزی متناوب در تصاویر تأخیری ظاهر شود. تصویربرداری می‌تواند تا ۲۴ ساعت ادامه یابد.' },
    ],
    safety: [
      'بارداری منع مطلق دارد',
      'خطر عفونت در فرایند برچسب‌زنی به حداقل رسیده است',
    ],
  },
  {
    slug: 'radionuclide-cystography',
    title: 'سیستوگرافی رادیونوکلئید',
    subtitle: 'Direct Radionuclide Cystography (DRC)',
    category: 'کلیه و مجاری ادراری',
    duration: '1-2 ساعت',
    color: '#6b46c1',
    gradient: 'linear-gradient(135deg, #6b46c1 0%, #553c9a 100%)',
    icon: (c) => <CystographyIcon size={72} color={c} />,
    description: 'تشخیص ریفلاکس وزیکواورترال با حداقل پرتوگیری، ایده‌آل برای پایش کودکان',
    fullContent: 'سیستوگرافی رادیونوکلئید مستقیم (DRC) برای تشخیص ریفلاکس وزیکواورترال (VUR) استاندارد است. پرتوگیری آن ۵۰ برابر کمتر از VCUG رادیولوژیک است. به همین دلیل برای پایش دوره‌ای و کودکان ترجیح داده می‌شود.',
    tracer: 'Tc-99m Pertechnetate',
    radiation: 'بسیار کم (۱/۵۰ VCUG)',
    resultTime: '24 ساعت',
    details: [
      'تشخیص VUR درجه‌های مختلف',
      'پایش VUR در حین درمان دارویی',
      'ارزیابی پس از تزریق Deflux',
      'ارزیابی مثانه عصبی',
      'کودکان با UTI مکرر',
      'خواهر و برادر بیماران VUR',
    ],
    preparation: [
      'نوشیدن آب فراوان قبل از مراجعه',
      'آوردن سونوگرافی کلیه',
      'اطلاع از سابقه UTI و نتایج کشت ادرار',
      'در صورت عفونت فعال، ابتدا درمان کنید',
      'کودکان کوچک نیاز به کاتتر دارند — آماده‌سازی روانی لازم است',
    ],
    procedure: [
      { title: 'کاتتراسیون', desc: 'یک کاتتر نازک به‌صورت استریل وارد مثانه می‌شود.' },
      { title: 'پر کردن مثانه', desc: 'محلول رادیواکتیو از طریق کاتتر وارد مثانه می‌شود.' },
      { title: 'تصویربرداری پیوسته', desc: 'در حین پر شدن و خالی شدن مثانه، ریفلاکس به سمت حالب‌ها ارزیابی می‌شود.' },
      { title: 'مرحله ادرار کردن', desc: 'بیمار ادرار می‌کند و ریفلاکس در این مرحله نیز بررسی می‌شود.' },
    ],
    faq: [
      { q: 'آیا کاتترگذاری دردناک است؟', a: 'با استفاده از ژل بی‌حسی و تکنیک آرام، ناراحتی به حداقل می‌رسد. برای کودکان آرامش والدین کمک بزرگی است.' },
      { q: 'تفاوت DRC و VCUG چیست؟', a: 'VCUG تصویر آناتومیک بهتری دارد اما پرتو بیشتری می‌دهد. DRC برای پایش و کودکان ایده‌آل است.' },
    ],
    safety: [
      'در صورت UTI فعال، اسکن باید به تعویق بیفتد',
      'آلرژی به مواد ضدعفونی باید اعلام شود',
      'برای کودکان توضیح مناسب سنی ضروری است',
    ],
  },
  {
    slug: 'lung-perfusion-scan',
    title: 'اسکن پرفیوژن ریه',
    subtitle: 'Ventilation/Perfusion (V/Q) Lung Scan',
    category: 'ریه و تنفس',
    duration: '1-2 ساعت',
    color: '#276749',
    gradient: 'linear-gradient(135deg, #276749 0%, #22543d 100%)',
    icon: (c) => <LungIcon size={72} color={c} />,
    description: 'استاندارد طلایی تشخیص آمبولی ریه و ارزیابی پرفیوژن ریوی با حداقل پرتوگیری',
    fullContent: 'اسکن V/Q ریه با Tc-99m MAA (پرفیوژن) و Tc-99m آئروسل یا Kr-81m (ونتیلاسیون) انجام می‌شود. در آمبولی ریه پرفیوژن در ناحیه‌ای کاهش می‌یابد در حالی که ونتیلاسیون طبیعی است (mismatch). این روش در بارداری نسبت به CT آنژیوگرافی پرتوگیری کمتری به جنین می‌دهد.',
    tracer: 'Tc-99m MAA + آئروسل',
    radiation: 'معادل با ۲-۳ رادیوگرافی',
    resultTime: '24 ساعت',
    details: [
      'تشخیص آمبولی ریه (PE) — حساسیت ۹۸٪',
      'ارزیابی قبل از جراحی ریه (pneumonectomy)',
      'پرفشاری ریوی مزمن تشخیص‌پذیر',
      'ارزیابی جراحی کاهش حجم ریه (LVRS)',
      'پیگیری پس از درمان PE',
      'بررسی در بارداری (پرتوی کمتر از CTA)',
    ],
    preparation: [
      'داشتن رادیوگرافی ریه اخیر (کمتر از ۲۴ ساعت)',
      'اطلاع از داروهای تنفسی و برونکودیلاتور',
      'اطلاع از سابقه آمبولی قبلی',
      'در صورت فشار خون ریوی شدید اطلاع دهید',
    ],
    procedure: [
      { title: 'اسکن ونتیلاسیون', desc: 'بیمار از طریق ماسک ذرات رادیواکتیو استنشاق می‌کند تا توزیع هوا در ریه ارزیابی شود.' },
      { title: 'تزریق MAA', desc: 'ماده رادیواکتیو از طریق ورید تزریق می‌شود تا جریان خون ریه ارزیابی شود.' },
      { title: 'تصویربرداری چند زاویه', desc: 'تصاویر از ۸ زاویه از ریه‌ها گرفته می‌شود.' },
      { title: 'مقایسه V/Q', desc: 'الگوی ونتیلاسیون و پرفیوژن مقایسه شده و احتمال PE تعیین می‌شود.' },
    ],
    faq: [
      { q: 'V/Q یا CT آنژیوگرافی؟', a: 'CT آنژیو تشخیص قطعی‌تری دارد اما V/Q در بارداری، آلرژی به کنتراست و نارسایی کلیه ارجح است.' },
      { q: 'نتیجه "احتمال بالا" یعنی چه؟', a: 'احتمال ۸۵٪ PE. همراه با سابقه بالینی احتمال ۹۶٪ می‌شود و نیاز به درمان دارد.' },
    ],
    safety: [
      'بیماران با فشار خون ریوی شدید باید دوز کمتری دریافت کنند',
      'در بارداری اندیکاسیون باید قوی باشد',
      'آسم فعال ممکن است تصویر ونتیلاسیون را مشکل کند',
    ],
  },
  {
    slug: 'meckel-scan',
    title: 'اسکن دیورتیکول مکل',
    subtitle: 'Meckel\'s Diverticulum Scintigraphy',
    category: 'گوارش',
    duration: '1-2 ساعت',
    color: '#c05621',
    gradient: 'linear-gradient(135deg, #c05621 0%, #9c4221 100%)',
    icon: (c) => <MeckelIcon size={72} color={c} />,
    description: 'تشخیص دیورتیکول مکل و بافت معده ناجابجا — علت شایع خونریزی گوارشی در کودکان',
    fullContent: 'دیورتیکول مکل شایع‌ترین ناهنجاری مادرزادی دستگاه گوارش است (۲٪ جمعیت). بافت مخاطی معده در آن ترشح اسید می‌کند و زخم و خونریزی ایجاد می‌کند. Tc-99m Pertechnetate توسط سلول‌های جداری معده جذب می‌شود — هر کجا این بافت باشد (معده طبیعی یا مکل) در اسکن دیده می‌شود.',
    tracer: 'Tc-99m Pertechnetate',
    radiation: 'معادل با ۲ رادیوگرافی',
    resultTime: '24 ساعت',
    details: [
      'خونریزی گوارشی بدون علت مشخص در کودکان',
      'کم‌خونی فقر آهن بدون توضیح',
      'درد شکمی مزمن در کودکان',
      'ارزیابی قبل از جراحی دیورتیکول',
      'تشخیص بافت معده ناجابجا در ایلئوم',
      'پس از رد علل دیگر خونریزی GI',
    ],
    preparation: [
      'ناشتا بودن ۴ ساعت قبل از اسکن',
      'قطع مهارکننده‌های پمپ پروتون (PPI) ۴۸-۷۲ ساعت قبل با نظر پزشک',
      'قطع آنتاگونیست‌های H2 ۴۸ ساعت قبل',
      'عدم انجام بریوم یا اسکن رادیواکتیو روز قبل',
      'کودکان ممکن است نیاز به آرام‌بخش داشته باشند',
    ],
    procedure: [
      { title: 'تزریق Pertechnetate', desc: 'ماده رادیواکتیو از طریق ورید تزریق می‌شود.' },
      { title: 'تصویربرداری پیوسته', desc: 'تصاویر هر ۵ دقیقه برای ۴۵-۶۰ دقیقه از شکم گرفته می‌شود.' },
      { title: 'ردیابی محل تجمع', desc: 'جذب ماده در معده طبیعی (مرجع) و هر ناحیه غیرطبیعی با هم مقایسه می‌شود.' },
      { title: 'تصاویر تأخیری', desc: 'در صورت شک، تصاویر تا ۲ ساعت ادامه می‌یابد.' },
    ],
    faq: [
      { q: 'چرا PPI باید قطع شود؟', a: 'PPI ترشح Pertechnetate توسط بافت معده را مهار می‌کند و حساسیت اسکن را کاهش می‌دهد.' },
      { q: 'حساسیت اسکن مکل چقدر است؟', a: 'در کودکان ۸۵-۹۰٪. در بزرگسالان پایین‌تر است. اگر بافت معده کافی وجود نداشته باشد اسکن منفی کاذب می‌دهد.' },
    ],
    safety: [
      'بارداری منع مطلق دارد',
      'داروهای کاهنده اسید باید با نظر پزشک قطع شوند',
      'در کودکان بسیار کوچک مشورت اطفال ضروری است',
    ],
  },
]

// ─── English content map (keyed by slug) ─────────────────────────────────────
export const SERVICE_EN = {
  'parathyroid-scan': {
    title: 'Parathyroid Scan',
    category: 'Endocrine',
    duration: '2–3 hours',
    radiation: 'Equivalent to 2 X-rays',
    resultTime: '24 hours',
    description: 'Detection of parathyroid adenoma, evaluation of suspicious neck masses, and assessment of parathyroid overactivity.',
    fullContent: 'The parathyroid scan is performed using the radioactive tracer Tc-99m Sestamibi. It is the most accurate non-invasive method for locating enlarged parathyroid glands (adenomas). Imaging is performed in two phases — early (15 minutes) and delayed (2 hours) — to distinguish the differential uptake between thyroid and parathyroid tissue.',
    details: [
      'Localization of parathyroid adenoma before surgery',
      'Evaluation of suspicious neck masses',
      'Confirmation of primary hyperparathyroidism',
      'Assessment of persistent overactivity after surgery',
      'Detection of ectopic parathyroid glands',
      'Surgical planning for minimally invasive parathyroidectomy',
    ],
    preparation: [
      'Fast for 4 hours before the scan',
      'Stop calcium supplements as instructed by your doctor',
      'Bring recent PTH and calcium lab results',
      'Essential medications may be taken with a small sip of water',
      'Wear comfortable clothing without metal zippers or buttons',
    ],
    procedure: [
      { title: 'Radiotracer injection', desc: 'Tc-99m Sestamibi is injected through a peripheral vein.' },
      { title: 'Early imaging', desc: '15 minutes after injection, the first set of images is acquired covering the neck and chest.' },
      { title: 'Waiting period', desc: '2 hours of rest — you may drink water and perform light activity.' },
      { title: 'Delayed imaging', desc: 'Late images are acquired and compared to early images to precisely locate the adenoma.' },
    ],
    faq: [
      { q: 'Is the scan painful?', a: 'No. Only a small intravenous injection is required and the imaging itself is completely painless.' },
      { q: 'Do I need to be hospitalized?', a: 'No. This is an outpatient procedure — you may go home immediately after the scan.' },
      { q: 'How long does the radiotracer remain active?', a: 'Tc-99m has a half-life of just 6 hours and is eliminated from the body within 24 hours.' },
    ],
    safety: [
      'Pregnant women or those who may be pregnant must inform the staff',
      'Nursing mothers must pause breastfeeding for 24 hours',
      'Maintain a brief distance from children under 5 after the scan',
    ],
  },
  'thyroid-scan': {
    title: 'Thyroid Scan',
    category: 'Endocrine',
    duration: '30–60 minutes',
    radiation: 'Equivalent to 1 X-ray',
    resultTime: '24 hours',
    description: 'Evaluation of thyroid gland structure and function, identification of Hot/Cold nodules, and diagnosis of hypo- and hyperthyroidism.',
    fullContent: 'The thyroid scan using Tc-99m Pertechnetate maps the functional distribution within the thyroid gland. Hyperactive areas (Hot nodules) appear brighter; hypoactive areas (Cold nodules) appear darker. Cold nodules carry a higher risk of malignancy. This scan complements ultrasound and TSH testing.',
    details: [
      'Detection of Hot and Cold thyroid nodules',
      'Assessment of goiter and thyroid enlargement',
      'Evaluation of hyperthyroidism',
      'Differentiating cause of hyperthyroidism (Graves, hot nodule, thyroiditis)',
      'Locating residual thyroid tissue after surgery',
      'Follow-up after radioiodine therapy',
    ],
    preparation: [
      'Stop thyroid medications (PTU, methimazole) 4–7 days before as directed',
      'Fast for 4 hours before the scan',
      'Avoid iodine-containing substances (drugs, contrast, seaweed) for 1 month prior',
      'Pregnant or breastfeeding women must inform staff',
      'Disclose use of amiodarone or other cardiac medications',
    ],
    procedure: [
      { title: 'Radiotracer injection', desc: 'Tc-99m Pertechnetate is injected intravenously.' },
      { title: 'Wait 20–30 minutes', desc: 'The tracer accumulates in thyroid tissue.' },
      { title: 'Imaging', desc: 'Images are acquired from multiple angles of the neck — takes 15–20 minutes.' },
      { title: 'Interpretation', desc: 'A nuclear medicine physician evaluates the distribution and writes the report.' },
    ],
    faq: [
      { q: 'What is the difference between a Hot and Cold nodule?', a: 'A Hot nodule is more active than surrounding tissue (usually benign). A Cold nodule is less active and carries a 15–20% risk of malignancy.' },
      { q: 'Can I skip stopping my thyroid medication?', a: 'Stopping the medication is essential for an accurate result. Consult your referring physician.' },
    ],
    safety: [
      'Pregnancy and breastfeeding are absolute contraindications',
      'Breastfeeding must be paused for 24 hours',
      'Excess iodine intake degrades image quality',
    ],
  },
  'myocardial-perfusion-scan': {
    title: 'Myocardial Perfusion Scan (MPI)',
    category: 'Cardiovascular',
    duration: '3–4 hours',
    radiation: 'Equivalent to 5–6 X-rays',
    resultTime: '24–48 hours',
    description: 'The most accurate non-invasive method for evaluating blood flow to the heart muscle at rest and under stress.',
    fullContent: 'Myocardial Perfusion Imaging (MPI) with Tc-99m MIBI evaluates blood flow in the heart muscle in both stress (treadmill exercise or adenosine injection) and rest states. Ischemic (underperfused) areas appear darker on stress images compared to rest. This scan provides information beyond ECG and echocardiography.',
    details: [
      'Diagnosis of coronary artery disease (CAD)',
      'Detection of myocardial ischemia and infarction',
      'Assessment of viable myocardial tissue',
      'Evaluation of left ventricular function (EF)',
      'Pre-surgical risk stratification',
      'Post-angioplasty or bypass follow-up',
    ],
    preparation: [
      'Fast for 4 hours before the scan (water is allowed)',
      'Avoid all caffeine for 24 hours (tea, coffee, chocolate, cola)',
      'Bring your cardiac medications and show them to the physician',
      'Wear comfortable walking shoes for the treadmill test',
      'Inform staff of asthma, bronchospasm, or heart block',
    ],
    procedure: [
      { title: 'Stress phase', desc: 'The patient exercises on a treadmill until heart rate reaches 85% of maximum, then the radiotracer is injected. Patients unable to exercise receive adenosine instead.' },
      { title: 'Stress imaging', desc: 'SPECT imaging of the heart is performed 30–60 minutes after stress injection.' },
      { title: 'Rest phase', desc: 'Several hours later, a second dose is injected and rest imaging is performed.' },
      { title: 'Analysis', desc: 'Stress and rest images are compared and a 3D perfusion map of the heart is generated.' },
    ],
    faq: [
      { q: 'How does MPI differ from stress echo?', a: 'MPI has higher sensitivity (85–90% vs 75–85%) and provides quantitative data on EF and regional perfusion.' },
      { q: 'Do I need to stop my cardiac medications?', a: 'Beta-blockers should be stopped 48 hours before with physician approval. Other medications are usually continued.' },
    ],
    safety: [
      'Patients with asthma must inform staff (alternative protocol available)',
      'Pregnancy is an absolute contraindication',
      'AV block grades 2 and 3 must be disclosed',
    ],
  },
  'brain-perfusion-spect': {
    title: 'Brain Perfusion SPECT',
    category: 'Brain & Neurology',
    duration: '2–3 hours',
    radiation: 'Equivalent to 4–5 X-rays',
    resultTime: '24–48 hours',
    description: '3D imaging of cerebral blood flow for diagnosing dementia, epilepsy, stroke, and neurological disorders.',
    fullContent: 'Brain SPECT with Tc-99m HMPAO or ECD maps blood flow throughout all brain regions in three dimensions. Unlike MRI, which shows structure, SPECT shows brain function. Areas with reduced blood flow may appear structurally normal on MRI yet are clearly detectable on SPECT.',
    details: [
      'Diagnosis of Alzheimer dementia and differentiation from FTD',
      'Assessment of TIA and chronic stroke',
      'Pre-surgical epileptic focus localization',
      'Evaluation of chronic traumatic brain injury (TBI)',
      'Assessment of neurological treatment efficacy',
      'Diagnosis of treatment-resistant depression',
    ],
    preparation: [
      'Rest quietly in a darkened room for 20 minutes before injection',
      'Eyes and ears covered with cotton at time of injection (minimizes sensory stimulation)',
      'Stop sedative medications as directed by your doctor',
      'Disclose all anti-epileptic medications',
      'Avoid caffeine on the day of the scan',
    ],
    procedure: [
      { title: 'Environment preparation', desc: 'Patient rests for 20 minutes in a quiet, dark room to minimize cortical activation.' },
      { title: 'HMPAO injection', desc: 'While fully relaxed, the radiotracer is injected. HMPAO fixes in brain tissue within 1 minute.' },
      { title: 'Wait 30–60 minutes', desc: 'Patient remains in a calm environment.' },
      { title: 'SPECT imaging', desc: 'The gamma camera rotates around the head to generate 3D cross-sectional images.' },
    ],
    faq: [
      { q: 'How does SPECT differ from brain PET?', a: 'PET offers higher accuracy but is more expensive and less widely available. SPECT is a suitable initial diagnostic tool.' },
      { q: 'Is the result definitive?', a: 'SPECT is a complementary tool and must be interpreted alongside clinical history, cognitive testing, and MRI.' },
    ],
    safety: [
      'Pregnancy is an absolute contraindication',
      'Epilepsy patients should take their regular medications on the day of the scan',
      'Claustrophobia should be disclosed',
    ],
  },
  'bone-scan': {
    title: 'Bone Scan (Skeletal Scintigraphy)',
    category: 'Bone & Joints',
    duration: '3–4 hours',
    radiation: 'Equivalent to 3–4 X-rays',
    resultTime: '24–48 hours',
    description: 'Whole-body skeletal imaging to detect metastases, infection, fractures, and metabolic bone disease.',
    fullContent: 'Bone scan with Tc-99m MDP is the most sensitive method for detecting metabolic changes in bone. Bone metastases are detectable 3–6 months earlier than on plain X-rays. The radiotracer accumulates in areas of active bone remodeling.',
    details: [
      'Screening and follow-up of bone metastases',
      'Diagnosis of osteomyelitis (bone infection)',
      'Stress fractures and sports injuries',
      'Avascular necrosis (bone death)',
      'Paget disease of bone',
      'Evaluation of orthopedic implants and prostheses',
    ],
    preparation: [
      'Drink 4–6 glasses of water between injection and imaging (to clear unbound tracer via kidneys)',
      'Urinate before starting imaging',
      'Remove metal objects, jewelry, and belts',
      'Inform staff of recent surgeries and old fractures',
      'Bring recent X-rays or MRI if available',
    ],
    procedure: [
      { title: 'MDP injection', desc: 'Tc-99m MDP is injected intravenously.' },
      { title: 'Wait 2–3 hours', desc: 'Drink plenty of water and urinate frequently to clear unbound tracer.' },
      { title: 'Whole-body imaging', desc: 'The gamma camera scans from head to toe (30–45 minutes). Anterior and posterior images are acquired.' },
      { title: 'Additional images', desc: 'SPECT images of suspicious areas may be acquired as needed.' },
    ],
    faq: [
      { q: 'Why do I need to drink so much water?', a: 'Water helps the unabsorbed radiotracer clear through urine, producing a cleaner image with less background noise.' },
      { q: 'Will old fractures interfere with the scan?', a: 'Healed fractures may still be visible on the scan. Knowing your fracture history is essential for correct interpretation.' },
    ],
    safety: [
      'Pregnancy is an absolute contraindication',
      'Breastfeeding mothers must pause for 24 hours',
      'Urine is mildly radioactive for the first 24 hours',
    ],
  },
  'hida-scan': {
    title: 'HIDA Scan (Hepatobiliary Scan)',
    category: 'Liver & Biliary',
    duration: '2–4 hours',
    radiation: 'Equivalent to 3–4 X-rays',
    resultTime: '24 hours',
    description: 'Evaluation of liver function, gallbladder, and bile ducts for diagnosing cholecystitis and biliary obstruction.',
    fullContent: 'The HIDA scan with Tc-99m IDA is taken up by liver cells and excreted through bile. This method provides accurate assessment of bile secretion, gallbladder filling, and gallbladder emptying. Gallbladder ejection fraction (GBEF) is quantitatively calculated.',
    details: [
      'Acute cholecystitis (95% accuracy)',
      'Chronic cholecystitis and biliary dyskinesia',
      'Common bile duct obstruction',
      'Bile leak after laparoscopic surgery',
      'Liver transplant function assessment',
      'Biliary atresia in newborns',
    ],
    preparation: [
      'Fast for 4–6 hours before the scan',
      'Stop morphine and opioid analogs 2 hours before',
      'Inform staff of any recent antibiotic use',
      'Bring recent abdominal ultrasound results',
    ],
    procedure: [
      { title: 'IDA injection', desc: 'The radiotracer is injected intravenously.' },
      { title: 'Continuous imaging', desc: 'Images are acquired every 5 minutes for 60 minutes to track bile flow.' },
      { title: 'CCK injection (if needed)', desc: 'To measure GBEF, the hormone CCK is given and gallbladder emptying is assessed.' },
      { title: 'Delayed images', desc: 'In cases of obstruction, imaging continues for up to 4–24 hours.' },
    ],
    faq: [
      { q: 'What is a normal GBEF?', a: 'Above 35% is normal. Below 35% indicates biliary dyskinesia.' },
      { q: 'Can I drink water before coming?', a: 'Yes, water is permitted. Avoid food and other beverages only.' },
    ],
    safety: [
      'Pregnancy is an absolute contraindication',
      'Morphine must be stopped as it contracts the sphincter of Oddi',
      'Newborns require bilirubin testing before the scan',
    ],
  },
  'dmsa-renal-scan': {
    title: 'DMSA Renal Cortical Scan',
    category: 'Kidney & Urinary',
    duration: '4–5 hours',
    radiation: 'Equivalent to 2–3 X-rays',
    resultTime: '24 hours',
    description: 'Detailed assessment of active renal cortical tissue, detection of renal scarring, and evaluation of split kidney function.',
    fullContent: 'DMSA scan is the gold standard for detecting renal cortical scarring. The tracer fixes in renal tubular cells and provides a precise map of active renal tissue. Scarred or damaged areas appear as cold areas (reduced uptake).',
    details: [
      'Detection of renal scarring after pyelonephritis',
      'Assessment of differential (split) renal function',
      'Diagnosis of renal hypoplasia and dysplasia',
      'Horseshoe kidney evaluation',
      'Post-VUR repair assessment',
      'Follow-up of children with recurrent UTI',
    ],
    preparation: [
      'Adequate hydration: drink 2–3 glasses of water before arrival',
      'Urinate before starting imaging',
      'Bring recent renal ultrasound results',
      'Inform staff of urinary infection history',
      'Children may require sedation',
    ],
    procedure: [
      { title: 'DMSA injection', desc: 'The radiotracer is injected intravenously.' },
      { title: 'Wait 3–4 hours', desc: 'DMSA fixes in renal tubular cells.' },
      { title: 'Static imaging', desc: 'Images are acquired from multiple angles of both kidneys.' },
      { title: 'DF calculation', desc: 'Differential function of each kidney is calculated as a percentage (normal: 45–55%).' },
    ],
    faq: [
      { q: 'When should we scan after a UTI?', a: 'Usually 3–6 months after recovery from the infection, to allow healing before assessing for permanent scarring.' },
      { q: 'How does DMSA differ from ultrasound?', a: 'Ultrasound shows structure but misses small scars. DMSA has 80–90% sensitivity for cortical scarring.' },
    ],
    safety: [
      'Pregnancy is an absolute contraindication',
      'Weight-adjusted doses are used for children',
      'Breastfeeding must be paused for 24 hours',
    ],
  },
  'dtpa-renal-scan': {
    title: 'DTPA Dynamic Renal Scan',
    category: 'Kidney & Urinary',
    duration: '1–2 hours',
    radiation: 'Equivalent to 2 X-rays',
    resultTime: '24 hours',
    description: 'Dynamic assessment of kidney function, individual GFR calculation, and diagnosis of urinary tract obstruction.',
    fullContent: 'DTPA is excreted by glomerular filtration and provides dynamic data on renal blood flow, filtration, and urinary drainage. This method can calculate GFR for each kidney individually — something blood tests cannot do.',
    details: [
      'Individual GFR calculation for each kidney',
      'Detection and grading of UPJ or UVJ obstruction',
      'Evaluation of renal artery stenosis (RAS)',
      'Kidney transplant assessment',
      'Vesicoureteral reflux with cyst evaluation',
      'Monitoring chronic kidney disease progression',
    ],
    preparation: [
      'Drink 500 ml of water 30 minutes before arrival',
      'Urinate just before starting the scan',
      'Stop diuretics 24 hours before as directed by your doctor',
      'Disclose use of ACE inhibitor antihypertensives',
    ],
    procedure: [
      { title: 'Positioning', desc: 'Patient lies under the gamma camera.' },
      { title: 'Injection and imaging start', desc: 'Dynamic imaging begins immediately after DTPA injection.' },
      { title: 'Renogram recording', desc: 'Time-activity curves (renograms) are generated for each kidney.' },
      { title: 'Furosemide injection (if needed)', desc: 'A diuretic is injected to distinguish true obstruction from non-obstructive dilation.' },
    ],
    faq: [
      { q: 'What information does the renogram provide?', a: 'Phase 1: blood flow. Phase 2: glomerular filtration. Phase 3: urinary drainage. Delay or plateau in any phase identifies the problem type.' },
      { q: 'When is MAG3 used instead of DTPA?', a: 'MAG3 is preferred in renal failure and neonates as it is excreted by tubular secretion independently of GFR.' },
    ],
    safety: [
      'Pregnancy is an absolute contraindication',
      'Furosemide allergy must be disclosed',
      'Extra caution required in diabetic patients',
    ],
  },
  'labeled-rbc-scan': {
    title: 'Labeled RBC Scan (GI Bleeding Scan)',
    category: 'Gastrointestinal',
    duration: '2–4 hours',
    radiation: 'Equivalent to 4–5 X-rays',
    resultTime: '24 hours',
    description: 'Accurate localization of GI bleeding and identification of hepatic hemangioma.',
    fullContent: 'In this technique, the patient\'s own red blood cells are labeled with Tc-99m and re-injected. Active bleeding at rates as low as 0.1 ml/min can be detected — 10 times more sensitive than angiography. Continuous imaging continues for up to 4 hours (and up to 24 hours if needed).',
    details: [
      'Slow GI bleeding not detectable by angiography',
      'Hepatic hemangioma diagnosis (95% accuracy)',
      'Colonic diverticular hemorrhage',
      'Pre-surgical bleeding site localization',
      'Evaluation of angiodysplasia',
      'Confirmation of bleeding in Meckel scan',
    ],
    preparation: [
      'No special preparation required',
      'Provide a complete medication list',
      'Bring recent endoscopy results if available',
      'Disclose history of GI conditions',
    ],
    procedure: [
      { title: 'Blood sample', desc: '3 ml of blood is drawn from the patient.' },
      { title: 'RBC labeling', desc: 'Red blood cells are labeled with Tc-99m in the nuclear medicine lab (30 minutes).' },
      { title: 'Re-injection', desc: 'Labeled RBCs are injected back into the patient.' },
      { title: 'Continuous imaging', desc: 'Imaging starts immediately and continues for up to 4 hours. Active bleeding appears as a focal area of increasing radiotracer accumulation.' },
    ],
    faq: [
      { q: 'Why are my own blood cells used?', a: 'Using the patient\'s own RBCs prevents allergic reactions and produces more stable labeling.' },
      { q: 'What if the bleeding stops during the scan?', a: 'Intermittent bleeding may appear on delayed images. Imaging can continue for up to 24 hours.' },
    ],
    safety: [
      'Pregnancy is an absolute contraindication',
      'Infection risk during the labeling process is minimized with sterile technique',
    ],
  },
  'radionuclide-cystography': {
    title: 'Radionuclide Cystography (RNC)',
    category: 'Kidney & Urinary',
    duration: '1–2 hours',
    radiation: 'Very low (1/50 of conventional VCUG)',
    resultTime: '24 hours',
    description: 'Detection of vesicoureteral reflux with minimal radiation — ideal for monitoring children.',
    fullContent: 'Direct Radionuclide Cystography (DRC) is the standard for detecting vesicoureteral reflux (VUR). Radiation exposure is 50 times lower than radiologic VCUG. For this reason it is preferred for periodic monitoring and in children.',
    details: [
      'Detection of VUR at various grades',
      'Monitoring VUR during medical therapy',
      'Assessment after Deflux injection',
      'Evaluation of neurogenic bladder',
      'Children with recurrent UTI',
      'Siblings of VUR patients',
    ],
    preparation: [
      'Drink plenty of water before arrival',
      'Bring renal ultrasound results',
      'Inform staff of UTI history and urine culture results',
      'Treat any active infection before the scan',
      'Young children require catheterization — psychological preparation is helpful',
    ],
    procedure: [
      { title: 'Catheterization', desc: 'A thin catheter is placed in the bladder under sterile conditions.' },
      { title: 'Bladder filling', desc: 'Radioactive solution is instilled into the bladder through the catheter.' },
      { title: 'Continuous imaging', desc: 'Reflux toward the ureters is assessed during both filling and voiding phases.' },
      { title: 'Voiding phase', desc: 'The patient voids and reflux is assessed during this phase as well.' },
    ],
    faq: [
      { q: 'Is catheterization painful?', a: 'With anesthetic gel and a gentle technique, discomfort is minimized. Parental reassurance greatly helps children.' },
      { q: 'What is the difference between DRC and VCUG?', a: 'VCUG provides better anatomical detail but delivers more radiation. DRC is ideal for monitoring and for children.' },
    ],
    safety: [
      'Active UTI should be treated before the scan',
      'Allergy to antiseptic agents must be disclosed',
      'Age-appropriate explanation is essential for children',
    ],
  },
  'lung-perfusion-scan': {
    title: 'Lung Perfusion Scan (V/Q Scan)',
    category: 'Lung & Respiratory',
    duration: '1–2 hours',
    radiation: 'Equivalent to 2–3 X-rays',
    resultTime: '24 hours',
    description: 'Gold standard for diagnosing pulmonary embolism and evaluating lung perfusion with minimal radiation.',
    fullContent: 'The V/Q lung scan uses Tc-99m MAA (perfusion) and Tc-99m aerosol or Kr-81m (ventilation). In pulmonary embolism, perfusion is reduced in an area while ventilation remains normal (mismatch). This method delivers lower fetal radiation than CT angiography in pregnancy.',
    details: [
      'Diagnosis of pulmonary embolism (PE) — 98% sensitivity',
      'Pre-surgical evaluation (pneumonectomy)',
      'Detection of chronic pulmonary hypertension',
      'Lung volume reduction surgery (LVRS) planning',
      'Post-PE treatment follow-up',
      'Safe alternative in pregnancy (lower dose than CTA)',
    ],
    preparation: [
      'Bring a recent chest X-ray (within 24 hours)',
      'Inform staff of respiratory medications and bronchodilators',
      'Disclose prior pulmonary embolism history',
      'Inform staff of severe pulmonary hypertension',
    ],
    procedure: [
      { title: 'Ventilation scan', desc: 'Patient inhales radioactive particles through a mask to assess air distribution in the lungs.' },
      { title: 'MAA injection', desc: 'Radiotracer is injected intravenously to assess pulmonary blood flow.' },
      { title: 'Multi-angle imaging', desc: 'Images are acquired from 8 angles of the lungs.' },
      { title: 'V/Q comparison', desc: 'Ventilation and perfusion patterns are compared to determine the probability of PE.' },
    ],
    faq: [
      { q: 'V/Q or CT angiography?', a: 'CT angio provides a more definitive diagnosis, but V/Q is preferred in pregnancy, contrast allergy, and renal insufficiency.' },
      { q: 'What does a "high probability" result mean?', a: '85% probability of PE. Combined with clinical history this rises to 96% — treatment is required.' },
    ],
    safety: [
      'Patients with severe pulmonary hypertension should receive a reduced dose',
      'A strong clinical indication is required during pregnancy',
      'Active asthma may affect ventilation image quality',
    ],
  },
  'meckel-scan': {
    title: 'Meckel Diverticulum Scan',
    category: 'Gastrointestinal',
    duration: '1–2 hours',
    radiation: 'Equivalent to 2 X-rays',
    resultTime: '24 hours',
    description: 'Detection of Meckel diverticulum and ectopic gastric mucosa — the most common cause of GI bleeding in children.',
    fullContent: 'Meckel diverticulum is the most common congenital GI anomaly (2% of the population). Gastric mucosal tissue within it secretes acid, causing ulceration and bleeding. Tc-99m Pertechnetate is absorbed by gastric parietal cells — wherever this tissue exists (in the normal stomach or in a Meckel), it is visible on the scan.',
    details: [
      'Unexplained GI bleeding in children',
      'Iron deficiency anemia without explanation',
      'Chronic abdominal pain in children',
      'Pre-surgical evaluation of diverticulum',
      'Detection of ectopic gastric mucosa in the ileum',
      'After ruling out other causes of GI bleeding',
    ],
    preparation: [
      'Fast for 4 hours before the scan',
      'Stop proton pump inhibitors (PPI) 48–72 hours before as directed',
      'Stop H2 antagonists 48 hours before',
      'No barium studies or radioactive scans the day before',
      'Young children may require sedation',
    ],
    procedure: [
      { title: 'Pertechnetate injection', desc: 'The radiotracer is injected intravenously.' },
      { title: 'Continuous imaging', desc: 'Images are acquired every 5 minutes for 45–60 minutes over the abdomen.' },
      { title: 'Uptake tracking', desc: 'Tracer uptake in the normal stomach (reference) is compared to any abnormal abdominal focus.' },
      { title: 'Delayed images', desc: 'If suspicion remains, imaging continues up to 2 hours.' },
    ],
    faq: [
      { q: 'Why must PPIs be stopped?', a: 'PPIs inhibit Pertechnetate secretion by gastric mucosa, reducing scan sensitivity.' },
      { q: 'What is the sensitivity of the Meckel scan?', a: 'In children: 85–90%. Lower in adults. False negatives occur when insufficient gastric mucosa is present.' },
    ],
    safety: [
      'Pregnancy is an absolute contraindication',
      'Acid-suppressing medications must be stopped as directed by your physician',
      'Pediatric consultation is required for very young children',
    ],
  },
}

const ICON_RENDER = {
  'parathyroid-scan':         (c, s) => <ParathyroidIcon size={s} color={c} />,
  'thyroid-scan':             (c, s) => <ThyroidIcon size={s} color={c} />,
  'myocardial-perfusion-scan':(c, s) => <HeartIcon size={s} color={c} />,
  'brain-perfusion-spect':    (c, s) => <BrainIcon size={s} color={c} />,
  'bone-scan':                (c, s) => <BoneIcon size={s} color={c} />,
  'hida-scan':                (c, s) => <LiverIcon size={s} color={c} />,
  'dmsa-renal-scan':          (c, s) => <KidneyIcon size={s} color={c} />,
  'dtpa-renal-scan':          (c, s) => <KidneyIcon size={s} color={c} />,
  'labeled-rbc-scan':         (c, s) => <RBCIcon size={s} color={c} />,
  'radionuclide-cystography': (c, s) => <CystographyIcon size={s} color={c} />,
  'lung-perfusion-scan':      (c, s) => <LungIcon size={s} color={c} />,
  'meckel-scan':              (c, s) => <MeckelIcon size={s} color={c} />,
}

const CATEGORY_EN_MAP = {
  'غدد درون‌ریز':        'Endocrine',
  'قلب و عروق':          'Cardiovascular',
  'مغز و اعصاب':         'Brain & Neurology',
  'استخوان و مفاصل':     'Bone & Joints',
  'کبد و صفرا':          'Liver & Biliary',
  'کلیه و مجاری ادراری': 'Kidney & Urinary',
  'گوارش':               'Gastrointestinal',
  'ریه و تنفس':          'Lung & Respiratory',
}

export default function Services() {
  const { t, i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const [activeCategory, setCategory] = useState('all')
  const navigate = useNavigate()

  const filtered = SERVICES.filter(
    s => activeCategory === 'all' || s.category === activeCategory
  )

  const ALL_CATEGORIES = [
    { key: 'all', label: isEN ? 'All' : t('scans.all') },
    ...Array.from(new Set(SERVICES.map(s => s.category))).map(cat => ({
      key: cat,
      label: isEN ? (CATEGORY_EN_MAP[cat] ?? cat) : cat,
    })),
  ]

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      {/* Hero */}
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: 8,
        background: 'linear-gradient(135deg, #0B6E4F 0%, #17a2a2 50%, #1976D2 100%)',
        position: 'relative', overflow: 'hidden' }}>
        {[...Array(3)].map((_, i) => (
          <MotionBox key={i}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
            sx={{ position: 'absolute', width: 180 + i * 100, height: 180 + i * 100,
              borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)',
              top: `${5 + i * 20}%`, left: `${5 + i * 20}%`, pointerEvents: 'none' }} />
        ))}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
              {t('services.title')}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem',
              maxWidth: 640, mx: 'auto', mb: 5, lineHeight: 1.9 }}>
              {t('services.subtitle')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 4, md: 8 }, flexWrap: 'wrap' }}>
              {[{ n: '۱۲+', l: t('services.servicesCount') }, { n: '+۲۵', l: t('services.yearsExp') }, { n: 'Dual Head', l: 'SPECT Camera' }]
                .map((s, i) => (
                  <Box key={i} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.8rem' }}>{s.n}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{s.l}</Typography>
                  </Box>
                ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Category filter */}
        <Box sx={{ mb: 5, display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
          {ALL_CATEGORIES.map(cat => (
            <motion.div key={cat.key} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Chip label={cat.label} onClick={() => setCategory(cat.key)} clickable
                sx={{ px: 1, py: 2.5, fontWeight: 600, fontSize: '0.88rem',
                  background: activeCategory === cat.key
                    ? 'linear-gradient(135deg, #0B6E4F, #1976D2)' : '#fff',
                  color: activeCategory === cat.key ? '#fff' : '#555',
                  boxShadow: activeCategory === cat.key
                    ? '0 4px 15px rgba(11,110,79,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                  border: activeCategory === cat.key ? 'none' : '1px solid #e0e0e0',
                  transition: 'all 0.3s' }} />
            </motion.div>
          ))}
        </Box>

        <Typography sx={{ color: '#888', mb: 4, textAlign: 'center' }}>
          {filtered.length} {t('services.servicesCount')}
        </Typography>

        <AnimatePresence mode="wait">
          <Grid container spacing={3}>
            {filtered.map((service, index) => {
              const realImage = IMAGE_MAP[service.slug]
              const iconEl    = ICON_RENDER[service.slug]?.(service.color, 64)
              const sEN       = SERVICE_EN[service.slug] ?? {}
              const sTitle    = isEN && sEN.title       ? sEN.title       : service.title
              const sDesc     = isEN && sEN.description ? sEN.description : service.description
              const sCat      = isEN && sEN.category    ? sEN.category    : service.category
              const sDetails  = isEN && sEN.details     ? sEN.details     : service.details

              return (
                <Grid item xs={12} sm={6} md={4} key={service.slug}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: index * 0.06 }} layout>
                    <MotionCard
                      onClick={() => navigate(`/services/${service.slug}`)}
                      whileHover={{ y: -8 }} whileTap={{ scale: 0.98 }}
                      sx={{ borderRadius: 4, cursor: 'pointer', overflow: 'hidden', height: '100%',
                        border: '2px solid transparent', transition: 'all 0.3s',
                        '&:hover': { borderColor: service.color,
                          boxShadow: `0 16px 40px ${service.color}25` },
                        boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>

                      {/* Colored top bar */}
                      <Box sx={{ height: 5, background: service.gradient }} />

                      {/* Image or icon area */}
                      <Box sx={{ height: 140, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', background: `${service.color}08`,
                        position: 'relative', overflow: 'hidden' }}>
                        {/* Decorative circle behind */}
                        <Box sx={{ position: 'absolute', width: 130, height: 130,
                          borderRadius: '50%', background: `${service.color}10`,
                          border: `2px solid ${service.color}20` }} />
                        {realImage ? (
                          <Box component="img" src={realImage} alt={service.title}
                            sx={{ height: 100, width: 100, objectFit: 'cover',
                              position: 'relative', zIndex: 1,
                              borderRadius: '16px',
                              filter: `drop-shadow(0 4px 12px ${service.color}40)` }}
                            onError={e => { e.target.style.display = 'none' }} />
                        ) : (
                          <Box sx={{ position: 'relative', zIndex: 1 }}>{iconEl}</Box>
                        )}
                      </Box>

                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between',
                          alignItems: 'flex-start', mb: 1.5 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.4, flex: 1 }}>
                            {sTitle}
                          </Typography>
                          <Chip label={sCat} size="small"
                            sx={{ mr: 1, background: `${service.color}15`, color: service.color,
                              fontWeight: 600, fontSize: '0.72rem', flexShrink: 0 }} />
                        </Box>

                        <Typography sx={{ fontSize: '0.78rem', color: service.color,
                          fontWeight: 600, mb: 1.5, fontFamily: 'monospace',
                          opacity: 0.8 }}>
                          {service.subtitle}
                        </Typography>

                        <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8, mb: 2 }}>
                          {sDesc}
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        {/* Preview indications */}
                        <Box sx={{ mb: 2 }}>
                          {sDetails.slice(0, 2).map((d, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start',
                              gap: 1, mb: 0.8 }}>
                              <CheckCircleIcon sx={{ color: service.color,
                                fontSize: '0.85rem', flexShrink: 0, mt: 0.25 }} />
                              <Typography sx={{ fontSize: '0.8rem', color: '#666',
                                lineHeight: 1.5 }}>{d}</Typography>
                            </Box>
                          ))}
                          {sDetails.length > 2 && (
                            <Typography sx={{ fontSize: '0.78rem', color: service.color,
                              fontWeight: 600, mr: 2.5, mt: 0.5 }}>
                              +{sDetails.length - 2} {t('services.moreItems')}
                            </Typography>
                          )}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between',
                          alignItems: 'center' }}>
                          <Chip icon={<AccessTimeIcon sx={{ fontSize: '0.85rem !important' }} />}
                            label={service.duration} size="small"
                            sx={{ background: '#f5f5f5', color: '#666', fontSize: '0.78rem' }} />
                          <Button size="small" endIcon={<ArrowBackIcon sx={{ fontSize: '0.9rem !important' }} />}
                            sx={{ color: service.color, fontWeight: 700, fontSize: '0.82rem',
                              '&:hover': { background: `${service.color}10` } }}>
                            {t('services.readMore')}
                          </Button>
                        </Box>
                      </CardContent>
                    </MotionCard>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </AnimatePresence>
      </Container>

      {/* Equipment */}
      <Box sx={{ background: 'linear-gradient(135deg, #0B6E4F 0%, #1976D2 100%)', py: 8, mt: 4 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 4 }}>
            {t('services.equipment')}
          </Typography>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4,
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)', mb: 4 }}>
            <Typography sx={{ color: '#fff', fontSize: '1.1rem', lineHeight: 2 }}>
              {t('services.equipmentDesc')}
            </Typography>
          </Paper>
          <Button variant="contained" size="large"
            sx={{ background: '#fff', color: '#0B6E4F', borderRadius: '50px',
              px: 5, py: 1.5, fontWeight: 700, fontSize: '1rem',
              '&:hover': { background: '#E6F4EA' } }}>
            📞 {t('services.bookPhone')}
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
