var express = require("express");
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios');
const controller = require('../controller/controller');

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', controller.index);
router.get('/contact', controller.contact);
router.get('/loggedin', controller.logginedin);
router.get('/login', requiresAuth(), controller.login);
router.get('/posts', controller.blog_index);
router.get('/submit/update/:id', controller.edit_post);
// router.get('/posts', controller.show_posts);

router.post('/submit', urlencodedParser, controller.create_blog_post);
router.post('/submit/update/:id', urlencodedParser, controller.update_post);

// trigger the endoint, and call the middleware, if the user is logged in or not
router.get('/secured', requiresAuth(), controller.secured);
router.get('/admin', requiresAuth(), controller.admin);
router.get('/not_admin', controller.not_admin);

module.exports = router;