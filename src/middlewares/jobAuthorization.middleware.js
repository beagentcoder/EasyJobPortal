import JobModel from "../models/job.model.js";

export const jobAuthorization = (req, res, next) => {
  const id = parseInt(req.params.id);
  const job = JobModel.jobById(id);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
   if(job.recruiterEmail !== req.session.userEmail)
   {
    return res.status(403).json({ error: "Unauthorized access" });
   }
   next();
};
