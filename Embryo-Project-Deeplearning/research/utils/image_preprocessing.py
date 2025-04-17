# import necessary libraries 
import os
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
from PIL import Image

# math
import math


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


    # generate the augmentation 
    def generateAugmentation(path, target):
        dataPath = path
        savePath = dataPath

        # 🧪 Augmentation settings
        datagen = ImageDataGenerator(
            rotation_range=40,
            zoom_range=0.3,
            horizontal_flip=True,
            shear_range=0.3,
            width_shift_range=0.2,
            height_shift_range=0.2,
            brightness_range=[0.5, 1.5],
            fill_mode='nearest'
        )

        # 📸 Load all images
        images = [img for img in os.listdir(dataPath) if img.lower().endswith(('.png', '.jpg', '.jpeg'))]
        total_images = len(images)
        
        # 📊 How many new images per original
        per_image = math.ceil(target / total_images)
        generated_total = 0

        for filename in images:
            img_path = os.path.join(dataPath, filename)
            img = load_img(img_path, color_mode='grayscale')
            x = img_to_array(img)
            x = x.reshape((1,) + x.shape)

            count = 0
            for batch in datagen.flow(x, batch_size=1, save_to_dir=savePath, save_prefix='aug', save_format='png'):
                count += 1
                generated_total += 1
                if count >= per_image or generated_total >= target:
                    break

            if generated_total >= target:
                break

        print(f"✅ Generated new {generated_total} images.")

    
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
    
    # Plot settings
    def RadomVisual(indices):
        # 📊 Plot settings
        plt.figure(figsize=(15, 6))

        for i, idx in enumerate(indices):
            plt.subplot(2, 5, i + 1)  # 2 rows, 5 columns
            plt.imshow(X[idx].squeeze(), cmap='gray')
            plt.title(f"Label: {y[idx]}")
            plt.axis('off')

        plt.tight_layout()
        plt.show()