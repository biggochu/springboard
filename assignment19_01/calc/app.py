# Put your app in here.

from flask import Flask, request
import operations

app = Flask(__name__)


@app.route("/add")
def calc_add():
    return str(operations.add(int(request.args["a"]), int(request.args["b"])))


@app.route("/sub")
def calc_subtract():
    return str(operations.sub(int(request.args["a"]), int(request.args["b"])))


@app.route("/mult")
def calc_multiply():
    return str(operations.mult(int(request.args["a"]), int(request.args["b"])))


@app.route("/div")
def calc_divide():
    return str(operations.div(int(request.args["a"]), int(request.args["b"])))


@app.route("/math/<op>")
def calc_all(op):
    if op == "add":
        return str(operations.add(int(request.args["a"]), int(request.args["b"])))
    elif op == "sub":
        return str(operations.sub(int(request.args["a"]), int(request.args["b"])))
    elif op == "mult":
        return str(operations.mult(int(request.args["a"]), int(request.args["b"])))
    elif op == "div":
        return str(operations.div(int(request.args["a"]), int(request.args["b"])))
