from flask.ext.restful import Resource, reqparse

from documents.user_document import User
from util.auth import *

parser = reqparse.RequestParser()
parser.add_argument('name', type=str)
parser.add_argument('age', type=int)


class UserView(Resource):
    @requires_auth
    def get(self):
        args = parser.parse_args()
        for user in User.objects(name=args.name):
            return user.to_json()

    def put(self, id):
        return "created {}".format(id)

    def post(self, id):
        args = parser.parse_args()
        user = User(name=args.name, age=args.age)
        user.save()
        return "made {}".format(args)

    def delete(self, id):
        pass
