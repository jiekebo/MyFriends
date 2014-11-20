#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, render_template
from flask.ext.restful import Api
from mongoengine import *

from config import Config
from resources.user_view import UserView


app = Flask(__name__)
api = Api(app)

Config()
connect(Config.get_config('mongodb', 'database'), host=Config.get_config('mongodb', 'host'),
        port=Config.get_config('mongodb', 'port'))


@app.route('/')
@app.route('/<name>')
def main(name=None):
    return render_template("login.html", name=name)


api.add_resource(UserView, '/api/user/', '/api/user/<int:id>', endpoint='user')

if __name__ == '__main__':
    app.run(host=Config.get_config('flask', 'host'), port=Config.get_config('flask', 'port'), debug=True)
