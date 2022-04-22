
const sqlite3 = require('sqlite3').verbose();
const path = require('path')

const dbFile = path.resolve(__dirname, 'iswa2010.db')
const db = new sqlite3.Database(dbFile)

db.query = function (sql, params) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.all(sql, params, function (error, rows) {
        if (error)
          reject(error);
        else
          resolve( rows );
      });
    });
  };

  module.exports = { db };
