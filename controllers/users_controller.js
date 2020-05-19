module.exports.profile = function(req,res){
    res.render('user_profile',{
        title:"profile"
    });
}
// render signup 
module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title:"sign up"
    })
}

// render signup 
module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title:"sign in"
    })
}

// get the signup data 
module.exports.create =  function(req,res){
    // todo later
}

// sign in and create a session for the user
module.exports.createSession = function(req,res){

}