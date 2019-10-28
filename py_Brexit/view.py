import couchdb
import os
import re


view_ops = {
    "Ops2019": {
      "map": "function (doc) {\n  if (doc.year_2019 == -1){\n    emit(doc._id, {location: doc.location, latitude: doc.latitude, longitude:doc.longitude});\n    }\n}\n"
    },
    "Ops2018": {
      "map": "function (doc) {\n  if (doc.year_2018 == -1){\n    emit(doc._id, {location: doc.location, latitude: doc.latitude, longitude:doc.longitude});\n    }\n}"
    },
    "Ops2017": {
      "map": "function (doc) {\n  if (doc.year_2017 == -1){\n    emit(doc._id, {location: doc.location, latitude: doc.latitude, longitude:doc.longitude});\n    }\n}"
    },
    "Ops2016": {
      "map": "function (doc) {\n  if (doc.year_2016 == -1){\n    emit(doc._id, {location: doc.location, latitude: doc.latitude, longitude:doc.longitude});\n    }\n}"
    }
}


view_sup = {
   "Sup2019": {
      "map": "function (doc) { if (doc.year_2019 == 1) {\n    emit(doc._id, {location: doc.location, latitude: doc.latitude, longitude:doc.longitude});\n  }\n}"
    },
    "Sup2018": {
      "map": "function (doc) {\n  if (doc.year_2018 == 1){\n    emit(doc._id, {location: doc.location, latitude: doc.latitude, longitude:doc.longitude});\n    }\n}"
    },
    "Sup2017": {
      "map": "function (doc) {\n  if (doc.year_2017 == 1){\n    emit(doc._id, {location: doc.location, latitude: doc.latitude, longitude:doc.longitude});\n    }\n}"
    },
    "Sup2016": {
      "map": "function (doc) {\n  if (doc.year_2016 == 1){\n    emit(doc._id, {location: doc.location, latitude: doc.latitude, longitude:doc.longitude});\n    }\n}"
    }
  }


def create_view (db, design_name,  view):


    # Design Doc
    design_doc = {
        '_id': '_design/'+design_name,
        'views':  view,
        "language": "javascript"
    }
 

    try:
        db.save(design_doc)
        print("first time to creata views")
    except couchdb.http.ResourceConflict:
        design = db["_design/"+design_name]
        db.delete(design)
        db.save(design_doc)
        print("delete old views, create new views")





if __name__ == "__main__":
    user = "your account"
    password = "your password"
    couchserver = couchdb.Server("http://%s:%s@localhost:5984/" % (user, password))
    processed_db = couchserver["testdb"]
    create_view(processed_db, "Support", view_sup)
    create_view(processed_db, "Oppose", view_ops)


