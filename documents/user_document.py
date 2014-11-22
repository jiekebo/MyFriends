from mongoengine import *


class User(Document):
    nickname = StringField(max_length=200, required=True, unique_with='email')
    email = EmailField(max_length=200, required=True)
    password = StringField(max_length=200, required=True)