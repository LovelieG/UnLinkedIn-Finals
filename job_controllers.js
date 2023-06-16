const database=require('../models/con_db')
const jobModel=require('../models/job_models')
const utility=require('../extras/utilities')

const createJob=(req,res,next)=>
{
    let name=req.body.name;
    let description=req.body.description;
    let slots=req.body.slots;
    let empID=req.body.empid
    

    if( name==""||name==null||
        description==""||description==null||
        slots==""||slots==null||
        empID==""||empID==null)
    {
        utility.raiseMessage(res, 400, false, "Invalid details provided!")
    }
    else
    {
        let query=`SELECT name FROM jobs_tbl WHERE name='${name}'`

        database.db.query
        (query,(err,rows,results)=>
            {
                if(err)
                {
                    utility.raiseMessage(res, 500, false, err)
                }
                else
                {
                    if(rows.length>0)
                    {
                        utility.raiseMessage(res, 400, false, "Job already exists.")
                    }
                    else
                    {
                        let insertQuery=`INSERT INTO jobs_tbl SET ?`
                        let productObj= jobModel.jobModel(name,description,slots,empID)

                        database.db.query
                        (insertQuery,productObj,(err,rows,result)=>
                            {
                                if(err)
                                {
                                    utility.raiseMessage(res, 500, false, err)
                                }
                                else
                                {
                                    utility.raiseMessage(res, 200, true, "Successfully added new job!")
                                }
                            }
                        )
                    }
                }
            }
        )
    }
}

const viewAllJobs= (req,res,next)=>
{
    let query=`SELECT jobs_tbl.name as "Job-name",
                      jobs_tbl.description as "Job-Description",
                      jobs_tbl.slots as "Vacancies",
                      CONCAT(employees_tbl.first_name,' ', employees_tbl.last_name) as "Employee-Name",
                      employees_tbl.username as "Username",
                      employees_tbl.company_name as "Company-Name"
    FROM jobs_tbl 
    INNER JOIN employees_tbl ON employees_tbl.id=jobs_tbl.emp_ID `;
    database.db.query
    (query,(err,rows,result)=>
        {
            if(err)
            {
                utility.raiseMessage(res, 500, false, err)
            }
            else
            {
                utility.raiseData(res, "Successfully got all jobs.", rows)
            }
        }
    )
}

const updateJobListing=(req,res,next)=>
{
    let id = req.params.id
    let description = req.body.description
    let slots = req.body.slots

    if(id==""||id==null)
    {
        utility.raiseMessage(res, 400, false, "Invalid details provided!")
    }
    else
    {
        let query=`SELECT * FROM jobs_tbl WHERE id=${id}`
        database.db.query
        (query,(err,rows,result)=>
            {
                if (err)
                {
                    utility.raiseMessage(res, 500, false, err)
                }
                else
                {
                    if(rows.length>0)
                    {                        
                        let updateQuery=`UPDATE jobs_tbl SET description='${description}', slots='${slots}' WHERE id=${id}`
                        database.db.query
                        (updateQuery,(err,rows,result)=>
                            {
                                if(err)
                                {
                                    utility.raiseMessage(res, 500, false, err)
                                }
                                else
                                {
                                    utility.raiseMessage(res, 200, true, "Succesfully updated the job listing")
                                }
                            }
                        )
                    }
                    else
                    {
                        utility.raiseMessage(res, 400, false, "Job listing does not exist")
                    }
                }
            }
        )
    }
}

const deleteJobListing=(req,res,next)=>
{
    let id=req.params.id

    if(id==""||id==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided!")
    }
    else
    {
        let query=`SELECT id FROM jobs_tbl WHERE id=${id}`

        database.db.query
        (query,(err,row,result)=>
            {
                if(err)
                {
                    utility.raiseMessage(res, 500, false, err)
                }
                else
                {
                    if(row.length>0)
                    {
                        let deleteQuery=`DELETE FROM jobs_tbl WHERE id=${id}`
                        database.db.query
                        (deleteQuery,(err,rows,result)=>
                            {
                                if(err)
                                {
                                    utility.raiseMessage(res, 500, false, err)
                                }
                                else
                                {
                                    utility.raiseMessage(res, 200, true, "Successfuly deleted job listing.")
                                }
                                
                            }
                        )
                    }
                    else
                    {
                        utility.raiseMessage(res, 500, false, "Job listing does not exist.")
                    }
                }
            }
        )
    }
}

module.exports=
{
    createJob,
    viewAllJobs,
    updateJobListing,
    deleteJobListing
}