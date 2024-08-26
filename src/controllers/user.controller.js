import { name } from "ejs";
import UserModal from "../models/user.model.js";

export default class UserController{
     postRegister(req,res){
        const {name, email, password} = req.body;
        UserModal.add(name,email,password)
        res.redirect('/login')

     }

     postLogin(req,res){
        const {email, password} = req.body;
        const user=UserModal.isValidUser(email, password)
        if(!user){
          res.render("login", { errorMessage: "Invalid Credentials" });
          
        }
        else {
            req.session.name=user.name.toUpperCase()
            req.session.userEmail=user.email.toLowerCase();
            // console.log(req.session.userEmail)
            res.redirect('/jobs')
        }
       
     }

     logout(req, res) {
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/");
          }
        });
      }

}