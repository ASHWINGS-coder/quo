const Post = require('../models/posts');

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
            return res.render('home',{
                title:"Yo",
                posts:posts
            })})

    // Post.find({},function(err,post){
    //     return res.render('home',{
    //         title:"Yo",
    //         posts:post
    //     })
    // })
   
}