from flask.ext.restful import Resource, reqparse

from documents.user_document import User
from util.auth import *

parser = reqparse.RequestParser()
parser.add_argument('nickname', type=str)
parser.add_argument('email', type=str)
parser.add_argument('password', type=str)


class UserView(Resource):
    # @requires_auth
    def get(self, id):
        if id:
            resp = Response(response=User.objects.to_json(),
                            status=200,
                            mimetype="application/json")
            return resp
        args = parser.parse_args()
        for user in User.objects(name=args.name):
            return user.to_json()

    def put(self, id):
        return "created {}".format(id)

    def post(self, id=-1):
        args = parser.parse_args()
        user = User(nickname=args.nickname, email=args.email, password=args.password)
        user.save()
        return "made {}".format(args)

    def delete(self, id):
        pass
