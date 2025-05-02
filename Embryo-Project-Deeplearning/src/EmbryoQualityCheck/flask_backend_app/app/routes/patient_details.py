from flask import Blueprint, request, jsonify
from PIL import Image  
import os
import uuid
import base64 
import mimetypes
import numpy as np
from io import BytesIO
from EmbryoQualityCheck.flask_backend_app.app.database import get_db_connection
from EmbryoQualityCheck.flask_backend_app.app.utils.prediction import prediction

patient_details_blueprint = Blueprint('patient_details', __name__)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, '..', '..', 'images')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def save_base64_image(base64_str):
    """Decodes a base64 string and saves it as an image."""
    if "," in base64_str:
        base64_str = base64_str.split(",")[1]
    image_data = base64.b64decode(base64_str)
    image = Image.open(BytesIO(image_data)).convert('RGB').resize((288, 288))

    unique_id = uuid.uuid4().hex
    filename = f"{unique_id}.jpg"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    image.save(filepath, 'JPEG')

    return filepath, np.array(image)

@patient_details_blueprint.route('/patient_details/<string:id>', methods=['POST'])
def upload_patient_image(id):
    """Handles the patient image upload and prediction process."""
    try:
        # Check if base64 is sent via JSON or form-data
        if request.is_json:
            data = request.get_json()
            base64_img = data.get('base64', '')
            patient_name = data.get('patient_name', '')
            patient_age = data.get('patient_age', '')
            patient_blood_group = data.get('patient_blood_group', '')
        else:
            base64_img = request.form.get('base64', '')
            patient_name = request.form.get('patient_name', '')
            patient_age = request.form.get('patient_age', '')
            patient_blood_group = request.form.get('patient_blood_group', '')

        # Check if image or base64 string is provided
        image_file = request.files.get('image')

        if not image_file and not base64_img:
            return jsonify({'error': 'No image or base64 provided 😕'}), 400

        if image_file:
            image = Image.open(image_file).convert('RGB').resize((288, 288))
            unique_id = uuid.uuid4().hex
            filename = f"{unique_id}.jpg"
            filepath = os.path.join(UPLOAD_FOLDER, filename) 
            image.save(filepath, 'JPEG')
        else:
            filepath, _ = save_base64_image(base64_img)

        # 🔍 Run the prediction
        userImage_Path, XAImage_Path, confidence_score, predicted_label = prediction(filepath=filepath)

        # 🛢️ Insert into database
        connection = get_db_connection()
        if connection:
            with connection.cursor() as cursor:
                sql = """
                INSERT INTO patient_detils (
                    patient_id, doctor_id, patient_name, patient_age, patient_blood_group,
                    prediction, probability, image_path, XAImage
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                patient_id = uuid.uuid4().hex
                cursor.execute(sql, (
                    patient_id,
                    id,
                    patient_name,
                    patient_age,
                    patient_blood_group,
                    predicted_label,
                    confidence_score,
                    userImage_Path,
                    XAImage_Path
                ))
                connection.commit()

                # Fetch the inserted patient data
                cursor.execute("SELECT * FROM patient_detils WHERE patient_id = %s", (patient_id,))
                column_names = [desc[0] for desc in cursor.description]
                row_data = cursor.fetchone()
                patient_data = dict(zip(column_names, row_data))

            connection.close()

            return jsonify({
                'message': 'Image uploaded & saved to DB ✅',
                'patient_data': patient_data
            }), 200

        return jsonify({'error': 'DB connection failed ❌'}), 500

    except Exception as e:
        return jsonify({'error': f'Image processing failed ❌: {str(e)}'}), 500
    


#  convert to base64 image 
# function
def convert_image_to_base64(image_path):
    try:
        # Get the MIME type based on the file extension
        mime_type, _ = mimetypes.guess_type(image_path)
        if not mime_type:
            mime_type = "image/jpeg"  # Default to jpeg if MIME type is not found
        
        # Open the image in binary mode
        with open(image_path, "rb") as image_file:
            # Convert image to base64
            base64_string = base64.b64encode(image_file.read()).decode('utf-8')

        # Return the data URL format: data:${mimeType};base64,${base64String}
        return f"data:{mime_type};base64,{base64_string}"
    
    except Exception as e:
        return f"Error: {str(e)}"




# extract single patient id details
@patient_details_blueprint.route('/single_patient_details/<string:id>', methods=['GET'])
def single_patient_details(id):
    try:
        connection = get_db_connection()
        if connection:
            with connection.cursor() as cursor:
                # SQL query to fetch all patient details for a specific doctor
                sql = "SELECT * FROM patient_detils WHERE patient_id = %s"
                cursor.execute(sql, (id,))
                column_names = [desc[0] for desc in cursor.description]
                rows = cursor.fetchall()

                # Convert rows to list of dictionaries
                patient_data = [dict(zip(column_names, row)) for row in rows]

        if patient_data:
            patient_data[0]['XAImage'] = convert_image_to_base64(f"{patient_data[0]['XAImage']}")
            patient_data[0]['image_path'] = convert_image_to_base64(f"{patient_data[0]['image_path']}")

            cursor.close()
            connection.close()

            return jsonify({
                'message': 'Patient details retrieved successfully ✅',
                'patient_data': patient_data
            }), 200

        else:
            return jsonify({'error': 'DB connection failed ❌'}), 500

    except Exception as e:
        return jsonify({'error': f'Failed to retrieve patient data ❌: {str(e)}'}), 500
    


# mulity images get method
@patient_details_blueprint.route('/patient_details/<string:id>', methods=['GET'])
def retrieve_patient_details(id):
    try:
        connection = get_db_connection()
        if connection:
            with connection.cursor() as cursor:
                # SQL query to fetch all patient details for a specific doctor
                sql = "SELECT * FROM patient_detils WHERE doctor_id = %s"
                cursor.execute(sql, (id,))
                column_names = [desc[0] for desc in cursor.description]
                rows = cursor.fetchall()

                # Convert rows to list of dictionaries
                patient_data = [
                {
                    **dict(zip(column_names, row)),
                    "XAImage": convert_image_to_base64(str(row[column_names.index("XAImage")])),
                    "image_path": convert_image_to_base64(str(row[column_names.index("image_path")]))
                }
                for row in rows
                ]

            cursor.close()
            connection.close()
           
            return jsonify({
                'message': 'Patient details retrieved successfully ✅',
                'patient_data': patient_data
            }), 200

        else:
            return jsonify({'error': 'DB connection failed ❌'}), 500

    except Exception as e:
        return jsonify({'error': f'Failed to retrieve patient data ❌: {str(e)}'}), 500