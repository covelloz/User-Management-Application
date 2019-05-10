from datetime import datetime
from flask import Blueprint, jsonify, request, abort
from uman.models import User, UserAPI

users = Blueprint('users', __name__)


@users.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user_api = UserAPI()
    response = user_api.get(user_id)
    return jsonify(response)


@users.route('/add-user', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        try:
            content = request.get_json()
            new_user = User(
                user_name=content['user_name'],
                user_email=content['user_email'],
                user_birthday=datetime.strptime(
                    content['user_birthday'], '%m/%d/%Y'),
                user_zipcode=content['user_zipcode'],
            )
            user_api = UserAPI()
            response = user_api.post(new_user)
            return jsonify(response)
        except (KeyError, ValueError):
            return jsonify({
                'Content': {},
                'Message': 'Bad Payload'
            })
    else:
        abort(400)


@users.route('/delete-user/<int:user_id>', methods=['GET', 'POST'])
def delete_user(user_id):
    if request.method == 'POST':
        user_api = UserAPI()
        response = user_api.delete(user_id)
        return jsonify(response)
    else:
        abort(400)


@users.route('/all-users', methods=['GET'])
def get_all_userse():
    user_api = UserAPI()
    response = user_api.get_all()
    return jsonify(response)
