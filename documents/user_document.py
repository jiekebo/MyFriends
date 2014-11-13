from mongoengine import *


class User(Document):
    nickname = StringField(max_length=200, required=True)
    email = StringField(max_length=200, required=True)
    password = StringField(max_length=200, required=True)
    #age = IntField(required=True)