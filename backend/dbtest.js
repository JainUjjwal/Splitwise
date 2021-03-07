const mysql = require('mysql');

const con = mysql.createConnection({
    host: "splitwise.cdastitva5m4.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "rootadmin"
});

con.connect(function(err) {
    if (err) throw err;
    con.query('CREATE DATABASE IF NOT EXISTS main;');
    con.query('USE main;');
    con.query('CREATE TABLE IF NOT EXISTS users(userId int NOT NULL AUTO_INCREMENT, username varchar(255), phoneNumber int, PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
    con.end();
});