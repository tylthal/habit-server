import MongoDB = require('mongodb');

export class db {
  //TODO: move the mongo url to a settings json file
  url: string = 'mongodb://localhost:27017/habit-tracker';
  mongoClient: MongoDB.MongoClient = new MongoDB.MongoClient();
  db: MongoDB.Db;

  constructor() {
    this.connect();
  }

  connect() {
    var self = this;
    this.mongoClient.connect(this.url, function(err, db) {
      if(err) {
        console.log(err);
      } else {
        console.log("Connected successfully to the database.");
        self.db = db;
      }
    });
  }

  // this is really just to ensure that all of the users are stored in our database
  // as they have already been validated by the identity provider at this point
  verifyUserInDb(user: any, callback: Function) {
    var users = this.db.collection('users');
    // check if the user is in the database
    users.find({"_id": user.user_id}).toArray(function(err, docs) {
      if(err) {
        return false;
      } else if(docs && docs.length > 0) {
        callback(true);
      } else {
        // insert the user in our database
        var newUser = {"_id": user.user_id, "email": user.email, "name": user.display_name, "verified": user.verified};
        users.insertOne(newUser, function(results: any) {
          callback(results.acknowledged);
        });
      }
    });
  }

  getCategories(user_id: string, callback: Function) {
    var categories = this.db.collection('categories');
    categories.find({"user_id": user_id}).toArray(function(err, docs) {
      if(err) {
        console.log(err.message);
        callback(undefined);
      } else {
        callback(docs);
      }
    });
  }

  addCategory(user_id: string, name: string, description: string, callback: Function) {
    var categories = this.db.collection('categories');
    categories.insertOne({"user_id": user_id, "name":name,"description":description}, function(err, result) {
      if(err) {
        console.log(err.message);
        callback(err, undefined);
      } else {
        callback(undefined, result.insertedId);
      }
    });
  }
}
