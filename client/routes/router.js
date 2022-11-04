var express = require("express");
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios');
const blogController = require('../controller/blogController');
const indexController = require('../controller/indexController');

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', indexController.index);
router.get('/contact', indexController.contact);
router.get('/loggedin', indexController.logginedin);
router.get('/login', requiresAuth(), indexController.login);
router.get('/posts', blogController.blog_index);
router.get('/submit/update/:id', blogController.edit_post);
// router.get('/posts', controller.show_posts);

router.post('/submit', urlencodedParser, blogController.create_blog_post);
router.post('/submit/update/:id', urlencodedParser, blogController.update_post);

// trigger the endoint, and call the middleware, if the user is logged in or not
router.get('/secured', requiresAuth(), indexController.secured);
router.get('/admin', requiresAuth(), indexController.admin);
router.get('/not_admin', indexController.not_admin);

module.exports = router;