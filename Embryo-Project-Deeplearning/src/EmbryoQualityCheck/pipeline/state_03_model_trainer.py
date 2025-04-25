import os
from EmbryoQualityCheck import logger
from EmbryoQualityCheck.config.configuration import ConfigurationManager
from EmbryoQualityCheck.components.model_trainer import Training


# model trainer  

STAGE_NAME = "Model training stage"

class ModelTrainingPipeline:
    def __init__(self):
        pass 

    def main(self):
        try:
            config = ConfigurationManager()
            training_config = config.get_training_config()
            training = Training(config=training_config)
            device = training.checkDevice()
            fullLoaded = training.data_preprocessing()
            train_dataset, val_dataset = training.split_train_validation(fullLoaded)
            train_loader, val_loader = training.dataloader(train_dataset, val_dataset)
            training.ModelPhase(train_loader, val_loader, device) 
        except Exception as e:
            logger.exception(e)
            raise e


if __name__ == '__main__':
    try:
        logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} started <<<<<<<<<<')
        obj = ModelTrainingPipeline()
        obj.main()
        logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} Complete <<<<<<<<<<')
    except Exception as e:
        logger.exception(e)
        raise e