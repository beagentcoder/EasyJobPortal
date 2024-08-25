export const logincheck=(req,res,next)=>{
    if(req.session.userEmail){
       res.redirect('/jobs')
    }
    else{
        
        next()
       
    }

}
