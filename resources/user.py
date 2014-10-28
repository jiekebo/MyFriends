from flask.ext.restful import Resource
import pymongo
from bson import json_util
import json

class User(Resource):
    def get(self, id):
        client = pymongo.MongoClient('mongodb://localhost:27017/')
        db = client['lunarstorm']
        collection = db['user']
        cursor = [doc for doc in collection.find()]
        json_docs = [json.dumps(doc, default=json_util.default) for doc in cursor]
        #result = collection.find({}, {"name", "age"})
        #print result
        return json_docs

    def put(self, id):
        return "created {}".format(id)

    def post(self, id):
        client = pymongo.MongoClient('mongodb://localhost:27017')
        db = client['lunarstorm']
        collection = db['user']
        collection.insert
        return "made {}".format(id)

    def delete(self, id):
        pass