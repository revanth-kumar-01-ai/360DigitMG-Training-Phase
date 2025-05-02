from flask import Blueprint, jsonify

hello_blueprint = Blueprint('hello', __name__)

@hello_blueprint.route('/', methods=['GET'])
def hello():
    return jsonify(message="Hello world 1236🌍")