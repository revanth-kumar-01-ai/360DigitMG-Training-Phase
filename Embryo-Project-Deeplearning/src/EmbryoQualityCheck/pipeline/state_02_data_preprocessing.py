import os
from EmbryoQualityCheck import logger
from EmbryoQualityCheck.config.configuration import ConfigurationManager
from EmbryoQualityCheck.components.data_preprocessing import DataPreprocessing


# Data preprocessing ⚙️

STAGE_NAME = "Data preprocessing stage"

class DataPreprocessingPipeline:
    def __init__(self):
        pass 

    def main(self):
        config = ConfigurationManager()
        data_preprocessing_config = config.get_data_preprocessing_config()
        data_preprocessing = DataPreprocessing(config=data_preprocessing_config)
        data_preprocessing.StandardFormat()
        data_preprocessing.resizeImage()
        data_preprocessing.convertToRGB()
        data_preprocessing.dataAugmentation()
        if os.path.exists(data_preprocessing.config.preprocessMasterFolder):
            if not os.path.exists(data_preprocessing.config.train_data) and not os.path.exists(data_preprocessing.config.test_data):
                X, y = data_preprocessing.convertToArrayFormat()
                clean_images, clean_labels = data_preprocessing.removeDuplicateCorruptedFiles(X, y)
                X_train, X_test, y_train, y_test = data_preprocessing.splitTrainTest(clean_images, clean_labels)
                data_preprocessing.save_images(X_train, y_train, data_preprocessing.config.train_data, "Train")
                data_preprocessing.save_images(X_test, y_test, data_preprocessing.config.test_data, "Test")
            else:
                logger.info("Train and Test data already exist.")
        else:
            logger.info("Preprocessed Master Folder does not exist.")


if __name__ == '__main__':
    try:
        logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} started <<<<<<<<<<')
        obj = DataPreprocessingPipeline()
        obj.main()
        logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} Complete <<<<<<<<<<')
    except Exception as e:
        logger.exception(e)
        raise e