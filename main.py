#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/')
def run_test():
    return 'Testing flask'
