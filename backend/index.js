var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require('./dbconnection');
// app.set("view engine", "ejs");



app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    method: ["GET", "POST"],
  })
);

//app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    // key: "UserID",
    secret: "temporary",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 30 * 100, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 60 * 60 * 100,
  })
);
app.use(express.json());

app.get("/", function (req, res) {
  //check if user session exits
  console.log('here');
  console.log(req.session.user);  
  if (req.session.user) {
    res.render("/dashboard");
  } else res.render("/login");
});

// User Route
const userRoute = require('./routes/userRoutes'); 
app.use(userRoute);

// dashboard route
const dashboardRoute = require('./routes/dashboardRoute');
app.use(dashboardRoute);


//starting server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
