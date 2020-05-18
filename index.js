const express = require('express'); // requiring express
const app = express(); // using express
const port = 3000; // initialising port
const expressLayouts = require('express-ejs-layouts');//importing ejs libaray
const db = require('./config/mongoose'); // connecting db

app.use(express.static('./assets'));// setting up static files

app.use(expressLayouts);// using expresslayouts
// extract styles and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the  view engine
app.set('view engine','ejs');
app.set('views','./views');

// use express router
app.use('/',require('./routes'));

// listening to server
app.listen(port,(err) => {
    if(err){
        console.log('Error in running server');
    }
    console.log(`server is running on port ${port}`);
})