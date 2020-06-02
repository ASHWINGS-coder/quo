const User = require('../models/user'); // import user model
const fs = require('fs');
const path = require('path');   

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        });
    })
}

module.exports.update = async (req,res) => {
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     })
    // }else{
    //    return res.status(401).send('Unauthorised');
    // }

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******Multer Error:',err)
                }
              user.name = req.body.name;
              user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname , '..' ,user.avatar))
                    }

                   user.avatar = User.avatarPath + "/" + req.file.filename
                }
                user.save();
                return res.redirect('back');    
            })
        }catch{
            return  res.redirect('back');
        }
    }else{
        return res.status(401).send('Unauthorised');
    }
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
    req.flash('success','Logged in')
    return res.redirect('/');
}

// sign out 
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','Logged out')
    return res.redirect('/');
}