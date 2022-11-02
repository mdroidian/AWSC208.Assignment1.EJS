var express = require("express");
var app = express();
var indexRouter = require("./routes/router");
const { auth } = require('express-openid-connect');
const bodyParser = require("body-parser");

const dotenv = require('dotenv')
dotenv.config({path: '../.env'});

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
  clientSecret: process.env.CLIENTSECRET,
  authorizationParams: {
    response_type: 'code',
    audience: process.env.AUDIENCE,
    scope: 'openid profile email'
  },
  routes: {
    login: false,
  }
};

console.log(process.env.ISSUER);

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use("/", indexRouter);

const mongoose = require('mongoose');
const dbURI = process.env.MONGO_CONNECTION;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(
    process.env.CLIENT_PORT || 3000, () => {
      console.log(`App is running on ${process.env.BASEURL}`);
    }
    )
  )
  .catch((err) => console.log(err));