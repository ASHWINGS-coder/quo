const Post = require('../models/posts');
const User = require('../models/user');
module.exports.home = function(req,res){
    // console.log(req.cookies)
    // res.cookie('user_id',21)

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home',{
                title:"Q&A  ",
                posts:posts,
                all_users:users
            })})
        })
            

    // Post.find({},function(err,post){
    //     return res.render('home',{
    //         title:"Yo",
    //         posts:post
    //     })
    // })
   
}