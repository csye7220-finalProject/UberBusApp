from flask_jwt_extended import (
    create_access_token,  current_user, jwt_required, JWTManager, create_refresh_token)
import simplejson as json
from flask import Flask, flash, request, jsonify, render_template, redirect, url_for, g, session, send_from_directory, abort
from flask_cors import CORS
from flask_api import status
from datetime import date, datetime, timedelta
from calendar import monthrange
from dateutil.parser import parse
import pytz
import os
import sys
import time
import uuid
import json
import random
import string
import pathlib
import hashlib
import binascii
import io
from uuid import UUID
from bson.objectid import ObjectId
import re
import jwt
from pymongo import MongoClient

# straight mongo access

mongo_client = MongoClient(
    "mongodb://testuser:testuser@cluster0-shard-00-00.w8sam.mongodb.net:27017,cluster0-shard-00-01.w8sam.mongodb.net:27017,cluster0-shard-00-02.w8sam.mongodb.net:27017/uber_trips?ssl=true&replicaSet=atlas-cn0hko-shard-0&authSource=admin&retryWrites=true&w=majority")
app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))

# JWT Code
jwt = JWTManager(app)

app.config['JWT_BLACKLIST_ENABLED'] = True
app.config["JWT_SECRET_KEY"] = "super-secret-lv"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(minutes=60)

# refresh token


@app.route("/user/refresh", methods=["POST"])
@jwt_required
def refresh():
    identity = get_jwt_identity()

    access_token = create_access_token(
        identity=identity, fresh=datetime.timedelta(minutes=30))
    return jsonify(access_token=access_token)


# jwt config
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return dict(identity)

# def encrypt(password):
# return "UberBus@"+password+"2021"

# def decrypt(password):
#     return password[8:-4]


def atlas_connect():
    mongo_client = pymongo.MongoClient(
        "mongodb://testuser:testuser@cluster0-shard-00-00.w8sam.mongodb.net:27017,cluster0-shard-00-01.w8sam.mongodb.net:27017,cluster0-shard-00-02.w8sam.mongodb.net:27017/uber_trips?ssl=true&replicaSet=atlas-cn0hko-shard-0&authSource=admin&retryWrites=true&w=majority")
    db = client.test


def tryexcept(requesto, key, default):
    lhs = None
    try:
        lhs = requesto.json[key]
        # except Exception as e:
    except:
        lhs = default
    return lhs


trips = dict()
buses = dict()

# seconds since midnight


def ssm():
    now = datetime.now()
    midnight = now.replace(hour=0, minute=0, second=0, microsecond=0)
    return str((now - midnight).seconds)

# !Admin Login Logout


@app.route("/admin/login", methods=["POST"])
def admin_login():
    username = request.json.get("username")
    password = request.json.get("password")

    if username == "admin" and password == "admin123":
        session["username"] = username
        print(session)
        return jsonify("Login Success")
    else:
        return jsonify("Login Failed")


@app.route("/admin/logout", methods=["GET"])
def admin_logout():
    if "username" in session:
        session.pop("username", None)
    return jsonify("Logout Success")

# !Admin Add Bus


@app.route("/app/addbus", methods=["GET", "POST"])
# @jwt_required(fresh=True)
def add_bus():
    db = mongo_client['uber_trips']
    bus_operators = db['bus_operators']
    # busId = request.json.get("busId")
    name = request.json.get("name")
    source = request.json.get("source")
    destination = request.json.get("destination")
    date = request.json.get("date")
    time = request.json.get("time")
    quantity = int(request.json.get("quantity"))
    cost = request.json.get("cost")
    dateformat = "00:00:00.000+00:00"
    partdate = (date[0:11]) + dateformat
    # pt2= str(partdate) +
    print(str(partdate))
    # dummydate =datetime.datetime.strptime(date, "%d/%m/%Y")
    # print(dummydate)
    trip = dict(
        # busId=busId,
        name=name,
        source=source,
        destination=destination,
        date=partdate,
        # date=datetime.datetime.strptime(date, "%d/%m/%Y"),
        bustime=time,
        quantity=quantity,
        cost=cost
        # _id=str(bus_id),
    )
    #  buses[trip["_id"]] = trip
    #     db["trips"]["buses"].insert_one(trip)
    #     return jsonify(trip)

    query = bus_operators.insert_one(trip)
    print("Bus inserted ", query)

    if query:
        return jsonify({"message": "Bus added successfully"}), 200
    else:
        return jsonify({"message": "Error adding bus"}), 400
        # buses[trip["_id"]] = trip
        # db["trips"]["buses"].insert_one(trip)
        # return jsonify(trip)


# Endpoints to handle bus bookings
@app.route("/app/getoperator", methods=["GET", "POST"])
# @jwt_required(fresh=True)
def getOperator():
    db = mongo_client['uber_trips']
    # change to drivers
    opcollection = db['bus_operators']
    source = request.json['source']
    destination = request.json['destination']
    date = request.json['date']
    # quantity = request.json['quantity']
    print(type(date))
    print('Date: ', date)
    date = date.split("T")
    date = date[0]+"T00:00:00.000+00:00"
    print("Source: ", source)
    print("Destination: ", destination)
    print('After Date split: ', date)
    query = opcollection.find({'source': source,
                               'destination': destination,
                               'date': date
                               })
    print(query)
    if query == None:
        return jsonify({"message": "No operators found"}), 200
    # elif query["quantity"] < 1:
    #     return jsonify({'message': 'Requested operator has no tickets available'}), 200
    operator = {}
    i = 0
    for x in query:
        operator[i] = x
        operator[i].pop('_id')
        i += 1
    print("Number of Operators: ", len(operator))
    print("Operators: ", operator)
    if len(operator) < 1:
        return jsonify({"message": "No operators has seats available"}), 200
    return jsonify(operator), 200

# endpoint to get all buses
# !Get all Bus


@app.route("/app/getbuses", methods=["GET", "POST"])
# @jwt_required(fresh=True)
def getAllBuses():
    db = mongo_client['uber_trips']
    bus_operators = db['bus_operators']
    query = bus_operators.find({})
    if query == None:
        return jsonify({"message": "No buses found"}), 200
    buses = {}
    i = 0
    for x in query:
        buses[i] = x
        buses[i].pop('_id')
        i += 1
    print("Bookings: ", buses)
    return jsonify(buses), 200

# endpoint to get all bookings


@app.route("/app/getbookings", methods=["GET", "POST"])
# @jwt_required(fresh=True)
def getAllBookings():
    db = mongo_client['uber_trips']
    busbookings = db['bookings']
    email = request.json['email']
    query = busbookings.find({'email': email})
    if query == None:
        return jsonify({"message": "No bookings found"}), 200
    bookings = {}
    i = 0
    for x in query:
        bookings[i] = x
        bookings[i].pop('_id')
        i += 1
    print("Bookings: ", bookings)
    return jsonify(bookings), 200


@app.route("/app/addbooking", methods=["GET", "POST"])
# @jwt_required(fresh=True)
def addBooking():
    db = mongo_client['uber_trips']
    busbookings = db['bookings']
    email = request.json['email']
    source = request.json['source']
    destination = request.json['destination']
    date = request.json['date']
    date = date.split("T")
    date = date[0]+"T00:00:00.000+00:00"
    operator = request.json['operator']
    x = operator.split('/')
    print(operator)
    print(x[0])
    print(x[1])
    opcollection = db['bus_operators']
    opObj = {'source': source,
             'destination': destination,
             'date': date,
             'name': x[0],
             'bustime': x[1]

             }
    print('Operator')
    print(operator)
    queryOp = opcollection.find_one(opObj)

    if queryOp == None:
        return jsonify({'message': 'Operator not available'}), 200
    elif queryOp["quantity"] < 1:
        return jsonify({'message': 'Requested operator has no tickets available'}), 200
    opQuantity = {"$set": {'quantity': queryOp["quantity"]-1}}

    queryOp = opcollection.update_one(opObj, opQuantity)
    if queryOp == None:
        return jsonify({'message': 'Error in update operator quantity'}), 200

    booking = {'email': email,
               'source': source,
               'destination': destination,
               'date': date,
               'operator': x[0],
               'bustime': x[1],


               }

    query = busbookings.insert_one(booking)
    print("Inserted booking: ", query)
    if query:
        return jsonify({"message": "Booking successfull"}), 200
    else:
        return jsonify({"message": "Error inserting booking"}), 200


# endpoint to register user
@app.route("/app/signup", methods=["GET", "POST"])
def signUp():
    db = mongo_client['uber_trips']
    users = db['users']
    fname = request.json['fname']
    lname = request.json['lname']
    password = request.json['password']
    email = request.json['email']
    # password = encrypt(request.json['password'])
    # print(password)
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                  salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    print("Password: ")
    password = (salt + pwdhash).decode('ascii')
    print(password)
    result = {}
    queryObject = {"email": email}
    user = users.find_one(queryObject)
    if user != None:
        return jsonify({"message": "Email Address already exists. Kindly use a different one"}), 200
    else:
        uber_user = {'fname': fname,
                     'lname': lname,
                     'email': email,
                     'password': password
                     }

        query = users.insert_one(uber_user)
        print("User inserted ", query)

        if query:
            return jsonify({"message": "User added successfully"}), 200
            # return jsonify(access_token=create_access_token(identity=user,fresh=timedelta(minutes=10)),refresh_token=create_refresh_token(identity=user)), 200
        else:
            return jsonify({"message": "Error adding user"}), 400
# endpoint to login


@app.route('/app/signin', methods=["GET", "POST"])
def signIn():
    print('Inside Sign In')
    email = request.json['email']
    password = request.json['password']
    # print(password.encode('ascii'))
    # print(password.encode('utf-8'))
    print('Email: ', email)
    queryObject = {"email": email}
    db = mongo_client['uber_trips']
    users = db['users']
    query = users.find_one(queryObject)

    if query == None:
        return jsonify({'message': 'No user found'}), 200
    else:
        # print(query['password'])
        # checkDBPass = decrypt(query['password'])
        # print('------------')
        # print(checkDBPass,"--------",password)
        print('Inside else of signin')
        salt = query['password'][:64]
        stored_password = query['password'][64:]
        pwdhash = hashlib.pbkdf2_hmac('sha512',
                                      password.encode('utf-8'),
                                      salt.encode('ascii'),
                                      100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')

        print(query)
        if query['email'] != email:
            return jsonify({"message": "Incorrect email address"}), 200
        elif pwdhash != stored_password:
            return jsonify({"message": "Incorrect password"}), 200
        else:
            successmsg = "User logged in successfully"
            loginTrue = 'true'
            fname = query['fname']
            lname = query['lname']
            email = query['email']
            return json.dumps({"message": successmsg, "fname": fname, "email": email, "isLoggedIn": loginTrue, "access_token": create_access_token(identity=email, fresh=timedelta(minutes=10)), "refresh_token": create_refresh_token(identity=email)}), 200
        # else:
        #     loginTrue= 'true'
        #     fname = query['fname']
        #     email = query['email']
        #     return jsonify(message=successmsg,fname=fname,email= email,isLoggedIn= loginTrue, access_token=create_access_token(identity=query['email'],fresh=timedelta(minutes=10)),refresh_token=create_refresh_token(identity=query['email'])), 200

            # Old code
            # return jsonify({"message": "User logged in successfully",
            #                 "fname": query['fname'],
            #                 "lname": query['lname'],
            #                 "email": query['email'],
            #                 "isLoggedIn": 'true'}), 200

# New sign in sign up


# Delete booking of user
@app.route("/app/delete", methods=["GET", "POST"])
# @jwt_required(fresh=True)
def deletebooking():
    db = mongo_client['uber_trips']
    bookings = db['bookings']
    users = db['users']
    email = request.json['email']
    source = request.json['source']
    destination = request.json['destination']
    date = request.json['date']
    operator = request.json['operator']
    bustime = request.json['bustime']

    booking = {'email': email,
               'source': source,
               'destination': destination,
               'date': date,
               'operator': operator,
               'bustime': bustime
               }
    query = bookings.delete_one(booking)
    opcollection = db['bus_operators']
    opObj = {'source': source,
             'destination': destination,
             'date': date,
             'name': operator,
             'bustime': bustime
             }
    queryOp = opcollection.find_one(opObj)

    if queryOp == None:
        return jsonify({'message': 'Operator not found'}), 200

    opQuantity = {"$set": {'quantity': queryOp["quantity"]+1}}
    print("New Quantity: ", opQuantity)
    print("Deleted user: ", query)
    queryOp = opcollection.update_one(opObj, opQuantity)

    if queryOp == None:
        return jsonify({'message': 'Error in update operator quantity'}), 200
    print("Updated quantity: ", queryOp)
    if query:
        return jsonify({"message": "Booking deletion successfully"}), 200
    else:
        return jsonify({"message": "Error deleting booking"}), 400


# delete bus
@app.route("/app/deletebus", methods=["GET", "POST"])
# @jwt_required(fresh=True)
def deletebus():
    db = mongo_client['uber_trips']
    bus_operators = db['bus_operators']
    # users = db['users']
    # email = request.json['email']
    source = request.json['source']
    destination = request.json['destination']
    date = request.json['date']
    operator = request.json['name']
    bustime = request.json['bustime']
    cost = request.json['cost']
    quantity = int(request.json['quantity'])

    bus_details = {
        'source': source,
        'destination': destination,
        'date': date,
        'name': operator,
        'bustime': bustime,
        'cost': cost,
        'quantity': quantity
    }
    query = bus_operators.delete_one(bus_details)
    opcollection = db['bus_operators']
    print("Deleted bus: ", query)

    if query:
        return jsonify({"message": "Bus deletion successfully"}), 200
    else:
        return jsonify({"message": "Error deleting bus"}), 400

# Admin delete booking of a user

# Delete booking of user


@app.route("/app/admindelete", methods=["GET", "POST"])
# @jwt_required(fresh=True)
def admindeletebooking():
    db = mongo_client['uber_trips']
    bookings = db['bookings']
    users = db['users']
    email = request.json['email']
    source = request.json['source']
    destination = request.json['destination']
    date = request.json['date']
    operator = request.json['operator']
    bustime = request.json['bustime']

    booking = {'email': email,
               'source': source,
               'destination': destination,
               'date': date,
               'operator': operator,
               'bustime': bustime
               }
    query = bookings.delete_one(booking)
    opcollection = db['bus_operators']
    opObj = {'source': source,
             'destination': destination,
             'date': date,
             'name': operator,
             'bustime': bustime
             }
    queryOp = opcollection.find_one(opObj)

    if queryOp == None:
        return jsonify({'message': 'Operator not found'}), 200

    opQuantity = {"$set": {'quantity': queryOp["quantity"]+1}}
    print("New Quantity: ", opQuantity)
    print("Deleted user: ", query)
    queryOp = opcollection.update_one(opObj, opQuantity)

    if queryOp == None:
        return jsonify({'message': 'Error in update operator quantity'}), 200
    print("Updated quantity: ", queryOp)
    if query:
        return jsonify({"message": "Booking deletion successfully"}), 200
    else:
        return jsonify({"message": "Error deleting booking"}), 400


# endpoint to get all bookings for all users

@app.route("/app/allbookings", methods=["GET", "POST"])
# @jwt_required(fresh=True)
def getAllUserBookings():
    db = mongo_client['uber_trips']
    allbusbookings = db['bookings']
    # email = request.json['email']
    query = allbusbookings.find({})
    if query == None:
        return jsonify({"message": "No bookings found"}), 200
    bookings = {}
    i = 0
    for x in query:
        bookings[i] = x
        bookings[i].pop('_id')
        i += 1
    print("Bookings: ", bookings)
    return jsonify(bookings), 200


@app.route('/test', methods=["GET"])
def test():
    return "Testing Python backend"


@app.route('/testHealth', methods=["GET"])
def test():
    return "Testing Python backend Health"

##################
# ADMINISTRATION #
##################

# This runs once before the first single request
# Used to bootstrap our collections
# @app.before_first_request
# def before_first_request_func():
#     applyCollectionLevelUpdates()

# # This runs once before any request
# @app.before_request
# def before_request_func():
#     applyRecordLevelUpdates()


############################
# INFO on containerization #
############################

# To containerize a flask app:
# https://pythonise.com/series/learning-flask/building-a-flask-app-with-docker-compose

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
