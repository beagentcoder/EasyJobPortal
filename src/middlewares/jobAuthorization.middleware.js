import JobModel from "../models/job.model.js";
export const jobAuthorization = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  console.log("jobAuthorization middleware triggered");

  const job = JobModel.jobById(id);
  
  if (!job) {
      console.log("Job not found");
      return res.status(404).json({ error: "Job not found" });
  }

  if (job.recruiterEmail !== req.session.userEmail) {
      console.log("Unauthorized access");
      return res.status(403).json({ error: "Unauthorized access" });
  }

  console.log("Authorization successful");
  next();
};

export const jobValidation = (req, res, next) => {
  const jobId = parseInt(req.params.id, 10);
     
    const job = JobModel.jobById(jobId);
    if (job.recruiterEmail === req.session.userEmail) {
      res.json({ authorized: true });
    } else {
      res.json({ authorized: false });
    }
   
}