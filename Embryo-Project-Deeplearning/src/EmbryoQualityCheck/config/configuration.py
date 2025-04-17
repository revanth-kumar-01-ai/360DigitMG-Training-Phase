from EmbryoQualityCheck.constants import CONFIG_FILE_PATH, PARAMS_FILE_PATH
from EmbryoQualityCheck.utils.common import read_yaml, create_directories 
from EmbryoQualityCheck.entity.config_entity import DataIngestionConfig

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
            unzip_dir=config.unzip_dir 
        )
        
        return data_ingestion_config