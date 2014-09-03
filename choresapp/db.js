var debug = require('debug')('choresapp');
var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");
var connection;

module.exports = {
  getConnection: function (){
    return connection;
  },
  createConnection: function (){
    // Check for database, create if does not exist.
    debug('Checking if database exists, create it if not.')
    connection = new sqlite3.Database("store.sqlite");
    fs.exists("store.qslite", function(exists){
      connection.serialize(function() {
        if(!exists) {
          connection.run("CREATE TABLE User (Id	TEXT,Name	TEXT,Groups	TEXT,PRIMARY KEY(Id))");
          connection.run("CREATE TABLE Chore (Id	TEXT,Name	TEXT,Description	TEXT, Points INTEGER,PRIMARY KEY(Id))");
          connection.run("CREATE TABLE CompletedChores (Id	TEXT, User TEXT,DateCompleted	TEXT,PRIMARY KEY(Id))");
        }
      });
    });
  }
};
