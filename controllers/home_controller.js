const Post = require('../models/posts');
const User = require('../models/user');
module.exports.home = async function(req,res){
    // console.log(req.cookies)
    // res.cookie('user_id',21)
    try{
            let posts = await Post.find({})
            .populate('user')
            .populate({
                path:'comments',
                populate:{
                    path: 'user'
                }
            })
        let users = await  User.find({});
        return res.render('home',{
            title:"Q&A  ",
            posts:posts,
            all_users:users
        });
    }catch(err){
        console.log("Error",err);
        return ;
    }


    // Post.find({},function(err,post){
    //     return res.render('home',{
    //         title:"Yo",
    //         posts:post
    //     })
    // })
   
}