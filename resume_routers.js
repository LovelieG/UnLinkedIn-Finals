const express=require('express')
const resumeController=require('../controllers/resume_controller')

const resumeRouter= express.Router()
resumeRouter.post('/create',resumeController.createResume)
resumeRouter.get('/view/all',resumeController.viewAllResumes)
resumeRouter.put('/update/:id',resumeController.updateResume)
resumeRouter.delete('/delete/:id',resumeController.deleteResume)
resumeRouter.get('/login',resumeController.loginUser)
resumeRouter.get('/view/company/:company',resumeController.viewCompany)
resumeRouter.get('/view/applied-job/:appliedjob',resumeController.viewAppliedJob)
resumeRouter.get('/view/job-type/:typeofjob',resumeController.viewTypeOfJob)
resumeRouter.get('/view/job/company/:company_job',resumeController.viewJobByCompany)
module.exports=resumeRouter