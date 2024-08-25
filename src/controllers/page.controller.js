import { name } from "ejs";
import JobModel from "../models/job.model.js";

import nodemailer from 'nodemailer'

class PageController {
  landing(req, res) {
    res.render("index", {
      userEmail: req.session.userEmail,
      name: req.session.name,
    });
  }
  jobs(req, res) {
    let jobs = JobModel.getJobs();
    res.render("jobsListing", {
      jobs,
      errorMessage: null,
      userEmail: req.session.userEmail,
      name: req.session.name,
    });
  }
  getJobDetails(req, res, next) {
    const id = parseInt(req.params.id, 10);
    const job = JobModel.jobById(id);

    if (!job) {
      return res.status(404).send("Job not found");
    } else {
      res.render("jobDetails", {
        job,
        userEmail: req.session.userEmail,
        name: req.session.name,
      });
    }
  }
  getApplicants(req, res, next) {
    const id = parseInt(req.params.id);
    const applicants = JobModel.getApplicants(id);
    res.render("applicantList", {
      applicants,
      userEmail: req.session.userEmail,
      name: req.session.name,
    });
  }
  applyForJob(req, res, next) {
    const { name, email, contact } = req.body;
    const id = parseInt(req.params.id);
    const resumePath = "/uploads/" + req.file.filename;
    JobModel.addApplicant(id, name, email, contact, resumePath);

    const transporter = nodemailer.createTransport({
      service: "Gmail", // Replace with your email service
      auth: {
        user: "codingninjas2k16@gmail.com",
        pass: "slwvvlczduktvhdj",
      },
    });

    const mailOptions = {
      from: "codingninjas2k16@gmail.com",
      to: email, // Applicant's email address
      subject: "Job Application Confirmation",
      text: `Hello ${name},\n\nThank you for applying for the job. We have received your application and will review it soon.\n\nBest regards,\nEasily`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    res.send(`
        <h1 style="position:relative;top:45%;left:35%">Application submitted successfully!</h1>
        <p style="position:relative;top:50%;left:40%">Redirecting to the jobs page in <span style="position:relative;top:50%;" id="countdown">5</span> seconds...</p>
        <script>
            var countdown = 5;
            var countdownElement = document.getElementById('countdown');

            var interval = setInterval(function() {
                countdown--;
                countdownElement.textContent = countdown;

                if (countdown <= 0) {
                    clearInterval(interval);
                    window.location.href = '/jobs';
                }
            }, 1000);
        </script>
    `);
  }
  showLogin(req, res, next) {
    res.render("login", {
      userEmail: req.session.userEmail,
      name: req.session.name,
    });
  }
  postNewJob(req, res) {
    res.render("newJob", {
      userEmail: req.session.userEmail,
      name: req.session.name,
    });
  }
  addNewJob(req, res) {
    const {
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      numberOfOpenings,
      skillsRequired,
      applyBy,
    } = req.body;
    JobModel.createJob(
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      numberOfOpenings,
      skillsRequired,
      applyBy
    );
    res.send(`
            
      <script>
          alert('Job Created Successfully')
          window.location.href = '/jobs';
      </script>
  `);
  }
  showUpdateJob(req, res) {
    const id = parseInt(req.params.id);
    const job = JobModel.jobById(id);
    if (!job) {
      return res.status(404).send("Job not found");
  }
    res.render("updateJob", {
      job,
      userEmail: req.session.userEmail,
      name: req.session.name,
    });
  }
  updateJob(req, res) {
    const id = parseInt(req.params.id);
    JobModel.updateJob(req.body, id);
    res.redirect(`/jobs/${id}`);
  }
  deleteJob(req, res) {
    console;
    const id = parseInt(req.params.id);
    const jobFound = JobModel.jobById(id);
    if (!jobFound) {
      return res.status(401).send("Job Not Found");
    } else {
      JobModel.delete(id);
      res.redirect("/jobs");
    }
  }

  search(req,res){
    const searchQuery = req.body.search;
    const jobs = JobModel.searchJobs(searchQuery);

    
    if (jobs.length === 0) {
      res.send(`
        <h1 style="position:relative;top:45%;left:35%">No Matching Jobs Found</h1>
        <p style="position:relative;top:50%;left:35%">Redirecting to All Jobs page in <span style="position:relative;top:50%;" id="countdown">5</span> seconds...</p>
        <script>
            var countdown = 5;
            var countdownElement = document.getElementById('countdown');

            var interval = setInterval(function() {
                countdown--;
                countdownElement.textContent = countdown;

                if (countdown <= 0) {
                    clearInterval(interval);
                    window.location.href = '/jobs';
                }
            }, 1000);
        </script>
    `);

    } else {
      res.render("jobsListing", {
        jobs:jobs,
        errorMessage: null,
        userEmail: req.session.userEmail,
        name: req.session.name,
      });
      
    }
    

  }
}

export default PageController;
