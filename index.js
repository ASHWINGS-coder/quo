const express = require('express'); // requiring express
const cookieParser = require('cookie-parser');// using cookie parser
const app = express(); // using express
const port = 8000; // initialising port
const expressLayouts = require('express-ejs-layouts');//importing ejs libaray
const db = require('./config/mongoose'); // connecting db
// used for session cookie 
const session = require('express-session'); // using expression session
const passport = require('passport'); // using passport
// importing local strategy
const passportLocal = require('./config/passport-local-strategy');
 // importing connect-mongo to store session cookies
const MongoStore = require('connect-mongo')(session);
// import saas middle-ware
const sassMiddleware = require('node-sass-middleware');
// using saas middle-ware
app.use(sassMiddleware({
        src:'./assets/scss',
        dest:'./assets/css',
        debug:true,
        outputStyle:'extended',
        prefix: '/css'
}));

app.use(express.urlencoded()); // using url encoded
app.use(cookieParser()); // using cookie-parser
app.use(express.static('./assets'));// setting up static files

app.use(expressLayouts);// using expresslayouts
// extract styles and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the  view engine
app.set('view engine','ejs');
app.set('views','./views');

// using express session (stored in session const)
// monogostore is used to store the session cookie in db
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        console.log(err || 'connect mongo db set up')
    })
}));
 // saying app to use passport initialse is a function 
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes'));

// listening to server
app.listen(port,(err) => {
    if(err){
        console.log('Error in running server');
    }
    console.log(`server is running on port ${port}`);
})