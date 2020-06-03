const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto =  require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID:"482470470986-cqjnntc0ir1pona59odpgsf8nud5be8b.apps.googleusercontent.com",
    clientSecret:"JXEpjFvRemmv4h4Z2HW2HiIV",
    callbackURL:"http://localhost:3000/users/auth/google/callback",
    },

    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google startaegy passport',err);
                return
            }
            console.log(profile);
            if(user){
                return done(null,user)
            }else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('Error in creating google startaegy passport',err);
                        return
                    } 
                    return done(null,user);
                })
            }
        })
    }

));

module.exports = passport;