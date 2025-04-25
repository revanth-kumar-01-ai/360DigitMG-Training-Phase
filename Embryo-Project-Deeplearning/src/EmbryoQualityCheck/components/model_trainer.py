import torch
import torch.nn as nn
from torch.utils.data import DataLoader, random_split
from torch.optim.lr_scheduler import ReduceLROnPlateau

# Vision & Transforms
from torchvision import datasets, transforms
import timm  # Pretrained models like EfficientViT

# Config & Logging
from EmbryoQualityCheck.config.configuration import TrainingConfig
from EmbryoQualityCheck import logger

# Progress Bar
from tqdm import tqdm

class Training:

    def __init__(self, config: TrainingConfig):
        self.config = config


    def checkDevice(self):
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        return device
    
    def data_preprocessing(self):
        # train data path 
        train_dir = self.config.training_data
        # transformation 
        transform = transforms.Compose([
            # Resize to 288x288
                transforms.Resize((288, 288)),      
             # Converts to [0, 1] 
                transforms.ToTensor(),             
        ])
        # Load dataset
        full_dataset = datasets.ImageFolder(root = train_dir, transform = transform)
        return full_dataset
    
    def split_train_validation(self, full_dataset):
        generator = torch.Generator().manual_seed(42) # all the time same 
        train_size = int(self.config.params_train_split * len(full_dataset)) # 90 percentage of food for train 
        val_size = len(full_dataset) - train_size # 10 percentage  of food for validation 
        train_dataset, val_dataset = random_split(full_dataset, [train_size, val_size], generator = generator) 
        return train_dataset, val_dataset
    
    def dataloader(self, train_dataset, val_dataset):
        train_loader = DataLoader(train_dataset, batch_size=self.config.params_batch_size, shuffle=True) # train data loader
        val_loader = DataLoader(val_dataset, batch_size=self.config.params_batch_size, shuffle=False) # validation data loader 
        return train_loader, val_loader

    def ModelPhase(self, train_loader, val_loader, device):
        model = timm.create_model(self.config.params_weight, pretrained=True)
        model.to(device)
        logger.info("model successfully loaded")
        # optimizes 
        criterion = nn.CrossEntropyLoss()
        optimizer = torch.optim.Adam(model.parameters(), lr=self.config.params_learning_rate)
        # reduce learning rate
        scheduler = ReduceLROnPlateau(optimizer, mode='min', factor=0.5, patience=3, verbose=True)

        # Trackers 
        train_losses, val_losses = [], []
        train_acc, val_acc = [], []

        # early stop 
        best_val_loss = float('inf')
        patience = 20
        wait = 0

        for epoch in range(self.config.params_epochs):
            model.train()
            train_loss, correct, total = 0.0, 0, 0
            for imgs, labels in tqdm(train_loader):
                imgs, labels = imgs.to(device), labels.to(device)
                optimizer.zero_grad()
                outputs = model(imgs)
                loss = criterion(outputs, labels)
                loss.backward()
                optimizer.step()

                train_loss += loss.item()
                _, preds = torch.max(outputs, 1)
                correct += (preds == labels).sum().item()
                total += labels.size(0)

            avg_train_loss = train_loss / len(train_loader)
            train_accuracy = correct / total
            train_losses.append(avg_train_loss)
            train_acc.append(train_accuracy)

            # Validation
            model.eval()
            val_loss, correct, total = 0.0, 0, 0
            with torch.no_grad():
                for imgs, labels in val_loader:
                    imgs, labels = imgs.to(device), labels.to(device)
                    outputs = model(imgs)
                    loss = criterion(outputs, labels)
                    val_loss += loss.item()
                    _, preds = torch.max(outputs, 1)
                    correct += (preds == labels).sum().item()
                    total += labels.size(0)

            avg_val_loss = val_loss / len(val_loader)
            val_accuracy = correct / total
            val_losses.append(avg_val_loss)
            val_acc.append(val_accuracy)

            logger.info(f"\nEpoch {epoch+1}: "
                f"Train Loss={avg_train_loss:.4f}, Train Acc={train_accuracy:.4f}, "
                f"Val Loss={avg_val_loss:.4f}, Val Acc={val_accuracy:.4f}")

            # ⬇️ Reduce LR if no improvement
            scheduler.step(avg_val_loss)

            # Early stopping and best model save
            if avg_val_loss < best_val_loss:
                best_val_loss = avg_val_loss
                wait = 0
                torch.save(model.state_dict(), self.config.trained_model_path)
                logger.info("Saved Best Model")
            else:
                wait += 1
                if wait >= patience:
                    logger.info("Early stopping")
                    break
    