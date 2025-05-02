from flask import Flask
from flask_cors import CORS  # 💡 Import CORS

from EmbryoQualityCheck.flask_backend_app.app.routes.hello import hello_blueprint
from EmbryoQualityCheck.flask_backend_app.app.routes.sign_up import signup_blueprint
from EmbryoQualityCheck.flask_backend_app.app.routes.sign_in import signin_blueprint
from EmbryoQualityCheck.flask_backend_app.app.routes.patient_details import patient_details_blueprint


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # 🔥 Allow only your frontend

# Register all routes 
app.register_blueprint(hello_blueprint)
app.register_blueprint(signup_blueprint)
app.register_blueprint(signin_blueprint)
app.register_blueprint(patient_details_blueprint)


if __name__ == '__main__':
    app.run(debug=True)

