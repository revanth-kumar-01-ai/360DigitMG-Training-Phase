from flask import Blueprint, request, jsonify
from EmbryoQualityCheck.flask_backend_app.app.database import get_db_connection

signup_blueprint = Blueprint('signup', __name__)

@signup_blueprint.route('/signup', methods=['POST'])
def add_user():
    try:
        data = request.get_json()

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        # ✅ Check if all fields are given
        if not name or not email or not password:
            return jsonify({'message': 'All fields (name, email, password) are required ❗'}), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # 🔍 Check if email already exists
        cursor.execute("SELECT * FROM doctor_details WHERE email = %s", (email,))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return jsonify({'message': 'User already exists with this email 🚫'}), 409

        # 🛠️ Insert user
        cursor.execute(
            "INSERT INTO doctor_details (doctor_name, email, password) VALUES (%s, %s, %s)",
            (name, email, password)
        )
        conn.commit()

        # 🔄 Retrieve inserted user
        cursor.execute("SELECT doctor_id, doctor_name, email FROM doctor_details WHERE email = %s", (email,))
        new_user = cursor.fetchone()

        cursor.close()
        conn.close()

        return jsonify({
            'message': 'Sign up successfully',
            'doctor_id': new_user['doctor_id'],
            'name': new_user['doctor_name'],
            'email': new_user['email']
        }), 201

    except Exception as e:
        return jsonify({'message': f'Something went wrong ❌: {str(e)}'}), 500
