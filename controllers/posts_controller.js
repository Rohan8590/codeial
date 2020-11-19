const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
   try{
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });

    //determine if request is AJAX reqest. A type of AJAX request is xml http request
    if(req.xhr){
        // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
        post = await post.populate('user', 'name').execPopulate();

        return res.status(200).json({
            data: {
                post: post
            },
            message: "Post created!"
        });
    } 

    req.flash('success', 'Post created successfully');
    return res.redirect('back');
   }
   catch(err){
    req.flash('error', err);
    // added this to view the error on console as well
    console.log(err);
    return res.redirect('back');
   }
    
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        //id means conerting the object id(_id) to string automatically
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted successfully"
                })
            }

            req.flash('success', 'Post and it\'s comments deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'You are not authorised to delete this post');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}