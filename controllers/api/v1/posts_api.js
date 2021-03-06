const Post = require('../../../models/posts')
const Comment = require('../../../models/comment')
module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    return res.json(200,{
        message:"List Of Posts",
        posts:posts
    })
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
    
            await Comment.deleteMany({post:req.body.id});

            return res.json(200,{
                message:"Posts and Associated comments deleted successfully"
            })
        }else{
            return res.json(401,{
                message:"can not del the post"
            })
        }
    }catch(err){
        console.log("************",err)
        return res.json(500,{
            message:"Internal Server Error"
        });
    }

}