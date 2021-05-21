var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fileUpload = require("express-fileupload");
// const db = require('./dbconnection');
// app.set("view engine", "ejs");
// const initDb = require("./mongoutil").initDb;
const mongoose = require("mongoose");
const passport = require("passport");
const { ApolloServer, gql } = require("apollo-server-express");
const {typeDefs} = require("./GraphQL/typeDefs")
const {resolvers} = require('./GraphQL/resolvers') 

const graphQL_server = new ApolloServer({typeDefs, resolvers});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    method: ["GET", "POST"],
  })
);

app.use(fileUpload());

//app.use(cookieParser);
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

// initDb((err)=>{

// app.get("/", function (req, res) {
//   //check if user session exits
//   console.log('here');
//   console.log(req.session.user);
//   if (req.session.user) {
//     res.render("/dashboard");
//   } else res.render("/login");
// });

require("./passportconfig")(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// User Route
const userRoute = require("./routes/UserRoutes");
app.use(userRoute);

// dashboard route
const dashboardRoute = require("./routes/DashboardRoute");
app.use(dashboardRoute);

// My Groups route
const myGroupsRoute = require("./routes/MyGroupsRoute");
app.use(myGroupsRoute);

//single Group Page route
const groupPageRoute = require("./routes/GroupPageRoute");
app.use(groupPageRoute);

//transacton history page route
const HistoryPageRoute = require("./routes/HistoryPageRoute");
app.use(HistoryPageRoute);

//Profile Page Route
const ProfileRoute = require("./routes/ProfileRoute");
app.use(ProfileRoute);

//Create Group Route
const CreateGroupRoute = require("./routes/CreateGroupRoute");
app.use(CreateGroupRoute);

//starting server on port 3001
const uri =
  "mongodb+srv://admin:rootadmin@splitdb.6smji.mongodb.net/Splitwise?retryWrites=true&w=majority";
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};
graphQL_server.start();
graphQL_server.applyMiddleware({ app });
mongoose.connect(uri, options).then(() => {
  app.listen(3010);
  console.log("Server Listening on port 3010");
  console.log(`🚀 Server ready at http://localhost:3010${graphQL_server.graphqlPath}`)
  // graphQL_server.listen(4000).then(({url})=> console.log(`GQL server running on ${url}`))
});

mongoose.set("useFindAndModify", false);
// })
