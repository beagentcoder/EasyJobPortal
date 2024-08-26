import { body,validationResult } from "express-validator";

export const validateRequest =async(req,res,next)=>
{
    const rules =[
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
    ]
    await Promise.all(rules.map((rule)=>rule.run(req)))

    var validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.render('login',{
            errorMessage:validationErrors.array()
        })
    } 
    next();
}

export const validateJob =async(req,res,next)=>{
    const rules=[
        body('jobCategory').notEmpty().withMessage('Job Category is Required'),
        body('jobDesignation').notEmpty().withMessage('Job Designation is Required'),
        body('companyName').notEmpty().withMessage('Company Name is Required'),
        body('jobLocation').notEmpty().withMessage('Job Location is Required'),
        body('salary').notEmpty().withMessage('Salary is Required'),
        body('numberOfOpenings').isFloat({ gt: 0 }).withMessage('Openings Should be Greater than 0'),
    ]
    await Promise.all(rules.map((rule)=>rule.run(req)))

    var validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.render('login',{
            errorMessage:validationErrors.array()
        })
    } 
    next();
}