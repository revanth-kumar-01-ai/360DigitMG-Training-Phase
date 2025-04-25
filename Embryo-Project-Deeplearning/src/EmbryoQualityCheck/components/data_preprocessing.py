# 🌐 System & OS
import os
import hashlib
import random

# 🖼️ Image Processing & Augmentation
import cv2
import numpy as np
from PIL import Image, UnidentifiedImageError
from tensorflow.keras.preprocessing.image import load_img, array_to_img, img_to_array
import albumentations as A  # Augmentation

# 🔁 Shuffle & Split
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split

# 📊 Logging & Config
from EmbryoQualityCheck import logger
from EmbryoQualityCheck.config.configuration import DataPreprocessingConfig

# 🔧 Utilities
from tqdm import tqdm

class DataPreprocessing:
    def __init__(self, config: DataPreprocessingConfig):
        self.config = config
        
# preprocessMasterFolder

    # Standard format .jpg 
    def StandardFormat(self):
        for folder in os.listdir(self.config.preprocessMasterFolder):
            folder_path = os.path.join(self.config.preprocessMasterFolder, folder)
            
            if os.path.isdir(folder_path):  # ✅ Check only folders
                for file in os.listdir(folder_path):
                    img_path = os.path.join(folder_path, file)

                    # ✅ Convert only .png or .webp or others to .jpg
                    if os.path.isfile(img_path) and file.lower().endswith((".png", ".jpeg", ".webp")):
                        try:
                            img = Image.open(img_path).convert("RGB")

                            new_img_path = os.path.splitext(img_path)[0] + ".jpg"
                            img.save(new_img_path, "JPEG")

                            os.remove(img_path)  # 🗑️ Delete original image

                        except Exception as e:
                            logger.info(f"Error converting {img_path}: {e}")
                    
        logger.info("All images converted to .jpg and originals deleted!")
    
    # Resize the images
    def resizeImage(self):
        for folder in os.listdir(self.config.preprocessMasterFolder):
            if folder:
                for folderPath in os.listdir(os.path.join(self.config.preprocessMasterFolder, folder)):
                    
                    # image path
                    img_path = os.path.join(self.config.preprocessMasterFolder, folder, folderPath)

                    # 1. Load & Resize
                    img = load_img(img_path, target_size=(self.config.params_image_size, self.config.params_image_size))

                    # 2. Convert to array
                    img_array = img_to_array(img)

                    # 3. convert back to image 
                    img_ready = array_to_img(img_array)

                    # 4. save the  image exiting path 
                    img_ready.save(img_path)

        logger.info("Image resized and saved back successfully!")
    
    # convert to  rgb image 
    def convertToRGB(self):
        for folder in os.listdir(self.config.preprocessMasterFolder):
            if folder:
                for folderPath in os.listdir(os.path.join(self.config.preprocessMasterFolder, folder)):

                    # Image path
                    img_path = os.path.join(self.config.preprocessMasterFolder, folder, folderPath)

                    # Open the image using Pillow
                    img = Image.open(img_path)

                    # Check if the image is grayscale (L mode) or RGB (3 channels)
                    if img.mode == "L":  # If grayscale
                        # Convert grayscale to RGB
                        rgb_img = img.convert("RGB")
                        rgb_img.save(img_path)
                        logger.info(f"Converted {img_path} to RGB")

        logger.info("All images processed!")
    
    # data augmentation
    def dataAugmentation(self):
            augmentations = [
        A.HorizontalFlip(p=1),
        A.VerticalFlip(p=1),
        A.RandomBrightnessContrast(p=1),
        A.Rotate(limit=30, p=1),
        A.Blur(blur_limit=3, p=1),
        A.RandomGamma(p=1),
        A.RGBShift(p=1),
        A.CLAHE(p=1),
        A.HueSaturationValue(p=1),
        A.RandomShadow(p=1)
    ]
            # 🎯 Resize augment
            resize = A.Resize(self.config.params_image_size, self.config.params_image_size)

            for folder in os.listdir(self.config.preprocessMasterFolder):
                folder_path = os.path.join(self.config.preprocessMasterFolder, folder)
                if not os.path.isdir(folder_path):
                    continue

                image_files = [f for f in os.listdir(folder_path) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
                total_needed = 1000
                current_count = len(image_files)

                logger.info(f"Folder: {folder} | Current: {current_count}")

                img_index = 0
                while current_count < total_needed and img_index < len(image_files):
                    img_name = image_files[img_index]
                    img_path = os.path.join(folder_path, img_name)
                    image = cv2.imread(img_path)
                    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

                    # Resize original before augmentation
                    image = resize(image=image)["image"]

                    # 🌀 Shuffle and pick required augmentations
                    aug_list = random.sample(augmentations, min(10, total_needed - current_count))

                    for i, aug in enumerate(aug_list):
                        augmented = aug(image=image)["image"]
                        augmented = resize(image=augmented)["image"]  # Resize after aug too

                        save_path = os.path.join(folder_path, f"aug_{img_index}_{i}.jpg")
                        cv2.imwrite(save_path, cv2.cvtColor(augmented, cv2.COLOR_RGB2BGR))
                        current_count += 1

                        if current_count >= total_needed:
                            break

                    img_index += 1

                logger.info(f"Done: {folder} | Total images: {current_count}")

            logger.info(f"All folders now have 1000 images, all resized to {self.config.params_image_size}X{self.config.params_image_size}!")


    # convert to array format 
    def convertToArrayFormat(self):
        X = []
        y = []

        for folder in os.listdir(self.config.preprocessMasterFolder):
            folder_path = os.path.join(self.config.preprocessMasterFolder, folder)

            if os.path.isdir(folder_path):
                label = folder

                for file in os.listdir(folder_path):
                    img_path = os.path.join(folder_path, file)

                    try:
                        img = Image.open(img_path)

                        # Force to RGB and resize
                        img = img.convert("RGB").resize((224, 224))

                        # Convert to array
                        img_array = np.array(img, dtype=np.uint8)  # ✅ Set dtype to avoid issues

                        # Check shape
                        if img_array.shape == (224, 224, 3):
                            X.append(img_array)
                            y.append(label)

                    except Exception as e:
                        logger.info(f"Skipped {img_path}: {e}")

        # Now safe to convert
        X = np.array(X)
        y = np.array(y)

        logger.info("All images are loaded with same shape!")
        logger.info(f"X shape:, {X.shape[0]} {X.shape[1]} {X.shape[2]} {X.shape[3]}")
        logger.info(f"y shape:, {y.shape[0]}")

        return X, y
    
    
    # remove the duplicate images 
    def removeDuplicateCorruptedFiles(self, X, y):
        def hash_image(img):
            return hashlib.md5(img.tobytes()).hexdigest()

        clean_images = []
        clean_labels = []
        seen_hashes = set()

        for img, label in zip(X, y):
            if img is not None and img.size != 0:
                img_hash = hash_image(img)
                if img_hash not in seen_hashes:
                    clean_images.append(img)
                    clean_labels.append(label)
                    seen_hashes.add(img_hash)

        clean_images = np.array(clean_images)
        clean_labels = np.array(clean_labels)

        logger.info(f"Cleaned images count: {len(clean_images)}")
        logger.info(f"Cleaned labels count: {len(clean_labels)}")

        return clean_images, clean_labels

    # split the images train and test 
    def splitTrainTest(self, clean_images, clean_labels):
        clean_images, clean_labels = shuffle(clean_images, clean_labels, random_state = 42)
        X_train, X_test, y_train, y_test = train_test_split(clean_images, clean_labels, test_size = 0.1, stratify = clean_labels, random_state=42)
        return X_train, X_test, y_train, y_test

    # save images
    def save_images(self, img_arrays, labels, base_path, split_name, counter = 1):
        logger.info(f"Saving {split_name} images...")
        for img_array, label in tqdm(zip(img_arrays, labels), total=len(img_arrays), desc=f"Saving {split_name}"):
            save_dir = os.path.join(base_path, label)
            os.makedirs(save_dir, exist_ok=True)
            img = Image.fromarray(img_array)
            img_name = f"image{counter}.jpg"
            img.save(os.path.join(save_dir, img_name), "JPEG")
            counter += 1
