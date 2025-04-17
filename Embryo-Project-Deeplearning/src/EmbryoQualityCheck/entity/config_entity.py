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