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
           return  res.send(`
            
                <script>
                    alert('Inavalid Creds')
                    window.location.href = '/login';
                    // setTimeout(function() {
                    //     window.location.href = '/login';
                    // }, 100); // Redirect after .5 seconds     if instead of alert any msg u want to show
                </script>
            `);
        }
        else {
            req.session.name=user.name.toUpperCase()
            req.session.userEmail=email;
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