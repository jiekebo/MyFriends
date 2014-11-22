from flask.ext.restful import Resource, reqparse
from mongoengine import NotUniqueError

from util.auth import *
from passlib.hash import pbkdf2_sha256


parser = reqparse.RequestParser()
parser.add_argument('nickname', type=str)
parser.add_argument('email', type=str)
parser.add_argument('password', type=str)


class UserView(Resource):
    @requires_auth
    def get(self):
        args = parser.parse_args()
        if args.nickname:
            return Response(response=User.objects(nickname=args.nickname.lower())[0].to_json(),
                            status=200,
                            mimetype="application/json")
        else:
            return Response(response=User.objects.to_json(),
                            status=200,
                            mimetype="application/json")

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


    def delete(self, id):
        pass
