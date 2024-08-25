import express from 'express'
import path from 'path'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import PageController from './src/controllers/page.controller.js'
import UserController from './src/controllers/user.controller.js'
import { uploadFile } from './src/middlewares/fileUploadMiddleware.js'
import { auth } from './src/middlewares/auth.middleware.js'
import { logincheck } from './src/middlewares/redirect.middleware.js'
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js'
import { jobAuthorization } from './src/middlewares/jobAuthorization.middleware.js'
const app = express()
const port =3000
const pageController= new PageController
const userController =new UserController

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views',path.join(path.resolve(),"src","views"))
app.use(express.static('/src/views'))
app.use(express.static("public"));
app.use(expressLayouts)

app.use(session({
    secret: 'easily-tough-site',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(cookieParser())
app.use(setLastVisit)

app.get('/',logincheck,pageController.landing)
app.get("/landing",pageController.landing)
app.get('/login',pageController.showLogin)
app.post('/login',userController.postLogin)
app.post('/register',userController.postRegister)
app.get('/jobs',pageController.jobs)
app.get('/jobs/:id',pageController.getJobDetails)
app.get('/jobs/applicants/:id',auth,pageController.getApplicants)
app.post('/apply/:id',uploadFile.single('resume'),pageController.applyForJob)
app.get('/postjob',auth,pageController.postNewJob)
app.post('/postjob',auth,pageController.addNewJob)
app.get('/job/update/:id',auth,jobAuthorization,pageController.showUpdateJob)
app.post('/job/update/:id',auth,pageController.updateJob)
app.post('/delete/:id',auth,jobAuthorization,pageController.deleteJob)
app.get('/logout',userController.logout)
app.post('/search',pageController.search)
app.listen(port, () => console.log(` listening on port ${port}!`));