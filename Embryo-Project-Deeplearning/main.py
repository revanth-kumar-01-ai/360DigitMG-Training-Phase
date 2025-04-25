from EmbryoQualityCheck import logger
from EmbryoQualityCheck.pipeline.stage_01_data_ingestion import DataIngestionTrainingPipeline
from EmbryoQualityCheck.pipeline.state_02_data_preprocessing import DataPreprocessingPipeline
from EmbryoQualityCheck.pipeline.state_03_model_trainer import ModelTrainingPipeline
from EmbryoQualityCheck.pipeline.state_04_model_evaluation import ModelEvaluationPipeline

"""
    Data ingestion stage 📥
"""
STAGE_NAME = "Data ingestion stage"

try:
    logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} started <<<<<<<<<<')
    obj = DataIngestionTrainingPipeline()
    obj.main()
    logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} Complete <<<<<<<<<<\n\nx==========x')
except Exception as e:
    logger.exception(e)
    raise e


"""
    Data preprocessing stage ⚙️
"""
STAGE_NAME = "Data preprocessing stage"

try:
    logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} started <<<<<<<<<<')
    obj = DataPreprocessingPipeline()
    obj.main()
    logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} Complete <<<<<<<<<<\n\nx==========x')
except Exception as e:
    logger.exception(e)
    raise e

"""
    Model training stage 🤖
"""
STAGE_NAME = "Model training stage"

try:
    logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} started <<<<<<<<<<')
    obj = ModelTrainingPipeline()
    obj.main()
    logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} Complete <<<<<<<<<<\n\nx==========x')
except Exception as e:
    logger.exception(e)
    raise e


"""
    Model  evaluation stage ✅
"""

STAGE_NAME = "Model evaluation stage"

try:
    logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} started <<<<<<<<<<')
    obj = ModelEvaluationPipeline()
    obj.main()
    logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} Complete <<<<<<<<<<\n\nx==========x')
except Exception as e:
    logger.exception(e)
    raise e