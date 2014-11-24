from mongoengine import *


class User(Document):
    nickname = StringField(
        min_length=3,
        max_length=200,
        required=True,
        unique=True
    )
    email = EmailField(
        min_length=5,
        max_length=200,
        required=True
    )
    password = StringField(
        min_length=8,
        max_length=200,
        required=True
    )
    meta = {
        'indexes': ['nickname']
    }