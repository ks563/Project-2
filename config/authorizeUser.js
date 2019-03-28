function authorzieUser(req,res,next){
    if(req.isAuthenticated())
    {
        next()
    }
    else
    {
        res.redirect("../public/html/login.html");
    }

}
module.exports = authorzieUser;