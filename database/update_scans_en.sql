SET NAMES utf8mb4;

ALTER TABLE scans
  ADD COLUMN title_en varchar(200) NULL AFTER title,
  ADD COLUMN description_en text NULL AFTER description,
  ADD COLUMN preparation_info_en text NULL AFTER preparation_info,
  ADD COLUMN procedure_info_en text NULL AFTER procedure_info;

-- 1. Parathyroid Scan
UPDATE scans SET
  title_en = 'Parathyroid Scan',
  description_en = 'A nuclear medicine scan that detects overactive parathyroid glands (adenoma or hyperplasia) causing hypercalcemia. Uses Tc-99m sestamibi with SPECT imaging for precise localization before surgery.',
  preparation_info_en = 'No food or drink restrictions required\nInform your doctor of any calcium supplements or medications\nRemove metal jewelry and clothing with metal',
  procedure_info_en = 'Radiotracer (Tc-99m sestamibi) is injected intravenously\nEarly images taken at 15-30 minutes post-injection\nDelayed images taken at 2-3 hours\nSPECT imaging performed for 3D localization\nTotal procedure time: approximately 3 hours'
WHERE id = 1;

-- 2. Thyroid Scan
UPDATE scans SET
  title_en = 'Thyroid Scan',
  description_en = 'A thyroid scintigraphy study that evaluates thyroid gland function, identifies hot (overactive) and cold (underactive or suspicious) nodules, and assesses thyroid size and shape. Essential for diagnosing Graves disease, toxic nodules, and thyroid cancer follow-up.',
  preparation_info_en = 'Stop thyroid medications 4-6 weeks before (if instructed by doctor)\nAvoid iodine-rich foods and contrast dye for 4 weeks prior\nNo eating for 4 hours before the scan\nInform doctor of all current medications',
  procedure_info_en = 'Radiotracer (I-123 or Tc-99m pertechnetate) is given orally or by injection\nImaging begins 4-24 hours after tracer administration (depending on tracer used)\nGamma camera captures images of tracer uptake in thyroid\nTest includes calculation of radioactive iodine uptake (RAIU)\nResults show areas of normal, increased, or decreased function'
WHERE id = 2;

-- 3. Myocardial Perfusion Scan
UPDATE scans SET
  title_en = 'Myocardial Perfusion Scan (MPI)',
  description_en = 'A cardiac nuclear medicine test that evaluates blood flow to the heart muscle at rest and during stress. Identifies areas of reduced perfusion (ischemia) or permanent damage (infarction). The gold standard for non-invasive coronary artery disease diagnosis.',
  preparation_info_en = 'Fast for 4-6 hours before the test\nAvoid caffeine (coffee, tea, chocolate, energy drinks) for 24 hours\nStop beta-blockers and calcium channel blockers as directed by doctor\nWear comfortable walking shoes for treadmill stress\nInform doctor of all medications and any breathing problems',
  procedure_info_en = 'Radiotracer (Tc-99m sestamibi or tetrofosmin) injected at peak stress and at rest\nStress phase: exercise treadmill or pharmacologic stress (adenosine/dobutamine)\nRest phase imaging done on same or following day\nSPECT camera rotates around the chest capturing 3D images\nComputer generates short-axis, horizontal and vertical long-axis slices\nTotal time: 3-5 hours across one or two visits'
WHERE id = 3;

-- 4. Brain Perfusion Scan
UPDATE scans SET
  title_en = 'Brain Perfusion Scan (SPECT)',
  description_en = 'A brain SPECT study measuring regional cerebral blood flow to evaluate dementia, epilepsy, stroke, traumatic brain injury, and psychiatric disorders. Detects functional abnormalities before structural changes appear on MRI or CT.',
  preparation_info_en = 'Arrive well-rested and calm\nAvoid sedatives and anticonvulsants if instructed\nRemain in a quiet, darkened room for 10 minutes before and after injection\nInform doctor of all neurological medications\nBring a list of any prior brain imaging studies',
  procedure_info_en = 'Radiotracer (Tc-99m HMPAO or ECD) injected intravenously while patient rests quietly\nTracer crosses blood-brain barrier and localizes proportional to blood flow\nImaging begins 30-60 minutes after injection\nSPECT camera captures 3D brain perfusion map\nImages compared to normal database for pattern analysis\nScan duration: approximately 30-45 minutes'
WHERE id = 4;

-- 5. Bone Scan
UPDATE scans SET
  title_en = 'Bone Scan (Skeletal Scintigraphy)',
  description_en = 'A whole-body or regional nuclear medicine scan that detects bone metastases, stress fractures, osteomyelitis (bone infection), arthritis, and Paget disease. Far more sensitive than plain X-rays for early bone abnormalities — detects changes months before X-rays can.',
  preparation_info_en = 'Drink plenty of water (at least 4 glasses) between injection and imaging\nUrinate frequently to clear excess tracer from soft tissues\nRemove metal objects and jewelry before imaging\nNo other special preparation required\nBring any prior bone scans or X-rays for comparison',
  procedure_info_en = 'Radiotracer (Tc-99m MDP) injected intravenously\n2-3 hour wait while tracer binds to bone\nWhole-body images acquired front and back\nSpot views or SPECT of specific areas as needed\nImages show areas of increased bone activity (hot spots) or decreased activity (cold spots)\nTotal time: approximately 3-4 hours'
WHERE id = 5;

-- 6. HIDA Scan (Hepatobiliary)
UPDATE scans SET
  title_en = 'HIDA Scan (Hepatobiliary Scan)',
  description_en = 'A hepatobiliary scintigraphy study evaluating liver function, bile duct patency, gallbladder function (ejection fraction), and biliary drainage. Essential for diagnosing cholecystitis, bile leaks, biliary obstruction, and sphincter of Oddi dysfunction.',
  preparation_info_en = 'Fast for at least 4 hours before the scan (but no longer than 24 hours)\nAvoid opioid pain medications for 4 hours before\nInform doctor of any liver disease, recent surgery, or medications\nNo barium studies for 24 hours before',
  procedure_info_en = 'Radiotracer (Tc-99m HIDA or mebrofenin) injected intravenously\nLiver begins extracting tracer within minutes; images acquired continuously\nGallbladder and bile duct filling imaged over 60-90 minutes\nCCK (sincalide) may be given to stimulate gallbladder contraction for ejection fraction\nBiliary drainage into duodenum confirms duct patency\nTotal scan time: 1-3 hours'
WHERE id = 6;

-- 7. DMSA Kidney Scan
UPDATE scans SET
  title_en = 'DMSA Renal Cortical Scan',
  description_en = 'A kidney scan using Tc-99m DMSA to evaluate renal cortical function, detect renal scarring from pyelonephritis (kidney infection), and measure differential kidney function. The reference standard for detecting cortical defects — far superior to ultrasound.',
  preparation_info_en = 'No special fasting required\nDrink normal amounts of fluids\nInform doctor of any known kidney disease or allergies\nBring any prior kidney imaging or lab results',
  procedure_info_en = 'Tc-99m DMSA injected intravenously\n2-3 hour wait while tracer binds to renal tubular cells\nPlanar images of both kidneys acquired (anterior and posterior)\nSPECT imaging for 3D evaluation of cortical defects\nDifferential function (split function) calculated for each kidney\nTotal time: approximately 3 hours'
WHERE id = 7;

-- 8. DTPA Kidney Scan
UPDATE scans SET
  title_en = 'DTPA Renal Dynamic Scan',
  description_en = 'A dynamic kidney scan using Tc-99m DTPA that evaluates glomerular filtration rate (GFR), renal blood flow, urinary drainage, and detects obstruction or renovascular hypertension. Can be combined with captopril challenge to diagnose renal artery stenosis.',
  preparation_info_en = 'Drink 500 ml water 30 minutes before the scan\nEmpty bladder just before starting\nAvoid diuretics on the day of the scan unless instructed otherwise\nFor captopril renography: stop ACE inhibitors 3-5 days before as directed',
  procedure_info_en = 'Tc-99m DTPA injected as a rapid IV bolus\nContinuous dynamic imaging for 20-30 minutes captures perfusion, function, and drainage phases\nFurosemide (Lasix) may be injected at 20 minutes to differentiate obstruction from dilation\nTime-activity curves generated for each kidney\nGFR calculated from tracer clearance curves\nResults show differential kidney function and drainage efficiency'
WHERE id = 8;

-- 9. RBC Scan (Labeled Red Blood Cell)
UPDATE scans SET
  title_en = 'Labeled RBC Scan (GI Bleeding Scan)',
  description_en = 'A gastrointestinal bleeding scan using Tc-99m-labeled red blood cells to locate active GI bleeding. Can detect bleeding rates as low as 0.1-0.5 ml/min — far more sensitive than angiography. Also used for hepatic hemangioma diagnosis.',
  preparation_info_en = 'No special fasting required for GI bleed indication\nInform doctor of any blood transfusions in past 24 hours\nBring current medication list\nFor liver hemangioma: no special preparation needed',
  procedure_info_en = 'Patient blood sample drawn and red blood cells labeled with Tc-99m in lab\nLabeled RBCs re-injected intravenously\nImmediate and serial images of abdomen and pelvis acquired over 60-90 minutes\nDelayed images up to 24 hours if initial images inconclusive\nActive bleeding appears as focal area of increasing radiotracer accumulation\nLocalization guides endoscopy, angiography, or surgical intervention'
WHERE id = 9;

-- 10. Radionuclide Cystography
UPDATE scans SET
  title_en = 'Radionuclide Cystography (RNC)',
  description_en = 'A bladder study using Tc-99m to detect vesicoureteral reflux (VUR) — the backward flow of urine from bladder to kidneys that causes recurrent infections and kidney scarring. Delivers significantly lower radiation dose than conventional X-ray cystography (VCUG), making it ideal for children and follow-up studies.',
  preparation_info_en = 'Arrive with a comfortably full or empty bladder as instructed\nParents may accompany children throughout the procedure\nNo dietary restrictions required\nInform doctor of any urinary tract infections or allergies',
  procedure_info_en = 'Urinary catheter placed to drain and fill the bladder\nBladder filled with Tc-99m pertechnetate solution via catheter\nContinuous gamma camera imaging during filling and voiding phases\nReflux detected as tracer moving from bladder toward kidneys during filling or voiding\nGraded 1-5 by severity and location\nCatheter removed; patient voids and post-void images acquired'
WHERE id = 10;

-- 11. Lung Perfusion Scan
UPDATE scans SET
  title_en = 'Lung Perfusion Scan (V/Q Scan)',
  description_en = 'A ventilation-perfusion (V/Q) lung scan that diagnoses pulmonary embolism (PE) — blood clots in the lungs — by comparing areas of air flow (ventilation) to blood flow (perfusion). Recommended for patients with contrast allergy or renal insufficiency where CT pulmonary angiography is contraindicated.',
  preparation_info_en = 'No special fasting or preparation required\nBring any recent chest X-rays or CT scans\nInform doctor of any respiratory conditions, recent surgery, or pregnancy\nRemove metal objects from chest area',
  procedure_info_en = 'Ventilation phase: patient inhales radioactive gas or aerosol (Xe-133 or Tc-99m DTPA aerosol)\nPerfusion phase: Tc-99m MAA injected intravenously — particles lodge in pulmonary capillaries\nMultiple planar images acquired in 6-8 projections\nV/Q mismatch (normal ventilation with absent perfusion) indicates PE\nResults reported as low, intermediate, or high probability using PIOPED criteria\nTotal scan time: 30-60 minutes'
WHERE id = 11;

-- 12. Meckel Diverticulum Scan
UPDATE scans SET
  title_en = 'Meckel Diverticulum Scan',
  description_en = 'A nuclear medicine scan to detect Meckel diverticulum — a congenital small intestine pouch containing ectopic gastric mucosa that causes GI bleeding, especially in children. Tc-99m pertechnetate is selectively absorbed by gastric mucosa, lighting up the diverticulum. Sensitivity exceeds 85% in children.',
  preparation_info_en = 'Fast for 4-6 hours before the scan\nStop H2 blockers and proton pump inhibitors 48-72 hours before if instructed\nAvoid recent barium studies\nInform doctor of any prior abdominal surgery',
  procedure_info_en = 'Pentagastrin or cimetidine may be given before injection to enhance gastric mucosa uptake\nTc-99m pertechnetate injected intravenously\nSerial abdominal images acquired every 5 minutes for 60 minutes\nNormal uptake seen in stomach and bladder\nAbnormal focus in right lower abdomen indicates Meckel diverticulum with gastric mucosa\nDelayed images at 2 hours may improve detection\nPositive scan guides surgical resection'
WHERE id = 12;
