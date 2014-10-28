#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, render_template
from flask.ext.restful import Api, Resource

from resources.user import User
from config import Config

app = Flask(__name__)
api = Api(app)

@app.route('/')
@app.route('/<name>')
def main(name=None):
    return render_template("login.html", name=name)

api.add_resource(User, '/user/<int:id>', endpoint = 'user')

if __name__ == '__main__':
  config = Config()
  app.run(host='127.0.0.1', debug=True)