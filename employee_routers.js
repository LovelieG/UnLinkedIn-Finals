const express=require('express')
const employeeController=require('../controllers/employee_controllers')

const employeeRouter= express.Router()
employeeRouter.post('/create',employeeController.createEmployee)
employeeRouter.get('/login',employeeController.loginEmployee)
employeeRouter.put('/update-password/:id',employeeController.updatePassword)
employeeRouter.put('/update-employee/:id',employeeController.updateEmployee)
employeeRouter.delete('/delete/:id',employeeController.deleteEmployee)
employeeRouter.get('/view/course/:course',employeeController.viewCourse)

module.exports=employeeRouter