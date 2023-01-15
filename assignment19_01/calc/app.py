# Put your app in here.

from flask import Flask, request
import operations

app = Flask(__name__)


@app.route("/add")
@app.route("/math/add")
def calc_add():
    return str(operations.add(int(request.args["a"]), int(request.args["b"])))


@app.route("/sub")
@app.route("/math/sub")
def calc_subtract():
    return str(operations.sub(int(request.args["a"]), int(request.args["b"])))


@app.route("/mult")
@app.route("/math/mult")
def calc_multiply():
    return str(operations.mult(int(request.args["a"]), int(request.args["b"])))


@app.route("/div")
@app.route("/math/div")
def calc_divide():
    return str(operations.div(int(request.args["a"]), int(request.args["b"])))
