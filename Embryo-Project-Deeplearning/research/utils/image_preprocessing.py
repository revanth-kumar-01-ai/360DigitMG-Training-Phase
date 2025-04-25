# import necessary libraries 
import os, math
import pandas as pd
import numpy as np

# Visualization Libraries
import matplotlib.pyplot as plt

# Deep Learning Libraries
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator, load_img, array_to_img, img_to_array

# random
import random

# Pillow
from PIL import Image, UnidentifiedImageError

# math
import math

# openCV lib for image processing 
import cv2

# hash table lib
import hashlib



class ImagePrePreprocessingData:

    # randomly show five image 
    def visualImagesRandomly(dataPath, folder):
        random.seed()

        folder_path = os.path.join(dataPath, folder)

        # Get all image files
        all_images = os.listdir(folder_path)

        # Pick 5 random images
        sample_images = random.sample(all_images, 5)

        # Plot them
        plt.figure(figsize=(15, 5))
        for i, img_name in enumerate(sample_images):
            img_path = os.path.join(folder_path, img_name)
            img = load_img(img_path)
            plt.subplot(1, 5, i+1)
            plt.imshow(img)
            plt.axis('off')
        plt.show()


    # Visual Classes Count
    def VisualClassesCount(base_path):
        # 🗂️ Store class names and image counts
        class_names = []
        image_counts = []
        # 🔁 Loop folders
        for folder in os.listdir(base_path):
            folder_path = os.path.join(base_path, folder)
            if os.path.isdir(folder_path):
                class_names.append(folder)
                image_counts.append(len(os.listdir(folder_path)))
        # 📊 Plotting
        plt.figure(figsize=(15, 6))
        plt.bar(class_names, image_counts, color='skyblue')
        plt.xticks(rotation=45, ha='right')
        plt.xlabel("Embryo Classes")
        plt.ylabel("Image Count")
        plt.title("Embryo Image Count per Class")
        plt.tight_layout()
        plt.show()
    
    # Remove the duplicate images, blank, Corrupted image in the main folder 

    def is_blank(img, threshold=5):
        # Convert to grayscale and check std deviation
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        return np.std(gray) < threshold

    def get_hash(image_path):
        with open(image_path, 'rb') as f:
            return hashlib.md5(f.read()).hexdigest()

    def clean_embryo_folder(master_folder):
        print("🧹 Cleaning started...")
        image_hashes = set()
        removed_count = {"blank": 0, "duplicate": 0, "corrupt": 0}

        for root, dirs, files in os.walk(master_folder):
            for file in files:
                if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                    path = os.path.join(root, file)

                    try:
                        # 🧪 Corrupted check
                        with Image.open(path) as img:
                            img.verify()

                        # ✅ Reload with cv2 for other checks
                        img_cv = cv2.imread(path)

                        # Blank check
                        if ImagePrePreprocessingData.is_blank(img_cv):
                            os.remove(path)
                            removed_count["blank"] += 1
                            continue

                        # Duplicate check
                        img_hash = ImagePrePreprocessingData.get_hash(path)
                        if img_hash in image_hashes:
                            os.remove(path)
                            removed_count["duplicate"] += 1
                            continue
                        else:
                            image_hashes.add(img_hash)

                    except (UnidentifiedImageError, OSError):
                        os.remove(path)
                        removed_count["corrupt"] += 1

        print(f"\n✅ Done! Removed -> Blank: {removed_count['blank']} | Duplicate: {removed_count['duplicate']} | Corrupted: {removed_count['corrupt']}")

   
