# Core ML Libraries
import torch
import timm
import onnx
from onnxconverter_common import float16
import onnxruntime as ort

# Vision & Transforms
from PIL import Image
import torchvision.transforms as transforms

#  Metrics
from sklearn.metrics import accuracy_score

# Progress Bar
from tqdm import tqdm

# System & OS
import os
import numpy as np

# Custom Modules
from EmbryoQualityCheck import logger
from EmbryoQualityCheck.config.configuration import EvaluationConfig


class Evaluation:

    def __init__(self, config: EvaluationConfig):
        self.config = config

    def convert_to_onnxModel(self):
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # 🧠 Load the model
        model = timm.create_model('efficientvit_b2.r288_in1k', pretrained=False)
        model.to(device)
        
        model.load_state_dict(torch.load(self.config.trained_model))
        model.eval()

        # 📦 Dummy input
        dummy_input = torch.randn(1, 3, 288, 288).to(device)

        # 🟠 Export to ONNX (FP32)
        torch.onnx.export(
            model,
            dummy_input,
            self.config.onnx_model_path32,
            input_names=['input'],
            output_names=['output'],
            opset_version=11,
            export_params=True,
            do_constant_folding=True
        )

        # ⚒️ Convert to FP16
        model_fp32 = onnx.load(self.config.onnx_model_path32)
        model_fp16 = float16.convert_float_to_float16(model_fp32)
        onnx.save(model_fp16, self.config.onnx_model_path16)

        logger.info("ONNX FP16 model saved as efficientvit_embryo_fp16.onnx")
    
    # test data evaluation 
    def TestEvaluation(self):
        predict = []
        y_true = []

        root_path = self.config.test_data


        # Load ONNX model
        session = ort.InferenceSession(self.config.onnx_model_path16)

        # Define transform
        transform = transforms.Compose([
            transforms.Resize((288, 288)),
            transforms.ToTensor(),
        ])
        
        # Class names
        class_names = [
            '8-cell Grade A', '8-cell Grade B', '8-cell Grade C',
            'Blastocyst Grade A', 'Blastocyst Grade B', 'Blastocyst Grade C',
            'Error Images', 'Morula Grade A', 'Morula Grade B', 'Morula Grade C'
        ]

        for folder in tqdm(os.listdir(root_path), desc="Processing folders"):
            folder_path = os.path.join(root_path, folder)
            
            for img_name in os.listdir(folder_path):
                image_path = os.path.join(folder_path, img_name)

                # Load and transform image
                img = Image.open(image_path).convert("RGB")
                img_tensor = transform(img).unsqueeze(0).numpy().astype(np.float16)

                # Run inference
                outputs = session.run(None, {"input": img_tensor})
                probs = outputs[0]
                pred_class = np.argmax(probs)

                # Store prediction and ground truth
                predict.append(class_names[pred_class])
                y_true.append(folder)  # True label from folder name

        logger.info(f'Accuracy {accuracy_score(y_true, predict)}')

    