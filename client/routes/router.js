var express = require("express");
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios');
const controller = require('../controller/controller');

router.get('/', controller.index);
router.get('/contact', controller.contact);

// trigger the endoint, and call the middleware, if the user is logged in or not
router.get('/secured', requiresAuth(), controller.secured);

module.exports = router;