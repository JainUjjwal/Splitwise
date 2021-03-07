var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    method: ["GET", "POST"],
  })
);
app.use(express.json());
const db = mysql.createConnection({
  host: "splitwise.cdastitva5m4.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "rootadmin",
  database: "main",
  multipleStatements: true
});

//app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    // key: "UserID",
    secret: "temporary",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);
//Database connection
db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

app.get("/", function (req, res) {
  //check if user session exits
  if (req.session.user) {
    res.status(99).send({navbar:"navbar"})
    res.render("/dashboard");
  } else res.render("/login");
});

app.get("/nav", function(req, res){
  if (req.session.user) {
    res.status(99).send({navbar:"navbar"})
  }
})
// REGISTER POST
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const Fname = req.body.Fname;
  const num = req.body.phoneNumber;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (username, Fname, phoneNumber) VALUES (?,?,?); INSERT INTO passwordTable(pass) VALUES (?)",
      [username, Fname, num, hash],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.status(202).send({ message: "Sign up successful" });
        }
      }
    );
  });
});
// LOGIN POST
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users INNER JOIN passwordTable ON users.userId = passwordTable.userId WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].pass, (error, response) => {
          if (response) {
            // req.session.user = result;
            // res.status(200).send(result);
            res.cookie("cookie", result[0].Fname, {
              maxAge: 900000,
              httpOnly: false,
              path: "/",
              value: username,
            });
            
            req.session.user = result;
            res.writeHead(200, {
              "Content-Type": "text/plain",
            });
            res.end("Successful Login");
          } else {
            res.status(250).send({
              message: "Username and Password combination incorrect.",
            });
          }
        });
      } else {
        res.status(252).send({ message: "Username and Password combination incorrect." });
      }
    }
  );
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    res.render("/login");
  }
});
//starting server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
