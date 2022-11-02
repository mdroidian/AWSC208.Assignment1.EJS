var express = require("express");
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios');
const controller = require('../controller/controller');

const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', controller.index);
router.get('/contact', controller.contact);
router.get('/loggedin', controller.logginedin);
router.get('/login', requiresAuth(), controller.login);
router.post('/submit', urlencodedParser, controller.create_blog_post);

// trigger the endoint, and call the middleware, if the user is logged in or not
router.get('/secured', requiresAuth(), controller.secured);
router.get('/admin', requiresAuth(), controller.admin);
router.get('/not_admin', controller.not_admin);

module.exports = router;