const verifyAdmin =(req,res,next)=>{

    if(req.role !=='admin'){
        return res.status(403).send({success:false ,message:"your are not authorized to preform this action"})
    }
    next();
}
module.exports = verifyAdmin