from mongoengine import *

class User(Document):
    name = StringField(max_length=200, required=True)
    age = IntField(required=True)