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

const getCategories = (t) => [t('scans.all'), ...new Set(SERVICES.map(s => s.category))]

export default function Services() {
  const { t } = useTranslation()
  const [activeCategory, setCategory] = useState('all')
  const navigate = useNavigate()

  const filtered = SERVICES.filter(
    s => activeCategory === 'all' || activeCategory === t('scans.all') || s.category === activeCategory
  )

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
          {getCategories(t).map(cat => (
            <motion.div key={cat} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Chip label={cat} onClick={() => setCategory(cat)} clickable
                sx={{ px: 1, py: 2.5, fontWeight: 600, fontSize: '0.88rem',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #0B6E4F, #1976D2)' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#555',
                  boxShadow: activeCategory === cat
                    ? '0 4px 15px rgba(11,110,79,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                  border: activeCategory === cat ? 'none' : '1px solid #e0e0e0',
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
                            {service.title}
                          </Typography>
                          <Chip label={service.category} size="small"
                            sx={{ mr: 1, background: `${service.color}15`, color: service.color,
                              fontWeight: 600, fontSize: '0.72rem', flexShrink: 0 }} />
                        </Box>

                        <Typography sx={{ fontSize: '0.78rem', color: service.color,
                          fontWeight: 600, mb: 1.5, fontFamily: 'monospace',
                          opacity: 0.8 }}>
                          {service.subtitle}
                        </Typography>

                        <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8, mb: 2 }}>
                          {service.description}
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        {/* Preview indications */}
                        <Box sx={{ mb: 2 }}>
                          {service.details.slice(0, 2).map((d, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start',
                              gap: 1, mb: 0.8 }}>
                              <CheckCircleIcon sx={{ color: service.color,
                                fontSize: '0.85rem', flexShrink: 0, mt: 0.25 }} />
                              <Typography sx={{ fontSize: '0.8rem', color: '#666',
                                lineHeight: 1.5 }}>{d}</Typography>
                            </Box>
                          ))}
                          {service.details.length > 2 && (
                            <Typography sx={{ fontSize: '0.78rem', color: service.color,
                              fontWeight: 600, mr: 2.5, mt: 0.5 }}>
                              +{service.details.length - 2} {t('services.moreItems')}
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
