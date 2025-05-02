from flask import Blueprint, request, jsonify
from EmbryoQualityCheck.flask_backend_app.app.database import get_db_connection

signin_blueprint = Blueprint('signin', __name__)

@signin_blueprint.route('/signin', methods=['POST'])
def signin_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password required ⚠️'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # 🔎 Check email exists
        cursor.execute("SELECT * FROM doctor_details WHERE email = %s", (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({'message': 'User not found, please signup 🔐'}), 404

        # 🔐 Check password
        if user['password'] != password:
            return jsonify({'message': 'Wrong password ❌'}), 401

        # ✅ Success
        return jsonify({
            'message': 'Signin successful',
            'doctor_id': user['doctor_id'],
            'name': user['doctor_name'],
            'email': user['email']
        }), 200

    except Exception as e:
        return jsonify({'message': f'Error 😢: {str(e)}'}), 500

    finally:
        cursor.close()
        conn.close()
