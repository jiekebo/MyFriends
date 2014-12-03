from flask.ext.restful import Resource, reqparse
from mongoengine import NotUniqueError

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
        user = User.objects(nickname=args.nickname.lower())[0]
        user.password = None
        return Response(response=user.to_json(),
                        status=200,
                        mimetype="application/json")

    @requires_auth
    def put(self, id):
        return "created {}".format(id)

    def post(self):
        try:
            args = parser.parse_args()
            user = User(
                nickname=args.nickname.lower(),
                email=args.email,
                password=create_hash(args.password)
            )
            user.save(force_insert=True)
            return Response(status=201)
        except NotUniqueError, e:
            return Response(status=403)

    @requires_auth
    def delete(self, id):
        pass
