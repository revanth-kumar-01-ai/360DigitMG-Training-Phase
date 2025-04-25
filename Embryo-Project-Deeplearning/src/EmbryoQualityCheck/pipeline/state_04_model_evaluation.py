import os
from EmbryoQualityCheck import logger
from EmbryoQualityCheck.config.configuration import ConfigurationManager
from EmbryoQualityCheck.components.model_evaluation import Evaluation


# model evaluation

STAGE_NAME = "Model evaluation stage"

class ModelEvaluationPipeline:
    def __init__(self):
        pass 

    def main(self):
        try:
            config = ConfigurationManager()
            evaluation_config = config.get_evaluation_config()
            evaluation = Evaluation(config = evaluation_config)
            evaluation.convert_to_onnxModel()
            evaluation.TestEvaluation()
        except Exception as e:
            logger.exception(e)
            raise e


if __name__ == '__main__':
    try:
        logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} started <<<<<<<<<<')
        obj = ModelEvaluationPipeline()
        obj.main()
        logger.info(f'>>>>>>>>>>> stage {STAGE_NAME} Complete <<<<<<<<<<')
    except Exception as e:
        logger.exception(e)
        raise e