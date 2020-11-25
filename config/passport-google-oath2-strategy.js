const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID: '1051730985045-hl5ebiio089vi2l1plv2knhq3oeo2oob.apps.googleusercontent.com',
    clientSecret: 'jNcLw0ANjzJv5Olm8Ar-wiYv',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google strategy passport', err); return; }

            if(user){
                //if found, set this user as req.user (ie. sign in the users)
                return done(null, user);
            }
            else{
                //if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('error in creating user google strategy passport', err); return; }
                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;

