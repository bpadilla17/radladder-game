-- Insert Your 8 Questions
-- Run this AFTER you've uploaded your images to Supabase Storage
-- Replace 'YOUR_SUPABASE_URL' with your actual Supabase project URL

-- Base URL for images (update this with your Supabase Storage URL)
-- Format: https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/question-images/

-- Question 1: Rung 3 - Croup
INSERT INTO questions (question_id, rung_level, image_url, clinical_scenario, question_text, option_a, option_b, option_c, option_d, correct_answer, teaching_point, time_limit_seconds) VALUES
('Q-R3-001', 3, 'YOUR_SUPABASE_URL/storage/v1/object/public/question-images/croup_steeple_sign.png', '6-month-old infant presents to ER with barking cough and stridor', 'What is the diagnosis?', 'Croup', 'Epiglottitis', 'Retropharyngeal abscess', 'Foreign body aspiration', 'A', 'Classic steeple sign showing subglottic narrowing on lateral neck radiograph. Croup (laryngotracheobronchitis) typically affects children 6 months to 3 years with characteristic barking cough.', 30);

-- Question 2: Rung 4 - Mesenteric Hematoma (3 images - comma separated)
INSERT INTO questions (question_id, rung_level, image_url, clinical_scenario, question_text, option_a, option_b, option_c, option_d, correct_answer, teaching_point, time_limit_seconds) VALUES
('Q-R4-001', 4, 'YOUR_SUPABASE_URL/storage/v1/object/public/question-images/mesenteric_hematoma_1.png,YOUR_SUPABASE_URL/storage/v1/object/public/question-images/mesenteric_hematoma_2.png,YOUR_SUPABASE_URL/storage/v1/object/public/question-images/mesenteric_hematoma_3.png', '44M injured in motor vehicle collision, hemodynamically stable', 'What injury is demonstrated on this CT scan?', 'Splenic laceration', 'Mesenteric hematoma', 'Bowel laceration', 'Hepatic laceration', 'B', 'Hyperdense material within the mesentery represents acute hematoma. Mesenteric injuries from blunt trauma require close monitoring for associated bowel injury and potential vascular compromise.', 30);

-- Question 3: Rung 5 - Cavernous Sinus
INSERT INTO questions (question_id, rung_level, image_url, clinical_scenario, question_text, option_a, option_b, option_c, option_d, correct_answer, teaching_point, time_limit_seconds) VALUES
('Q-R5-001', 5, 'YOUR_SUPABASE_URL/storage/v1/object/public/question-images/cavernous_sinus_cect.png', 'Patient with diplopia and facial numbness, axial CECT shown', 'Which cranial nerve courses through the structure indicated by the arrows?', 'CN III (Oculomotor)', 'CN V (Trigeminal)', 'CN VII (Facial)', 'CN IX (Glossopharyngeal)', 'B', 'The cavernous sinus contains cranial nerves III, IV, V1, V2, and VI. The trigeminal nerve branches (V1 and V2) traverse the lateral wall of the cavernous sinus bilaterally.', 25);

-- Question 4: Rung 5 - Button Battery
INSERT INTO questions (question_id, rung_level, image_url, clinical_scenario, question_text, option_a, option_b, option_c, option_d, correct_answer, teaching_point, time_limit_seconds) VALUES
('Q-R5-002', 5, 'YOUR_SUPABASE_URL/storage/v1/object/public/question-images/button_battery_esophagus.png', '1-month-old female with increased drooling', 'What is the diagnosis?', 'Aspirated foreign body', 'Coin ingestion', 'Button battery ingestion', 'Food impaction', 'C', 'Button battery lodged in the cervical esophagus demonstrates the step-off sign and inner rim sign. The cricopharyngeus muscle is a common obstruction site. Retropharyngeal soft tissue swelling indicates potential corrosive injury requiring urgent endoscopic removal.', 25);

-- Question 5: Rung 6 - Scleroderma (2 images)
INSERT INTO questions (question_id, rung_level, image_url, clinical_scenario, question_text, option_a, option_b, option_c, option_d, correct_answer, teaching_point, time_limit_seconds) VALUES
('Q-R6-001', 6, 'YOUR_SUPABASE_URL/storage/v1/object/public/question-images/scleroderma_hand_1.png,YOUR_SUPABASE_URL/storage/v1/object/public/question-images/scleroderma_hand_2.png', '61F with interstitial lung disease presenting with joint pain and lower extremity weakness', 'What is the most likely diagnosis?', 'Scleroderma', 'Psoriatic arthritis', 'Dermatomyositis', 'Hyperparathyroidism', 'A', 'Combination of periarticular osteopenia, acral osteolysis, and calcinosis circumscripta in the digits is characteristic of scleroderma. The concurrent interstitial lung disease further supports this diagnosis.', 25);

-- Question 6: Rung 6 - Cerebral AVM (4 images)
INSERT INTO questions (question_id, rung_level, image_url, clinical_scenario, question_text, option_a, option_b, option_c, option_d, correct_answer, teaching_point, time_limit_seconds) VALUES
('Q-R6-002', 6, 'YOUR_SUPABASE_URL/storage/v1/object/public/question-images/cerebral_avm_ct_1.png,YOUR_SUPABASE_URL/storage/v1/object/public/question-images/cerebral_avm_ct_2.png,YOUR_SUPABASE_URL/storage/v1/object/public/question-images/cerebral_avm_ct_3.png,YOUR_SUPABASE_URL/storage/v1/object/public/question-images/cerebral_avm_angio.png', 'Patient with severe headache and visual disturbances', 'What is the most likely diagnosis?', 'Cerebral arteriovenous malformation', 'Glioblastoma with AV shunting', 'Dural arteriovenous fistula', 'Cerebral proliferative angiopathy', 'A', 'Classic imaging features of cerebral AVM include enlarged feeding arteries, a vascular nidus, and prominent draining veins. AVMs are congenital lesions that may present with headache, seizures, or intracranial hemorrhage.', 25);

-- Question 7: Rung 7 - Liver Microabscesses (2 images)
INSERT INTO questions (question_id, rung_level, image_url, clinical_scenario, question_text, option_a, option_b, option_c, option_d, correct_answer, teaching_point, time_limit_seconds) VALUES
('Q-R7-001', 7, 'YOUR_SUPABASE_URL/storage/v1/object/public/question-images/liver_microabscesses_us_1.png,YOUR_SUPABASE_URL/storage/v1/object/public/question-images/liver_microabscesses_us_2.png', 'Asymptomatic immunocompromised patient undergoing liver ultrasound', 'What best explains these ultrasound findings?', 'Hepatic metastases post-chemoembolization', 'Pneumobilia from pyogenic cholangitis', 'Calcified treated microabscesses', 'Portal venous gas', 'C', 'Multiple echogenic foci with posterior acoustic shadowing in an immunocompromised host represent calcified microabscesses from previously treated fungal or mycobacterial infection.', 20);

-- Question 8: Rung 8 - Hepatic Steatosis (2 images)
INSERT INTO questions (question_id, rung_level, image_url, clinical_scenario, question_text, option_a, option_b, option_c, option_d, correct_answer, teaching_point, time_limit_seconds) VALUES
('Q-R8-001', 8, 'YOUR_SUPABASE_URL/storage/v1/object/public/question-images/hepatic_steatosis_vq.png,YOUR_SUPABASE_URL/storage/v1/object/public/question-images/hepatic_steatosis_mri.png', 'Pregnant female presenting with cough and dyspnea, VQ scan obtained', 'What accounts for the liver uptake on this Xenon-133 ventilation scan?', 'Hepatic steatosis', 'Hepatic congestion', 'Hemochromatosis', 'Normal variant', 'A', 'Xenon-133 gas is highly lipid soluble. Liver accumulation of xenon on ventilation imaging is sensitive and specific for hepatic steatosis (fatty liver), commonly seen in pregnancy.', 20);

-- Verify insertion
SELECT COUNT(*) as total_questions FROM questions;
SELECT question_id, rung_level, question_text FROM questions ORDER BY rung_level, question_id;
