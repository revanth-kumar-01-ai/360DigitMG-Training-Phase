from dataclasses import dataclass
from pathlib import Path

@dataclass(frozen = True)
class DataIngestionConfig:
    """
        @dataclass
            Auto-creates constructor, makes code clean 🧼
        frozen=True
            Makes the class read-only 🔒 (no changes allowed after creation)
            Perfect for configs/settings 📁✅
    """
    root_dir: Path
    source_URL: str
    local_data_file: Path
    unzip_dir: Path
    masterFolder: Path

@dataclass(frozen = True)
class DataPreprocessingConfig:
    """
       Data preprocessing once preprocessed store the dataset int train and test 
    """
    root_dir: Path
    train_data: Path
    test_data: Path
    preprocessMasterFolder: Path
    masterFolder: Path
    params_image_size: int
    augmentation: int

@dataclass(frozen=True)
class TrainingConfig:
    root_dir: Path
    trained_model_path: Path
    training_data: Path
    params_epochs: int
    params_batch_size: int
    params_image_size: int
    params_learning_rate: float
    params_weight: str
    params_train_split: float
    params_test_split: float

@dataclass(frozen=True)
class EvaluationConfig:
    root_dir: Path
    trained_model: Path
    onnx_model_path32: Path
    onnx_model_path16: Path
    test_data: Path