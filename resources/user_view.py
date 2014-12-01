from flask.ext.restful import Resource, reqparse
from mongoengine import NotUniqueError
from passlib.hash import pbkdf2_sha256

from util.auth import *


parser = reqparse.RequestParser()
parser.add_argument('nickname', type=str)
parser.add_argument('email', type=str)
parser.add_argument('password', type=str)


class UserView(Resource):
    def get(self):
        args = parser.parse_args()
        if not args.nickname or not check_auth(args.nickname, args.password):
            return Response(status=401)
        return Response(response=User.objects(nickname=args.nickname.lower())[0].to_json(),
                        status=200,
                        mimetype="application/json")

    @requires_auth
    def put(self, id):
        return "created {}".format(id)

    def post(self):
        try:
            args = parser.parse_args()
            hash = pbkdf2_sha256.encrypt(args.password, rounds=1000, salt_size=16)
            user = User(nickname=args.nickname.lower(), email=args.email, password=hash)
            user.save()
            return "made {}".format(args)
        except NotUniqueError, e:
            return Response(status=403)

    @requires_auth
    def delete(self, id):
        pass
