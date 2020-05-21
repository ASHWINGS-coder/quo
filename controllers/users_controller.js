const User = require('../models/user'); // import user model

module.exports.profile = function(req,res){
        return res.render('user_profile', {
            title: 'User Profile',
        });
}
// render signup 
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
      return  res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"sign up"
    })
}

// render signin 
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"sign in"
    })
}

// get the signup data 
module.exports.create =  function(req,res){
  if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
  }

  User.findOne({email:req.body.email},function(err,user){
      if(err){
          console.log('error in finding user in signing up');
          return;
      }

      if(!user){
          User.create(req.body,function(err,user){
            if(err){
                console.log('error in creating user in signing up');
                return;
            }
            return res.redirect('/users/sign-in');
          })
      }else{
          return res.redirect('back');
      }
  })

}

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/users/profile');
}