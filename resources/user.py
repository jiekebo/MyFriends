from flask.ext.restful import Resource, reqparse
from bson import json_util
import pymongo
import json
from config import Config

parser = reqparse.RequestParser()
parser.add_argument('name', type=str)
parser.add_argument('age', type=int)

class User(Resource):
  def get(self, id):
    client = pymongo.MongoClient(Config.getConfig('mongodb', 'host'), Config.getConfig('mongodb', 'port'))
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
    args = parser.parse_args()
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['lunarstorm']
    user = db['user']
    user.insert(args)
    return "made {}".format(args)

  def delete(self, id):
    pass
