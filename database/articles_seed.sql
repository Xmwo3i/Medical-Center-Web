SET NAMES utf8mb4;
USE caspian_nuclear;

INSERT INTO articles (title, title_en, slug, excerpt, excerpt_en, content, content_en, author_name, category, tags, is_published, is_featured, reading_time, published_at) VALUES

(
  'پزشکی هسته‌ای چیست و چگونه کار می‌کند؟',
  'What is Nuclear Medicine and How Does It Work?',
  'what-is-nuclear-medicine',
  'آشنایی با اصول پایه پزشکی هسته‌ای، نحوه استفاده از مواد رادیواکتیو در تشخیص و درمان بیماری‌ها',
  'An introduction to the basic principles of nuclear medicine and how radioactive materials are used in diagnosing and treating diseases.',
  'پزشکی هسته‌ای شاخه‌ای از علم پزشکی است که از مواد رادیواکتیو برای تشخیص و درمان بیماری‌ها استفاده می‌کند.\n\nدر این روش، داروهای رادیواکتیو کوچک (رادیوفارماسوتیکال) به بدن بیمار تزریق می‌شوند. این مواد در اندام‌های مختلف جمع می‌شوند و پرتوهای گاما ساطع می‌کنند که توسط دوربین‌های خاص (گاما کمرا) شناسایی می‌شوند.\n\nبرخلاف روش‌های تصویربرداری دیگر مثل رادیوگرافی یا سی‌تی‌اسکن که تنها ساختار آناتومیک را نشان می‌دهند، پزشکی هسته‌ای اطلاعاتی درباره عملکرد واقعی اندام‌ها ارائه می‌دهد.\n\nمزایای اصلی پزشکی هسته‌ای:\n- تشخیص بیماری در مراحل بسیار اولیه\n- بررسی عملکرد اندام‌ها به صورت دقیق\n- روشی بی‌خطر و سرپایی\n- کمترین درد و ناراحتی برای بیمار\n\nمواد رادیواکتیو استفاده‌شده در پزشکی هسته‌ای نیمه‌عمر بسیار کوتاهی دارند و در مدت کوتاهی از بدن دفع می‌شوند، بنابراین خطر آن‌ها برای بدن بسیار ناچیز است.',
  'Nuclear medicine is a branch of medicine that uses radioactive substances to diagnose and treat diseases.\n\nIn this method, small radioactive drugs (radiopharmaceuticals) are injected into the patient body. These substances accumulate in various organs and emit gamma rays that are detected by special cameras (gamma cameras).\n\nUnlike other imaging methods such as X-rays or CT scans that only show anatomical structure, nuclear medicine provides information about the actual function of organs.\n\nMain advantages of nuclear medicine:\n- Detection of disease at very early stages\n- Accurate assessment of organ function\n- A safe and outpatient procedure\n- Minimal pain and discomfort for the patient\n\nThe radioactive materials used in nuclear medicine have very short half-lives and are excreted from the body in a short time, so their risk to the body is very minimal.',
  'دکتر امیر حسن‌زاده', 'آموزشی', 'پزشکی هسته‌ای,تصویربرداری,رادیواکتیو', 1, 1, 5, NOW()
),

(
  'همه چیز درباره اسکن قلب: آمادگی، روش و نتایج',
  'Everything About Heart Scan: Preparation, Procedure and Results',
  'heart-scan-guide',
  'راهنمای کامل اسکن پرفیوژن میوکارد برای بررسی جریان خون قلب و تشخیص بیماری‌های عروق کرونری',
  'A complete guide to myocardial perfusion imaging for assessing cardiac blood flow and diagnosing coronary artery disease.',
  'اسکن قلب یا اسکن پرفیوژن میوکارد یکی از دقیق‌ترین روش‌های غیرتهاجمی برای بررسی سلامت قلب است.\n\nچه کسانی نیاز به اسکن قلب دارند؟\n- افراد با درد قفسه سینه یا تنگی نفس\n- بیمارانی که سابقه بیماری قلبی دارند\n- افرادی که برای عمل جراحی قلب آماده می‌شوند\n- کسانی با عوامل خطر مثل فشار خون بالا، دیابت یا کلسترول بالا\n\nنحوه آمادگی:\n- ۴ ساعت قبل ناشتا باشید\n- از مصرف کافئین ۲۴ ساعت قبل خودداری کنید\n- داروهای قلبی را طبق دستور پزشک ادامه یا قطع کنید\n- لباس راحت بپوشید\n\nروند انجام اسکن:\nاسکن در دو مرحله استراحت و استرس انجام می‌شود. در مرحله استرس، بیمار روی تردمیل راه می‌رود یا داروی مخصوص دریافت می‌کند. ماده رادیواکتیو Tc-99m MIBI تزریق شده و تصاویر گرفته می‌شود.\n\nنتایج اسکن قلب می‌تواند نشان دهد:\n- نواحی کم‌خون قلب (ایسکمی)\n- سکته قلبی قدیمی\n- عملکرد کلی قلب',
  'Heart scan or myocardial perfusion imaging is one of the most accurate non-invasive methods for assessing heart health.\n\nWho needs a heart scan?\n- People with chest pain or shortness of breath\n- Patients with a history of heart disease\n- People preparing for heart surgery\n- Those with risk factors such as high blood pressure, diabetes, or high cholesterol\n\nHow to prepare:\n- Fast for 4 hours before the scan\n- Avoid caffeine 24 hours before\n- Continue or stop heart medications as directed by your doctor\n- Wear comfortable clothing\n\nScan procedure:\nThe scan is performed in two stages: rest and stress. In the stress stage, the patient walks on a treadmill or receives a special medication. The radioactive material Tc-99m MIBI is injected and images are taken.\n\nHeart scan results can show:\n- Areas of reduced blood flow (ischemia)\n- Old heart attack\n- Overall heart function',
  'دکتر امیر حسن‌زاده', 'قلب و عروق', 'اسکن قلب,پرفیوژن میوکارد,بیماری قلبی', 1, 1, 6, NOW()
),

(
  'تیروئید و نقش آن در سلامت بدن',
  'The Thyroid and Its Role in Body Health',
  'thyroid-and-body-health',
  'آشنایی با غده تیروئید، هورمون‌های آن و اهمیت اسکن تیروئید در تشخیص بیماری‌های تیروئیدی',
  'An introduction to the thyroid gland, its hormones, and the importance of thyroid scanning in diagnosing thyroid diseases.',
  'غده تیروئید یکی از مهم‌ترین غدد درون‌ریز بدن است که هورمون‌هایی تولید می‌کند که تقریباً هر عملکرد بدن را کنترل می‌کنند.\n\nبیماری‌های شایع تیروئید:\n\n۱. پرکاری تیروئید (هیپرتیروئیدیسم):\n- کاهش وزن ناخواسته\n- ضربان قلب سریع\n- عصبانیت و اضطراب\n- تعریق زیاد\n\n۲. کم‌کاری تیروئید (هیپوتیروئیدیسم):\n- افزایش وزن\n- خستگی مزمن\n- افسردگی\n- یبوست\n\n۳. ندول‌های تیروئید:\nندول‌های تیروئید توده‌هایی هستند که در غده تیروئید تشکیل می‌شوند. اکثر آن‌ها خوش‌خیم هستند اما برخی ممکن است بدخیم باشند.\n\nچرا اسکن تیروئید مهم است؟\nاسکن تیروئید با Tc-99m می‌تواند نشان دهد کدام ندول‌ها گرم (فعال و معمولاً خوش‌خیم) و کدام سرد (کم‌فعال و نیازمند بررسی بیشتر) هستند.',
  'The thyroid gland is one of the most important endocrine glands in the body that produces hormones controlling nearly every bodily function.\n\nCommon thyroid diseases:\n\n1. Hyperthyroidism:\n- Unintentional weight loss\n- Rapid heartbeat\n- Irritability and anxiety\n- Excessive sweating\n\n2. Hypothyroidism:\n- Weight gain\n- Chronic fatigue\n- Depression\n- Constipation\n\n3. Thyroid nodules:\nThyroid nodules are masses that form in the thyroid gland. Most are benign but some may be malignant.\n\nWhy is thyroid scanning important?\nThyroid scanning with Tc-99m can show which nodules are hot (active and usually benign) and which are cold (less active and requiring further investigation). This information is crucial for deciding whether a biopsy is needed.',
  'دکتر مریم صادقی', 'غدد درون‌ریز', 'تیروئید,هورمون,اسکن تیروئید', 1, 1, 7, NOW()
),

(
  'سرطان و پزشکی هسته‌ای: از تشخیص تا درمان',
  'Cancer and Nuclear Medicine: From Diagnosis to Treatment',
  'cancer-and-nuclear-medicine',
  'نقش کلیدی پزشکی هسته‌ای در تشخیص زودهنگام سرطان، مرحله‌بندی بیماری و پیگیری پاسخ به درمان',
  'The key role of nuclear medicine in early cancer detection, disease staging, and monitoring treatment response.',
  'پزشکی هسته‌ای در مبارزه با سرطان نقش بسیار مهمی ایفا می‌کند. از تشخیص اولیه گرفته تا پیگیری درمان، این تخصص ابزارهای قدرتمندی در اختیار پزشکان قرار می‌دهد.\n\nPET اسکن: قوی‌ترین ابزار تشخیص سرطان\nاسکن PET-CT با استفاده از FDG (گلوکز رادیواکتیو) فعالیت متابولیک سلول‌های سرطانی را نشان می‌دهد. سلول‌های سرطانی گلوکز بیشتری مصرف می‌کنند و در تصویر روشن‌تر دیده می‌شوند.\n\nکاربردهای PET اسکن در آنکولوژی:\n- تشخیص تومور اولیه\n- بررسی گسترش بیماری (متاستاز)\n- ارزیابی پاسخ به شیمی‌درمانی\n- تشخیص عود بیماری پس از درمان\n- برنامه‌ریزی دقیق رادیوتراپی\n\nدرمان با مواد رادیواکتیو:\nعلاوه بر تشخیص، پزشکی هسته‌ای در درمان برخی سرطان‌ها نیز موثر است:\n- ید رادیواکتیو (I-131) برای درمان سرطان تیروئید\n- رادیوامبولیزاسیون برای تومورهای کبد\n- لوتتیوم-177 برای سرطان پروستات',
  'Nuclear medicine plays a very important role in the fight against cancer. From initial detection to treatment monitoring, this specialty provides physicians with powerful tools.\n\nPET Scan: The most powerful cancer detection tool\nPET-CT scanning using FDG (radioactive glucose) shows the metabolic activity of cancer cells. Cancer cells consume more glucose and appear brighter in the image.\n\nApplications of PET scan in oncology:\n- Detection of primary tumor\n- Assessment of disease spread (metastasis)\n- Evaluation of response to chemotherapy\n- Detection of disease recurrence after treatment\n- Precise radiotherapy planning\n\nTreatment with radioactive materials:\nIn addition to diagnosis, nuclear medicine is also effective in treating some cancers:\n- Radioactive iodine (I-131) for thyroid cancer treatment\n- Radioembolization for liver tumors\n- Lutetium-177 for prostate cancer',
  'دکتر مریم صادقی', 'آنکولوژی', 'سرطان,PET اسکن,آنکولوژی هسته‌ای', 1, 1, 8, NOW()
),

(
  'بیماری‌های استخوانی و اسکن استخوان',
  'Bone Diseases and Bone Scanning',
  'bone-diseases-and-scanning',
  'آشنایی با اسکن استخوان، کاربردهای آن در تشخیص متاستاز، شکستگی‌ها و عفونت‌های استخوانی',
  'An introduction to bone scanning, its applications in detecting metastases, fractures, and bone infections.',
  'اسکن استخوان یکی از پرکاربردترین روش‌های تصویربرداری هسته‌ای است که اطلاعات ارزشمندی درباره سلامت استخوان‌ها ارائه می‌دهد.\n\nچرا اسکن استخوان انجام می‌شود؟\n\n۱. تشخیص متاستاز استخوانی:\nوقتی سرطان از محل اولیه خود به استخوان‌ها گسترش می‌یابد، اسکن استخوان می‌تواند همه نقاط درگیر را در یک بررسی نشان دهد.\n\n۲. شکستگی‌های پنهان:\nشکستگی‌هایی که در عکس رادیوگرافی دیده نمی‌شوند، در اسکن استخوان آشکار می‌شوند.\n\n۳. عفونت استخوانی (استئومیلیت):\nتشخیص عفونت استخوانی در مراحل اولیه که درمان آن آسان‌تر است.\n\n۴. بیماری پاژه:\nنظارت بر این بیماری که باعث تغییر شکل استخوان‌ها می‌شود.\n\nنحوه انجام اسکن استخوان:\nماده رادیواکتیو Tc-99m MDP تزریق شده و ۲-۳ ساعت بعد تصویربرداری از کل بدن انجام می‌شود. این ماده در نقاطی که فعالیت استخوانی بیشتری دارند تجمع می‌یابد.',
  'Bone scanning is one of the most widely used nuclear imaging methods that provides valuable information about bone health.\n\nWhy is bone scanning performed?\n\n1. Detection of bone metastases:\nWhen cancer spreads from its primary location to bones, a bone scan can show all affected areas in one examination.\n\n2. Hidden fractures:\nFractures that are not visible on X-rays are revealed in bone scans.\n\n3. Bone infection (osteomyelitis):\nDetection of bone infection in early stages when treatment is easier.\n\n4. Paget disease:\nMonitoring this disease that causes bone deformity.\n\nHow bone scanning is performed:\nThe radioactive material Tc-99m MDP is injected and 2-3 hours later whole-body imaging is performed. This material accumulates in areas with greater bone activity such as the injured area.',
  'دکتر رضا کمالی', 'استخوان و مفاصل', 'اسکن استخوان,متاستاز,استئومیلیت', 1, 0, 6, NOW()
),

(
  'بیماری کلیه را بشناسید: نقش اسکن کلیه در تشخیص',
  'Understanding Kidney Disease: The Role of Kidney Scanning in Diagnosis',
  'kidney-disease-and-scanning',
  'اسکن کلیه چگونه به ارزیابی عملکرد کلیه، انسداد مجاری ادراری و فشار خون کلیوی کمک می‌کند',
  'How kidney scanning helps evaluate kidney function, urinary tract obstruction, and renovascular hypertension.',
  'کلیه‌ها اندام‌های حیاتی هستند که خون را فیلتر کرده، مواد زائد را دفع می‌کنند و تعادل مایعات بدن را حفظ می‌کنند. اسکن کلیه ابزار قدرتمندی برای ارزیابی سلامت این اندام‌هاست.\n\nانواع اسکن کلیه:\n\n۱. اسکن DMSA:\nبهترین روش برای بررسی بافت عملکردی کلیه. در تشخیص اسکار کلیوی پس از عفونت‌های ادراری در کودکان بسیار مفید است.\n\n۲. اسکن DTPA:\nارزیابی تخلیه کلیوی و تشخیص انسداد در مجاری ادراری.\n\nعلائم هشداردهنده کلیوی:\n- تورم پاها یا صورت\n- ادرار کف‌آلود یا خونی\n- درد پهلو\n- فشار خون بالا بدون دلیل مشخص\n- خستگی مداوم\n\nچه کسانی باید اسکن کلیه انجام دهند؟\n- کودکان با عفونت‌های مکرر ادراری\n- بیماران با فشار خون کنترل‌نشده\n- افراد با سنگ کلیه مکرر\n- بیماران پیوند کلیه',
  'Kidneys are vital organs that filter blood, excrete waste products, and maintain the fluid balance of the body. Kidney scanning is a powerful tool for assessing the health of these organs.\n\nTypes of kidney scans:\n\n1. DMSA scan:\nThe best method for examining functional kidney tissue. Very useful in detecting renal scarring after urinary tract infections in children.\n\n2. DTPA scan:\nEvaluation of renal drainage and detection of obstruction in urinary tracts.\n\nWarning signs of kidney disease:\n- Swelling of feet or face\n- Foamy or bloody urine\n- Flank pain\n- High blood pressure without clear cause\n- Persistent fatigue\n\nWho should have a kidney scan?\n- Children with recurrent urinary tract infections\n- Patients with uncontrolled blood pressure\n- People with recurrent kidney stones\n- Kidney transplant patients',
  'دکتر نیلوفر قاسمی', 'کلیه و مجاری ادراری', 'اسکن کلیه,DMSA,DTPA,کلیه', 1, 0, 7, NOW()
),

(
  'آلزایمر و تصویربرداری هسته‌ای مغز',
  'Alzheimer and Nuclear Brain Imaging',
  'alzheimer-brain-imaging',
  'چگونه اسکن SPECT مغز در تشخیص زودهنگام آلزایمر، زوال عقل و سایر اختلالات عصبی کمک می‌کند',
  'How brain SPECT scanning helps in early detection of Alzheimer disease, dementia, and other neurological disorders.',
  'آلزایمر شایع‌ترین نوع زوال عقل است که تدریجاً حافظه، تفکر و رفتار را مختل می‌کند. تشخیص زودهنگام این بیماری اهمیت فراوانی دارد زیرا درمان در مراحل اولیه موثرتر است.\n\nاسکن SPECT مغز چیست؟\nاسکن SPECT (Single Photon Emission Computed Tomography) جریان خون مغزی را اندازه‌گیری می‌کند. در بیماری آلزایمر، نواحی خاصی از مغز کاهش جریان خون را نشان می‌دهند.\n\nتفاوت SPECT از MRI:\n- MRI: ساختار آناتومیک را نشان می‌دهد\n- SPECT: عملکرد مغز را نشان می‌دهد\n\nسایر کاربردهای اسکن مغز:\n- تشخیص افتراقی انواع زوال عقل\n- ارزیابی بعد از سکته مغزی\n- تشخیص صرع و یافتن کانون آن\n- ارزیابی تومورهای مغزی\n- بررسی آسیب‌های مغزی پس از تصادف',
  'Alzheimer is the most common form of dementia that progressively impairs memory, thinking, and behavior. Early detection of this disease is very important because treatment is more effective in early stages.\n\nWhat is brain SPECT scanning?\nSPECT (Single Photon Emission Computed Tomography) scanning measures cerebral blood flow. In Alzheimer disease, specific areas of the brain show reduced blood flow.\n\nDifference between SPECT and MRI:\n- MRI: Shows anatomical structure\n- SPECT: Shows brain function\n\nOther applications of brain scanning:\n- Differential diagnosis of types of dementia\n- Assessment after stroke\n- Detection of epilepsy and locating its focus\n- Evaluation of brain tumors\n- Assessment of brain injuries after accidents',
  'دکتر رضا کمالی', 'مغز و اعصاب', 'آلزایمر,SPECT,مغز,زوال عقل', 1, 1, 8, NOW()
),

(
  'آنچه باید درباره پرتوگیری در پزشکی هسته‌ای بدانید',
  'What You Need to Know About Radiation in Nuclear Medicine',
  'radiation-safety-nuclear-medicine',
  'واقعیت‌هایی درباره میزان پرتوگیری در اسکن‌های هسته‌ای و مقایسه آن با پرتوگیری روزانه طبیعی',
  'Facts about radiation exposure in nuclear medicine scans and its comparison with natural daily radiation exposure.',
  'یکی از نگرانی‌های رایج بیماران درباره اسکن‌های هسته‌ای، پرتوگیری است. در این مقاله این نگرانی را با اطلاعات علمی دقیق بررسی می‌کنیم.\n\nپرتوگیری در زندگی روزمره:\nهمه ما در زندگی روزمره در معرض پرتوهای طبیعی هستیم:\n- پرتوهای کیهانی: ۰.۴ میلی‌سیورت در سال\n- مواد رادیواکتیو طبیعی در خاک: ۰.۵ میلی‌سیورت در سال\n- رادون در هوا: ۱.۳ میلی‌سیورت در سال\n\nمقایسه با اسکن‌های رایج:\n- اسکن تیروئید: ۱ میلی‌سیورت\n- اسکن استخوان: ۳ میلی‌سیورت\n- اسکن قلب: ۵-۱۰ میلی‌سیورت\n\nنیمه‌عمر کوتاه مواد رادیواکتیو:\nTc-99m که در اکثر اسکن‌ها استفاده می‌شود نیمه‌عمری فقط ۶ ساعت دارد.\n\nتوصیه‌های احتیاطی پس از اسکن:\n- آب زیاد بنوشید تا ماده سریع‌تر از طریق ادرار دفع شود\n- ۲۴ ساعت از نزدیک شدن به کودکان زیر ۵ سال خودداری کنید',
  'One of the common concerns of patients about nuclear scans is radiation exposure. In this article we examine this concern with accurate scientific information.\n\nRadiation exposure in daily life:\nWe are all exposed to natural radiation in everyday life:\n- Cosmic rays: 0.4 millisieverts per year\n- Radioactive materials naturally in soil: 0.5 millisieverts per year\n- Radon in air: 1.3 millisieverts per year\n\nComparison with common scans:\n- Thyroid scan: 1 millisievert\n- Bone scan: 3 millisieverts\n- Heart scan: 5-10 millisieverts\n\nShort half-life of radioactive materials:\nTc-99m, used in most scans, has a half-life of only 6 hours.\n\nPrecautionary recommendations after scanning:\n- Drink plenty of water so the material is excreted faster through urine\n- Avoid close contact with children under 5 years for 24 hours',
  'دکتر امیر حسن‌زاده', 'دانستنی‌ها', 'ایمنی,پرتو,رادیواکتیو', 1, 0, 5, NOW()
),

(
  'سلامت ریه: اسکن ریه چه اطلاعاتی می‌دهد؟',
  'Lung Health: What Does a Lung Scan Tell Us?',
  'lung-scan-information',
  'راهنمای کامل اسکن پرفیوژن ریه برای تشخیص آمبولی ریه، نارسایی تنفسی و ارزیابی قبل از جراحی',
  'A complete guide to lung perfusion scanning for detecting pulmonary embolism, respiratory failure, and pre-surgical assessment.',
  'آمبولی ریه یا لخته خون در ریه یک اورژانس پزشکی است که سالانه جان هزاران نفر را می‌گیرد. اسکن ریه ابزار حیاتی در تشخیص این بیماری است.\n\nاسکن پرفیوژن ریه چیست؟\nدر این روش، ذرات کوچک رادیواکتیو تزریق می‌شوند که در مویرگ‌های ریه توزیع می‌شوند. اگر ناحیه‌ای از ریه به دلیل لخته خون از خون‌رسانی محروم شده باشد، در تصویر تاریک دیده می‌شود.\n\nعلائم آمبولی ریه:\n- تنگی نفس ناگهانی\n- درد قفسه سینه\n- سرفه همراه خون\n- ضربان قلب سریع\n\nکاربردهای دیگر اسکن ریه:\n۱. ارزیابی قبل از جراحی ریه\n۲. بیماری مزمن انسدادی ریه (COPD)\n۳. پیگیری درمان آمبولی',
  'Pulmonary embolism or blood clot in the lung is a medical emergency that claims thousands of lives annually. Lung scanning is a vital tool in diagnosing this condition.\n\nWhat is lung perfusion scanning?\nIn this method, small radioactive particles are injected which distribute in the lung capillaries. If an area of the lung is deprived of blood supply due to a clot, it appears dark in the image.\n\nSymptoms of pulmonary embolism:\n- Sudden shortness of breath\n- Chest pain\n- Coughing up blood\n- Rapid heartbeat\n\nOther applications of lung scanning:\n1. Pre-surgical assessment of lung\n2. Chronic obstructive pulmonary disease (COPD)\n3. Follow-up of embolism treatment',
  'دکتر امیر حسن‌زاده', 'ریه و تنفس', 'اسکن ریه,آمبولی,COPD', 1, 0, 6, NOW()
),

(
  '۱۰ توصیه برای حفظ سلامت قلب',
  '10 Tips for Maintaining Heart Health',
  'heart-health-tips',
  'راهکارهای علمی برای پیشگیری از بیماری‌های قلبی و حفظ سلامت قلب در طول زندگی',
  'Scientific strategies for preventing heart disease and maintaining heart health throughout life.',
  'بیماری قلبی همچنان اولین علت مرگ و میر در جهان است. اما اکثر موارد بیماری قلبی قابل پیشگیری هستند.\n\n۱. فشار خون خود را کنترل کنید\nفشار خون ایده‌آل زیر ۱۲۰/۸۰ میلی‌متر جیوه است.\n\n۲. کلسترول را در سطح سالم نگه دارید\nکلسترول LDL باید زیر ۱۰۰ میلی‌گرم در دسی‌لیتر باشد.\n\n۳. ورزش منظم داشته باشید\nحداقل ۱۵۰ دقیقه ورزش متوسط در هفته.\n\n۴. رژیم غذایی سالم\nکاهش نمک، چربی اشباع و قند. افزایش مصرف میوه و سبزیجات.\n\n۵. سیگار را ترک کنید\nسیگار خطر بیماری قلبی را دو برابر می‌کند.\n\n۶. وزن سالم داشته باشید\n۷. استرس را مدیریت کنید\n۸. خواب کافی داشته باشید (۷-۸ ساعت)\n۹. دیابت را کنترل کنید\n۱۰. معاینات منظم داشته باشید',
  'Heart disease remains the leading cause of death worldwide. But most cases of heart disease are preventable.\n\n1. Control your blood pressure\nIdeal blood pressure is below 120/80 mmHg.\n\n2. Keep cholesterol at a healthy level\nLDL cholesterol should be below 100 mg/dL.\n\n3. Exercise regularly\nAt least 150 minutes of moderate exercise per week.\n\n4. Healthy diet\nReduce salt, saturated fat, and sugar. Increase consumption of fruits and vegetables.\n\n5. Quit smoking\nSmoking doubles the risk of heart disease.\n\n6. Maintain a healthy weight\n7. Manage stress\n8. Get enough sleep (7-8 hours)\n9. Control diabetes\n10. Have regular medical check-ups',
  'دکتر نیلوفر قاسمی', 'سلامت عمومی', 'سلامت قلب,پیشگیری,فشار خون', 1, 0, 7, NOW()
),

(
  'آمادگی قبل از اسکن: سوالات متداول بیماران',
  'Preparation Before Scanning: Frequently Asked Questions',
  'scan-preparation-faq',
  'پاسخ به مهم‌ترین سوالات بیماران درباره نحوه آمادگی قبل از انواع اسکن‌های هسته‌ای',
  'Answers to the most important patient questions about how to prepare before different types of nuclear scans.',
  'قبل از اسکن چه بخورم و چه نخورم؟\nبستگی به نوع اسکن دارد:\n- اسکن قلب: ۴ ساعت ناشتا، اجتناب از کافئین ۲۴ ساعت قبل\n- اسکن استخوان: ناشتایی لازم نیست، آب زیاد بنوشید\n- اسکن کلیه: معمولاً ناشتایی لازم نیست\n- اسکن تیروئید: قطع داروهای تیروئید طبق دستور پزشک\n\nآیا می‌توانم داروهایم را مصرف کنم؟\nاکثر داروها را می‌توانید مصرف کنید. همیشه با پزشک مشورت کنید.\n\nاسکن چقدر طول می‌کشد؟\n- اسکن تیروئید: ۳۰-۶۰ دقیقه\n- اسکن استخوان: ۲-۳ ساعت\n- اسکن قلب: ۳-۴ ساعت\n- اسکن کلیه: ۱-۲ ساعت\n\nچه موقع نتیجه را می‌گیرم؟\nمعمولاً ۲۴ تا ۴۸ ساعت پس از اسکن گزارش آماده می‌شود.',
  'What should I eat or not eat before the scan?\nIt depends on the type of scan:\n- Heart scan: 4 hours fasting, avoid caffeine 24 hours before\n- Bone scan: No fasting needed, drink plenty of water\n- Kidney scan: Usually no fasting required\n- Thyroid scan: Stop thyroid medications as per doctor instructions\n\nCan I take my medications?\nYou can take most medications. Always consult with your physician.\n\nHow long does the scan take?\n- Thyroid scan: 30-60 minutes\n- Bone scan: 2-3 hours\n- Heart scan: 3-4 hours\n- Kidney scan: 1-2 hours\n\nWhen will I get the results?\nUsually 24 to 48 hours after the scan the report is ready.',
  'دکتر امیر حسن‌زاده', 'دانستنی‌ها', 'آمادگی,اسکن,سوالات متداول', 1, 0, 5, NOW()
),

(
  'بیمه و هزینه‌های پزشکی هسته‌ای',
  'Insurance and Costs of Nuclear Medicine',
  'insurance-and-costs',
  'راهنمای کامل پوشش بیمه‌ای اسکن‌های هسته‌ای و نحوه استفاده از بیمه برای کاهش هزینه‌ها',
  'A complete guide to insurance coverage for nuclear medicine scans and how to use insurance to reduce costs.',
  'یکی از دغدغه‌های اصلی بیماران، هزینه‌های درمانی است. مرکز کاسپین با بیش از ۱۶ بیمه طرف قرارداد، تلاش می‌کند این دغدغه را کاهش دهد.\n\nبیمه‌های طرف قرارداد:\n- تامین اجتماعی\n- خدمات درمانی\n- نیروهای مسلح\n- بیمه ملت\n- بانک ملی\n- بیمه تعاون و بیش از ۱۰ بیمه دیگر\n\nمدارک لازم:\n- دفترچه بیمه معتبر\n- درخواست پزشک (برگه رفرال)\n- کارت ملی\n\nخدمات تحت پوشش بیمه:\n- اسکن استخوان\n- اسکن کلیه (DMSA و DTPA)\n- اسکن تیروئید\n- اسکن قلب\n\nدر صورت فوریت پزشکی، مرکز امکان تسویه آنلاین را فراهم می‌کند.',
  'One of the main concerns of patients is medical costs. Caspian Center with more than 16 partner insurance companies tries to reduce this concern.\n\nPartner insurance companies:\n- Social Security\n- Health Services\n- Armed Forces\n- Mellat Insurance\n- National Bank\n- Cooperative Insurance and more than 10 others\n\nRequired documents:\n- Valid insurance booklet\n- Doctor request (referral form)\n- National ID card\n\nServices covered by insurance:\n- Bone scan\n- Kidney scan (DMSA and DTPA)\n- Thyroid scan\n- Heart scan\n\nIn case of medical urgency, the center provides online settlement.',
  'دکتر نیلوفر قاسمی', 'سلامت عمومی', 'بیمه,هزینه,پوشش بیمه', 1, 0, 4, NOW()
);
