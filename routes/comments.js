const express = require('express');
const router = express.Router();
//to check if user is signed in, only then he can send the post content to /create
const passport = require('passport');
const { checkAuthentication } = require('../config/passport-local-strategy');

const commentsController = require('../controllers/comments_controller');

//checkAuthentication is a function we created in passport-local-startegy in config
router.post('/create', passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports = router;