# 📦 Imports
import os
import warnings
import numpy as np
import torch
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image
import cv2
import matplotlib.cm as cm
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image
import timm

from EmbryoQualityCheck.flask_backend_app.app.utils.classes import classes

# 🚫 Suppress warnings
warnings.filterwarnings('ignore')

# 🗂️ Path setup
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, '..', '..', 'XAI_images')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 💻 Check device
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# 🧠 Load model
model = timm.create_model('efficientvit_b2.r288_in1k', pretrained=True)
model.to(device)

# 📦 Load trained weights
current_dir = os.path.abspath(os.path.dirname(__file__))
embryo_project_path = os.path.abspath(os.path.join(current_dir, '..', '..', '..', '..', '..'))
model_path = os.path.join(embryo_project_path, 'artifacts', 'training', 'model.pth')
model.load_state_dict(torch.load(model_path, map_location=device))
model.eval()


def prediction(filepath):
    # 🖼️ Load & preprocess image
    img = Image.open(filepath)
    transform = transforms.Compose([transforms.ToTensor()])
    input_tensor = transform(img).unsqueeze(0).to(device)

    # 🔮 Prediction
    with torch.no_grad():
        outputs = model(input_tensor)
        probs = F.softmax(outputs, dim=1)
        confidence_score = torch.max(probs).item() * 100
        _, predicted_class = torch.max(outputs, 1)

    # 🔥 Grad-CAM settings
    target_layer = model.stem[-1].main.depth_conv.conv
    cam = GradCAM(model=model, target_layers=[target_layer])
    targets = [ClassifierOutputTarget(predicted_class.item())]
    grayscale_cam = cam(input_tensor=input_tensor, targets=targets)[0, :]

    # 🎨 Heatmap + blend
    grayscale_cam = np.power(grayscale_cam, 0.5)
    grayscale_cam = np.clip(grayscale_cam * 2.0, 0, 1)

    img_np = transform(img).permute(1, 2, 0).cpu().numpy()
    img_np = np.clip(img_np, 0, 1)
    colored_heatmap = cm.jet(grayscale_cam)[..., :3]
    colored_heatmap = cv2.resize(colored_heatmap, (img_np.shape[1], img_np.shape[0]))

    blended_image = (1 - 0.6) * img_np + 0.6 * colored_heatmap
    blended_image = np.clip(blended_image, 0, 1)

    # 💾 Save CAM image
    save_path = os.path.join(UPLOAD_FOLDER, os.path.basename(filepath).split('.')[0] + '_cam.jpg')
    blended_image_uint8 = (blended_image * 255).astype(np.uint8)
    blended_pil = Image.fromarray(blended_image_uint8)
    blended_pil.save(save_path, 'JPEG')

    # 🏷️ Get label
    predicted_label = classes(predicted_class.item())

    return filepath, save_path, confidence_score, predicted_label

