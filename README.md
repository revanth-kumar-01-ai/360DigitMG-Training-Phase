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

✅ **Model Accuracy**: 95% – 98%

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

## 🔍 4: Exploratory Data Analysis (EDA)

## 📊 Before Data Preprocessing

### 1️⃣ Image Count & Class Distribution  
- Check number of images in each class to ensure balance ⚖️

### 2️⃣ Random Image Visualization  
- View random images from each class to understand visual differences 👀🖼️

### 3️⃣ Image Shape / Size / Channels Check  
- Make sure all images have the same size and check if they are RGB or grayscale 🎨📏

### 4️⃣ File Format Check  
- Confirm file extensions are valid (e.g., `.jpg`, `.png`, `.jpeg`) 📂✅

### 5️⃣ Missing / Corrupt / Blank Images  
- Find and fix broken, missing, or blank images to avoid issues during training 🛠️🚫

---

### 📑 Insights & Final Thoughts

### 🔢 ✌️ 1: Image Count & Class Distribution

#### 🧫 8-cell Dataset (450 images):  
- Grade A: 150  
- Grade B: 150  
- Grade C: 150  
- ✅ **Balanced** dataset — future **augmentation** planned.

#### 🧬 Morula Dataset (434 images):  
- Grade A: 134  
- Grade B: 150  
- Grade C: 150  
- ✅ **Balanced** — augmentation to be applied later.

#### 🧪 Blastocyst Dataset (452 images):  
- Grade A: 150  
- Grade B: 152  
- Grade C: 150  
- ✅ Mostly **balanced** — slight difference in class sizes.

#### ❌ Error Images (268 images): 

---

### 🎲 ✌️  2: Random Image Visualization
- Showed **5 random images** per grade (A, B, C)  

---

### 📐 ✌️  3: Image Shape / Size / Channels
- ❌ Images have **different sizes**  
- ✅ All images are **RGB (3 channels)** — colored 🎨

---

### 🖼️ ✌️  4: File Format Check

- **8-cell & Morula**: Only `.jpg` format ✅  
- **Blastocyst**: Mix of `.png`, `.jpeg`, and `.jpg` 🌀  
- **Error Images**: Mix of `.png` and `.jpg` ⚠️

---

### 🚫 ✌️  5: Missing / Corrupt / Blank Images

- ✅ No **missing**, **corrupt**, or **blank** images found — all clear 🎉

--- 

## ⚙️ 5. Data Preprocessing

## ❓ Why Data Preprocessing?

Before building any **ML/DL model**, you must clean your data 🧹🧠  
It boosts model performance, avoids errors, and helps create a **generalized** model ✅💡  

We handle:  
- Missing values 🚫  
- Outliers ⚠️  
- Scaling & transformations 📏  
- And other clean-up tasks 🧽  

---
## 🧼🖼️ Image Preprocessing Flow:

- 📄 **Convert to .jpg** format  
- 🔍 **Resize** images to same size  
- 🌈 **Convert to RGB** (3-channel)  
- 🔁 **Reshape** (Already done ✅)  
- 🎨 **Data Augmentation** to add variety  
- 🔢 **Convert to array** for model input  
- 🗑️ **Clean the Data**:
>- *❌ Remove blank, duplicate, and corrupted images* 
>- *🧹 Checked and removed duplicates 🧽* 
- 🧪 **Split the Data**:
>- 🔀 **Train (90%)** and **Test (10%)**  
>- 🗂️ *Saved into folders: `train/` & `test/`*

---

## 🚀 6: Model Training and Evaluation accuarcy
I used six types of deep learning algorithms 🤖🔥

| 🏷️ Model Name               | 🎯 Train Accuracy | 🧪 Test Accuracy | 🏆 Ranking    |
|------------------------------|-------------------|------------------|--------------|
| 🐉 efficientvit_b2r288_in1k   | 0.9926             | 0.9572           | Champion 🏆  |
| 🧬 ConvNeXtBase                | 0.9943             | 0.9435           | Challenger 🥇 |
| 🌀 swinv2_base_window12_192   | 0.9790             | 0.9311           | Contender ⚔ |
| 🌿 EfficientNetB7              | 0.9797             | 0.9240           | Leader 🚀     |
| 🏔️ ResNet152                  | 0.9821             | 0.8926           | Top Dog 🐶   |
| 🏗️ DenseNet201                 | 0.9329             | 0.7742           | Veteran 💼   |

---

### 🔥 Track Model Performance in MLflow

I track my model's performance in MLflow, which allows for easy comparison of different experiments and results.

[![Go to MLflow Experiment](https://img.shields.io/badge/Go%20to%20MLflow-Experiment-blue?style=for-the-badge)](https://dagshub.com/revanth-kumar-01-ai/360DigitMG-Training-Phase.mlflow/#/experiments/0?viewStateShareKey=80da10b99d9a7a97b045e3282371ab20a2b0b34bc77056434eaf5bd3b6d771c6&compareRunsMode=TABLE)

## 7. Deployment 🚀 (progress)

I am deploying the model using a **Streamlit app**. Streamlit provides an easy way to deploy and showcase machine learning models in an interactive and user-friendly web interface.


### **Process to Get the Code and Run:**

1. **Clone the Repository**:
   Use this command to get the project code on your system:
   ```bash
   git clone https://github.com/revanth-kumar-01-ai/360DigitMG-Training-Phase.git
   ```

2. **Install Dependencies**:
   Navigate to the project folder and install the necessary libraries:
   ```bash
   cd 360DigitMG-Training-Phase
   pip install -r requirements.txt
   ```

3. **Run the Streamlit App**:
   Once dependencies are installed, start the Streamlit app:
   ```bash
   streamlit run your_app.py
   ```

4. **Access the App**:
   Open your browser and go to `http://localhost:8501` to view the app in action! 🚀

---

```bash
## 💻 Code Workflow

1. 🔧 Update `config.yaml`  
2. 🔧 Update `params.yaml`  
3. 🧱 Update entity  
4. ⚙️ Update config manager in `src/config`  
5. 🧩 Update components  
6. 🧪 Update pipeline  
7. 🚀 Update `main.py`  
8. 🌐 Update `app.py`