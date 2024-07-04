import os
import cv2
from keras.preprocessing.image import ImageDataGenerator
import numpy as np

# Directory containing class-specific folders
base_dir = 'data'

# Augmentation configuration
augmentation = ImageDataGenerator(
    shear_range=0.2,
    zoom_range=0.2,
    fill_mode='nearest'
)

# Define functions for additional augmentations
def adjust_brightness(image, delta=30):
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    hsv[:, :, 2] = hsv[:, :, 2] + delta
    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

def add_gaussian_noise(image, var=0.01):
    noise = np.random.normal(0, var, image.shape)
    return image + noise

# Iterate through each class directory
for class_dir in os.listdir(base_dir):
    class_path = os.path.join(base_dir, class_dir)

    # Create a new augmented directory for each class
    augmented_path = os.path.join(base_dir, f'augmented_{class_dir}')
    os.makedirs(augmented_path, exist_ok=True)

    # Generate augmented images for each image in the class directory
    for filename in os.listdir(class_path):
        if filename[:3] != 'aug' and filename[:8] != 'IMG_2023':
            img_path = os.path.join(class_path, filename)
            img = cv2.imread(img_path)  # Load image with OpenCV

            # Apply random color space adjustments and noise injection
            if np.random.rand() > 0.5:
                img = adjust_brightness(img)
            if np.random.rand() > 0.5:
                img = add_gaussian_noise(img)

            # Convert to NumPy array and add batch dimension
            x = img.astype('float32') / 255.0
            x = x.reshape((1,) + x.shape)

            # Generate augmented images and save them to the augmented directory
            i = 0
            for batch in augmentation.flow(x, batch_size=1, save_to_dir=augmented_path, save_prefix='aug', save_format='jpg'):
                i += 1
                if i > 5:  # Generate 5 augmented images per original image
                    break
