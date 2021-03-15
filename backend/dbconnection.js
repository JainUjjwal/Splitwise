const mysql = require('mysql');

const dbconfig={
    host: "splitwise.cdastitva5m4.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "rootadmin",
    database: "split",
    multipleStatements: true
  }

  const db = mysql.createConnection(dbconfig);
// Database connection
db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});


module.exports = db;