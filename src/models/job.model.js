export default class JobModel {
  constructor(
    id,
    jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    numberOfOpenings,
    skillsRequired,
    applyBy,
    jobPosted,
    recruiterEmail,
    applicants = []
  ) {
    this.id = id;
    this.jobCategory = jobCategory;
    this.jobDesignation = jobDesignation;
    this.jobLocation = jobLocation;
    this.companyName = companyName;
    this.salary = salary;
    this.applyBy = applyBy;
    this.skillsRequired = skillsRequired;
    this.numberOfOpenings = numberOfOpenings;
    this.jobPosted = jobPosted;
    this.recruiterEmail = recruiterEmail;
    this.applicants = applicants;
  }
  static getJobs() {
    return jobs;
  }
  static jobById(id) {
    let job = jobs.find((job) => job.id === id);
    return job;
  }
  static getApplicants(id) {
    return jobs.find((job) => job.id === id)?.applicants || [];
  }
  static addApplicant(id, name, email, contact, resumePath) {
    let job = this.jobById(id);
    if (job) {
      const applicant = {
        applicantid: job.applicants.length + 1,
        name,
        email,
        contact,
        resumePath,
      };
      job.applicants.push(applicant);
    } else {
      console.log("Job not found");
    }
  }
  static createJob(
    jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    numberOfOpenings,
    skillsRequired,
    applyBy,recruiterEmail
  ) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

    const newJob = new JobModel(
      jobs.length + 1,
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      numberOfOpenings,
      skillsRequired,
      applyBy,
      formattedDate,
      recruiterEmail,
      []
    );
    jobs.push(newJob);
  }
  static updateJob(jobObj, jobId) {
    const index = jobs.findIndex((j) => j.id === jobId);

    if (index !== -1) {
      const existingJob = jobs[index];
      const updatedJob = { ...existingJob, ...jobObj };
      jobs[index] = updatedJob;
      console.log("Job updated successfully:", updatedJob);
    } else {
      console.log("Job not found with id:", jobId);
    }
  }
  static delete(id){
    const index = jobs.findIndex((j) => j.id === id);
    if (index!== -1) {
      jobs.splice(index, 1);
      console.log("Job deleted successfully with id:", id);
    } else {
      console.log("Job not found with id:", id);
    }
  }

  static searchJobs(name){
    name=name.toLowerCase()
    const data=jobs.filter((job)=>{
      if(name ==job.jobCategory.toLowerCase() || name ==job.jobDesignation.toLowerCase() ||name == job.jobLocation.toLowerCase() ||name==job.companyName.toLowerCase()){
        return job;
      }
    })
    return data;
  }
}

let jobs = [
  {
    id: 1,
    jobCategory: "Tech",
    jobDesignation: "SDE",
    jobLocation: "Gurgaon HR IND Remote",
    companyName: "Coding Ninjas",
    salary: 14,
    applyBy: "2022-12-31",
    skillsRequired: ["JavaScript", "React", "Node.js"],
    numberOfOpenings: 1,
    jobPosted: "2022-01-01",
    recruiterEmail:"abc@gmail.com",
    applicants: [
      {
        applicantid: 1,
        name: "John Doe",
        email: "abc@gmail.com",
        contact: 1234567890,
        resumePath:
          "https://inspireonline.in/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-1__en-IN.jpg?v=1694605206&width=1445",
      },
    ],
  },
  {
    id: 2,
    jobCategory: "tech",
    jobDesignation: "Angular Developer",
    jobLocation: "Pune IND On-Site",
    companyName: "Go Digit",
    salary: 10,
    applyBy: "2022-11-30",
    skillsRequired: ["HTML", "CSS", "JavaScript"],
    numberOfOpenings: 2,
    jobPosted: "2022-02-01",
    recruiterEmail:"krvivi28@gmail.com",
    applicants: [],
  },
  {
    id: 3,
    jobCategory: "Tech",
    jobDesignation: "SDE",
    jobLocation: "Bangalore IND",
    companyName: "Juspay",
    salary: 15,
    applyBy: "2022-10-31",
    skillsRequired: ["React", "NodeJs", "Python", "Django", "Flask"],
    numberOfOpenings: 3,
    jobPosted: "2022-03-01",
    applicants: [],
  },
];
