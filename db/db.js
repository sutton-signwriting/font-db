
const sqlite3 = require('sqlite3').verbose();
const path = require('path')

const dbFile = path.resolve(__dirname, 'iswa2010.db')
const db = new sqlite3.Database(dbFile)

module.exports = { db };
