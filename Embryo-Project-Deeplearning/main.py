from EmbryoQualityCheck import logger
from EmbryoQualityCheck.pipeline.stage_01_data_ingestion import DataIngestionTrainingPipeline

"""
    Data ingestion stage 📥
"""
STAGE_NAME = "Data ingestion stage"

try:
    logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} started <<<<<<<<<<')
    obj = DataIngestionTrainingPipeline()
    obj.main()
    logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} Completer <<<<<<<<<<\n\nx==========x')
except Exception as e:
    logger.exception(e)
    raise e
