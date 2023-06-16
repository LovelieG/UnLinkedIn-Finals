//THIS IS OUR MIDDLEWARE

//IMPORT OUR DEPENDENCIES
const express=require('express')
const app=express()
const morgan=require('morgan')
const bodyParser=require('body-parser')
//THIS IS WHERE WE WILL PLACE THE DB CONNECTION
const db=require("./API/models/con_db")
db.connectDatabase()
//THIS IS WHERE WE WILL PLACE OUR ROUTERS
const applicationRouter=require('./API/routers/application_routers')
const jobRouter = require('./API/routers/job_routers')
const employeeRouter = require('./API/routers/employee_routers')
const resumeRouter = require('./API/routers/resume_routers')
//DEFINE SETTING FOR BODY-PARSER AND MORGAN
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//define header settings
app.use
((req, res, next)=>
    {
        res.header("Access-Control-Allow-Origin","*")
        res.header("Access-Control-Allow-Headers","*")

        if (req.method==='OPTIONS')
        {
            res.header("Access-Control-Allow-Methods","*")
            return res.status(200).json({})
        }

        next()
    }
)

//DEFINE OUR MODULE ENDPOINT PLUS THE ROUTER
app.use('/application',applicationRouter)
app.use('/job',jobRouter)
app.use('/employee',employeeRouter)
app.use('/resume',resumeRouter)


//ERROR MIDDLEWARE

app.use
((req, res, next)=>
    {
        const error=new Error('Not found')
        error.status=404
        next(error)
    }
)

app.use
((error, req, res, next)=>
    {
        res.status(error.status||500)
        res.json
        (
            {
                error:
                {
                    message: error.message
                }
            }
        )
    }
)

module.exports=app