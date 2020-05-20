const passport = require('passport'); // using passport libraray
const LocalStrategy = require('passport-local').Strategy; // using passport local strtaegy
const User = require('../models/user'); // import user

// authentication using passport
passport.use(new LocalStrategy({
        usernameField:'email'
    },
    function(email,password,done){
        // find user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.lof('error in finding user --> passport');
                return done(err);
            }

            if(!user || user.password == password){
                console.lof('invalid username password');
                return done(null,false);
            }

            return done(null,user);
        })
    }
));

// serializing the user to decised which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// deserialzing the user from the key in cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.lof('error in finding user --> passport');
            return done(err);
        }
        return done(null,user);
    })
});

module.exports = passport;