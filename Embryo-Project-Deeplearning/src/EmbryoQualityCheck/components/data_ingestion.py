import os
import zipfile
import gdown
from EmbryoQualityCheck import logger
from EmbryoQualityCheck.utils.common import get_size
from EmbryoQualityCheck.config.configuration import DataIngestionConfig
import shutil

class DataIngestion:
    def __init__(self, config: DataIngestionConfig):
        self.config = config

 
    def download_file(self)-> str:
        '''
        Fetch data from the url
        '''

        try: 
            dataset_url = self.config.source_URL
            zip_download_dir = self.config.local_data_file

            if not os.path.exists(zip_download_dir):
                os.makedirs("artifacts/data_ingestion", exist_ok=True)
                logger.info(f"Downloading data from {dataset_url} into file {zip_download_dir}")
                file_id = dataset_url.split("/")[-2]
                prefix = 'https://drive.google.com/uc?/export=download&id='
                gdown.download(prefix+file_id,zip_download_dir)
                logger.info(f"Downloaded data from {dataset_url} into file {zip_download_dir}")
            else:
                logger.info(f"File already exists at {zip_download_dir}, skipping download.")

        except Exception as e:
            raise e
        
    
    def extract_zip_file(self): 
        
        """
        zip_file_path: str
        Extracts the zip file into the data directory
        Function returns None
        """
        unzip_path = self.config.unzip_dir
        os.makedirs(unzip_path, exist_ok=True)
        with zipfile.ZipFile(self.config.local_data_file, 'r') as zip_ref:
            zip_ref.extractall(unzip_path)


    def masterFolder(self):
        # 📁 Paths from config
        dataPath = os.path.join(self.config.unzip_dir, "Dataset")
        masterFolder = self.config.masterFolder

        if os.path.exists(dataPath):
            if not os.path.exists(masterFolder):
                os.makedirs(masterFolder, exist_ok=True)  # ✅ Ensure destination folder exists

                for folder in os.listdir(dataPath):
                    folder_path = os.path.join(dataPath, folder)

                    if folder == "Error Images":
                        src_path = folder_path
                        dst_path = os.path.join(masterFolder, folder)
                        shutil.copytree(src_path, dst_path, dirs_exist_ok=True)
                    elif os.path.isdir(folder_path):
                        for inner_folder in os.listdir(folder_path):
                            src_path = os.path.join(folder_path, inner_folder)
                            dst_path = os.path.join(masterFolder, inner_folder)
                            shutil.copytree(src_path, dst_path, dirs_exist_ok=True)

                logger.info("All folders copied to master folder successfully.")
            else:
                logger.info("Destination path already exists.")
        else:
            logger.info("Source folder does not exist.")






 