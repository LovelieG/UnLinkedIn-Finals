const express=require('express')
const jobController=require('../controllers/job_controllers')

const jobRouter=express.Router()
jobRouter.post('/create',jobController.createJob)
jobRouter.get('/view/all',jobController.viewAllJobs)
jobRouter.put('/update/:id',jobController.updateJobListing)
jobRouter.delete('/delete/:id',jobController.deleteJobListing)

module.exports=jobRouter