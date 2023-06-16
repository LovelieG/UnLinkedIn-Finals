const express=require('express')
const applicationController=require('../controllers/application_controllers')

const applicationRouter=express.Router()
applicationRouter.post('/add',applicationController.createApplication)
applicationRouter.get('/view/all',applicationController.viewAllApplications)
applicationRouter.put('/process/:id',applicationController.processApplication)
applicationRouter.delete('/delete/:id',applicationController.deleteApplication)

module.exports=applicationRouter