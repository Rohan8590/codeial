const { serializeUser, deserializeUser } = require('passport');
const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const USer = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email,password,done){
        //find a user and establish identity
        User.findOne({email:email}, function(err,user){
            if(err){
                console.log('Error in finding user ---> Passport');
                return done(err);
            }
            if(!user || user.password!= password){
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

//serializing the user to decide what key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding the user ---> Passport');
            return done(err);
        }
        return done(null,user);
    });
});

//check if user is authenticated (this function is used as a middleware)
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        //if user is signed in, pass on the request to the next function(controller's action)
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user conatins the current signed in user from the session cookie, we're just sending it to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport