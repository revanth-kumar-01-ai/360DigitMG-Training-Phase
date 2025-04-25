from EmbryoQualityCheck.constants import CONFIG_FILE_PATH, PARAMS_FILE_PATH
from EmbryoQualityCheck.utils.common import read_yaml, create_directories 
from EmbryoQualityCheck.entity.config_entity import DataIngestionConfig, DataPreprocessingConfig, TrainingConfig, EvaluationConfig
from pathlib import Path 

class ConfigurationManager:
    def __init__(self, config_filepath = CONFIG_FILE_PATH, params_filepath = PARAMS_FILE_PATH):
        """
            read the config and params 
            and create directories
        """
        # config
        self.config = read_yaml(config_filepath)
        # params
        self.params = read_yaml(params_filepath)
        # create dir (main)
        create_directories([self.config.artifacts_root])

    """
        get_data_ingestion_config Function
        This function moves the dataset into the artifacts folder. 📁✅
    """
    def get_data_ingestion_config(self) -> DataIngestionConfig:
        config = self.config.data_ingestion

        create_directories([config.root_dir])

        data_ingestion_config = DataIngestionConfig(
            root_dir=config.root_dir,
            source_URL=config.source_URL,
            local_data_file=config.local_data_file,
            unzip_dir=config.unzip_dir,
            masterFolder=config.masterFolder
        )
        
        return data_ingestion_config
    
    """
        get_data_preprocessing_config Function to preprocess the image dataset 
    """
    def get_data_preprocessing_config(self) -> DataPreprocessingConfig:
        config = self.config.data_preprocessing

        create_directories([config.root_dir])

        data_preprocessing_config = DataPreprocessingConfig(
            root_dir = config.root_dir,
            train_data = config.train_data,
            test_data = config.test_data,
            preprocessMasterFolder =  config.preprocessMasterFolder,
            masterFolder = config.masterFolder,
            params_image_size = self.params.IMAGESIZE,
            augmentation = self.params.AUGMENTATION
        )
        
        return data_preprocessing_config
    
    """
        get_training_config Function
    """
    def get_training_config(self) -> TrainingConfig:
        # training 
        training = self.config.training
        # params 
        params = self.params
        # training dataset 
        trainingDataset = self.config.data_preprocessing.train_data
        create_directories([training.root_dir])

        training_config = TrainingConfig(
            root_dir=Path(training.root_dir),
            trained_model_path=Path(training.trained_model_path),
            training_data=Path(trainingDataset),
            params_epochs=params.EPOCHS, 
            params_batch_size=params.BATCH_SIZE,
            params_image_size=params.IMAGESIZE,
            params_learning_rate=params.LEARNING_RATE,
            params_weight=params.WEIGHT,
            params_train_split= params.TRAIN_SPLIT,
            params_test_split=params.TEST_SPLIT
        )   
        
        return training_config
    
    """
        Model Evaluation 
    """
    def get_evaluation_config(self) -> EvaluationConfig:
        # training 
        onnx_model = self.config.onnx_model

        create_directories([onnx_model.root_dir])

        eval_config = EvaluationConfig(
            root_dir=Path(onnx_model.root_dir),
            trained_model= Path(onnx_model.trained_model),
            onnx_model_path32=Path(onnx_model.onnx_model_path32),
            onnx_model_path16=Path(onnx_model.onnx_model_path16),
            test_data=Path(onnx_model.test_data),
        )   
        
        return eval_config