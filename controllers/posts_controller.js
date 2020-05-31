const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try{
       let post = await  Post.create({
            content:req.body.content,
            user:req.user._id
        });

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post:post
                    },
                    message:"Post created"
                })
            }
            return res.redirect('back');
    }catch(err){
        console.log('Error',err);
        return;
    }
}

module.exports.que = function(req,res){
    return res.render('home')
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
    
            await Comment.deleteMany({post:req.body.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post deleted"
                })
            }
            return res.redirect('back')
        }else{
            return res.redirect('back')
        }
    }catch(err){
        console.log('Error',err);
        return;
    }

}