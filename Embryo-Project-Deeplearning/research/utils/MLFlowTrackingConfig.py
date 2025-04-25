import mlflow
import dagshub
import mlflow.keras

def MLFlowTracking(model, image_size, channels, batch_size, include_top, epochs, classes, weights, learning_rate, loss, train_accuracy, test_accuracy, model_name):

    try:
        # ✅ Init DagsHub with MLflow
        dagshub.init(repo_owner='revanth-kumar-01-ai', repo_name='360DigitMG-Training-Phase', mlflow=True)

        # ✅ Set registry URI
        mlflow.set_registry_uri('https://dagshub.com/revanth-kumar-01-ai/360DigitMG-Training-Phase.mlflow')

        with mlflow.start_run():
            # 🔢 Log parameters
            mlflow.log_param('IMAGE_SIZE', image_size)
            mlflow.log_param("CHANNELS", channels)
            mlflow.log_param('BATCH_SIZE', batch_size)
            mlflow.log_param('INCLUDE_TOP', include_top)
            mlflow.log_param('EPOCHS', epochs)
            mlflow.log_param('CLASSES', classes)
            mlflow.log_param('WEIGHTS', weights)
            mlflow.log_param('LEARNING_RATE', learning_rate)
            mlflow.log_param('MODEL_NAME', model_name)  # 👍 log model name too

            # 📊 Log metrics
            mlflow.log_metric('loss', float(loss))  
            mlflow.log_metric('train_accuracy', float(train_accuracy))  
            mlflow.log_metric('test_accuracy', float(test_accuracy))

            # 💾 Log the model with custom name
            mlflow.keras.log_model(model, "model", registered_model_name = model_name)
            
        print("✅ MLflow tracking logged successfully! 🚀")

    except Exception as e:
        print("❌ Error during MLflow tracking:", str(e))

