//We are including mysql2 library.
const mysql = require("mysql2");
//Create pool connection. The pool specific settings are
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "westsidenode",
  password: "keerthankumar",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = pool;
