async function admin(req,res,next){

    if(req.user.role != "Admin") return res.status(403).send("User Not Authorized");
    next()

}
module.exports = admin;