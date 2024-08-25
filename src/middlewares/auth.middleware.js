export const auth=(req,res,next)=>{
        if(req.session.userEmail){
           next();
        }
        else{
            res.render('404', {
                redirectUrl: '/login',
                timeout: 5000 
            });
           
        }
    
}
