module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: "user profile"
    });
}

//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    })
}

//render the sign in page
module.exports.signIn =  function(req,res){
    return res.render('user_sign_in',{
        title: 'Codeial | Sign in'
    })
}

//get the sign up data
module.exports.create = function(req,res){
    //TO DO
}

//Sign in and create a session for the user
module.exports.createSession = function(req,res){
    //TO DO
}