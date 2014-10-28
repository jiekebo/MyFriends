#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, render_template
from flask.ext.restful import Api, Resource

from resources.user import User

app = Flask(__name__)
api = Api(app)

@app.route('/')
@app.route('/<name>')
def main(name=None):
    return render_template("login.html", name=name)

api.add_resource(User, '/users/<int:id>', endpoint = 'user')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)