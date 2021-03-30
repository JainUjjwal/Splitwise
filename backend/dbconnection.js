const mysql = require('mysql');

const dbconfig={
    host: "splitwise.cdastitva5m4.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "rootadmin",
    database: "split",
    multipleStatements: true,
    connectionLimit: 10
  }

  const db = mysql.createConnection(dbconfig);
// Database connection
db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

var dbpool = mysql.createPool(
  dbconfig
);

// Attempt to catch disconnects 
dbpool.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});
module.exports = db;