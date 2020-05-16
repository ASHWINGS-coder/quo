const express = require('express'); // requiring express
const app = express(); // using express
const port = 3000; // initialising port


// use express router
app.use('/',require('./routes'));

// listening to server
app.listen(port,(err) => {
    if(err){
        console.log('Error in running server');
    }
    console.log(`server is running on port ${port}`);
})