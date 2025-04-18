# 🧪 Internship Project

## 🐣 Embryo Quality Check (IVF Project)

🔍 **Goal**: Use deep learning to grade embryo quality and reduce human errors.  

📊 **Classification**: 10 categories → 8-cell (A, B, C), Morula (A, B, C), Blastocyst (A, B, C), and Error images.

---

## 🏥 1. Business Problem

**Client**: Top Indian hospital chain focused on IVF treatments.

- ⚠️ **Problem**: Many couples face conception issues due to stress and lifestyle. IVF demand is rising, but embryo grading errors reduce success rates and results take 4+ months.

- 🎯 **Objective**: Improve embryo grading to increase ART success.

- 💸 **Constraint**: Lower the treatment cost.

**Success Criteria**:  

✅ **Business**: +10% increase in ART success 

✅ **Economic**: 25% cost reduction  

✅ **Model Accuracy**: 97% – 98%

---

## 🧩 2. System Design

### 🔽 Low-Level Design  
<img src="https://media-hosting.imagekit.io/f3c9f92876be481e/Low Level Design.gif?Expires=1839418127&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=aTxEfv6ywI8vCOYY5RJPoeKcFMlLh9cTgYSnFdnLkf-f0XB9kl~piQgfP1f7Av7boBnxaSqeIIxs5O-qDMq1GJjThsJOOTykiej2FXsCH~Q49qnWPcdsj8Wy0AiXIKDO4KzOO5tDHlI-Vnan69AtEZ9NavyT~DOWazyNoXnE67KTL3r4SEOf9ft50KqTtEgcznmrD1o3HX6Q6GmdOucGYzkmQB0L0gI7Ei6EX69iI0Ke6GAZzx4IcWkCxIYNK7FJ7JZDYVimbnFWC4f-yyXTiPm2InE1huUNuxQ6s4CsmG0hmr13IKtOyK-uBn-lyK-3QRQp-yHsQrI1apsMGbuzFw__"/>

### 🔼 High-Level Design  
<img src="https://media-hosting.imagekit.io/fa45448666de4d38/High level design.gif?Expires=1839418122&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=zcJS3QdWrlyzSCz49aiAsO34GPYJm9MqbRhyZ1HEQllDRNLpvy2VyidA~FlJTptEcy3xmDsJ4wglcruaSwUbfdy16AF9~vhqNOm4l2Fu4kZwkrPK8ne~tWxR-diTtXqSBcVb9TnZEBHtew1RCcwzREzROuNyklOQ7jRvB9TlmT8XHQC59EWam9yaPpuHdxH4ttT9xe2YwHFllfT4o8NZDVwVX8xX8oEtuhdp0KVXypLr-ISmR1zEthYWKkBxWOW5LpKt6RJpBKy1P8FWjp5VVEbQmmp~H-OoaS7NOoJo3DRRnh6kkoSyI7LuQEMPpNxzSw1jCyrQWSMVRI-i2lQgcQ__"/>

---

## 📥 3. Data Collection

🗃️ **Source**: Primary data collection (Google + other resources)  
📸 **Classes**:
- **8-cell**: Grade A, B, C  
- **Morula**: Grade A, B, C  
- **Blastocyst**: Grade A, B, C  
- **Error Images**:  
  - Coins  
  - Moon  
  - Bubbles  
  - Chicken eggs (microscope view)  
  - Soap foam  
  - Microscope dust/noise  
  - Eye iris  
  - Wood grains  
  - Dark blobs / circular objects  
  - Leaf cells  

**Total Data**:  
- **Total Images**: 10,000 images  
  - **8-cell, Morula, Blastocyst**: 3,000 images  
  - **Error Images**: 1,000 images  
  - **Augmented Images**: Additional images created through augmentation techniques  


---

### 🔍 4. Exploratory Data Analysis

**Before Data Preprocessing**  

1. **Image Count & Class Distribution**  
   - Check the number of images per class to ensure a balanced dataset.

2. **Random Image Visualization**  
   - Visualize random images from each class to understand the dataset's characteristics.

3. **Image Shape / Size / Channels Check**  
   - Ensure all images have consistent dimensions and check the number of channels (RGB or grayscale).

4. **File Format Check**  
   - Verify all images are in the correct format (e.g., .jpg, .png).

5. **Missing / Corrupt / Blank Images**  
   - Identify and handle missing, corrupt, or blank images to prevent errors during model training.


## 👍 5. Data Preprocessing

**Image Collection** ✅

- Collect all images into one folder and assign clear, correct labels for each image. Make sure everything is well-organized ✅🗂️🧠

  **Example labels:**  
  - 8-cell Grade A, 8-cell Grade B, 8-cell Grade C,  
  - Morula Grade A, Morula Grade B, Morula Grade C,  
  - Blastocyst Grade A, Blastocyst Grade B, Blastocyst Grade C,  
  - Error Images  

---

**Standard Format: .png**  

- I am using the standard .png format because this project is medical-related. I chose .png since it ensures no data loss, which is important for accuracy. 🧠🩺🖼️  

  - **No quality loss** (PNG format is lossless, so image details stay intact)  
  - **Better for analysis** (Clear images help AI/ML models work better)  
  - **Trusted in healthcare** (Many hospitals use PNG for accurate visuals)  

---

**Image Preprocessing Steps:**

- **Resize**  
- **Convert RGB 👉 Grayscale**  
- **Reshape** (already done)  
- **Data Augmentation**  
- **Convert to array**  
- **Normalization**  
- **Check duplicate value and remove it**  
- **Split Data** -> train and test

---

## 💻 Code Workflow

1. 🔧 Update `config.yaml`  
2. 🔧 Update `schema.yaml`  
3. 🔧 Update `params.yaml`  
4. 🧱 Update entity  
5. ⚙️ Update config manager in `src/config`  
6. 🧩 Update components  
7. 🧪 Update pipeline  
8. 🚀 Update `main.py`  
9. 🌐 Update `app.py`  




