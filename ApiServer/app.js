// this application is made to make sure, every call is secured....how we can make it secured???.....
// to make sure, every call has a valid token
// In this application, we will check is the token is valid
// after varification, we will give access to a user

const express = require('express');
const app  = express();
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const dotenv = require('dotenv')
dotenv.config({path: '../.env'});

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // jwksUri: `'${process.env.ISSUER}.well-known/jwks.json'`
        // jwksUri: jwksUri
        jwksUri: process.env.JWKSURI
  }),
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: ['RS256']
});


app.get('/public', (req, res) => {
    res.json({
        type: "public"
    })
})

// jwt middleware checking if the request has a valid token
app.get('/private', jwtCheck, (req, res) => {
    res.json({
        type: "private"
    })
})

app.listen(5000);