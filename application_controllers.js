const database=require('../models/con_db')
const applicationModel=require('../models/application_models')
const utility=require('../extras/utilities')

const createApplication=(req,res,next)=>
{
    let jobId = req.body.job_id;
    let resumeId=req.body.resume_id;

    if( jobId==""||
        jobId==null||
        resumeId==""||
        resumeId==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided!")
    }

    else
    {
        let insertQuery=`INSERT INTO applications_tbl SET ?`
        let application= applicationModel.applicationModel(jobId,resumeId)
        
        database.db.query
        (insertQuery,application,(err,rows,result)=>
            {
                if(err)
                {
                    utility.raiseMessage(res, 500, false, err);
                }
                else
                {
                    utility.raiseMessage(res, 200, true, "Successfully added your application.")
                }
            }
        )
    }
}

const viewAllApplications= (req,res,next)=>
{
    let query=`SELECT CONCAT(resumes_tbl.first_name ,' ',resumes_tbl.last_name) as "Applicant-Name",
                    resumes_tbl.email as "Email",
                    resumes_tbl.contact_number as "Contact-Number",
                    resumes_tbl.course as "Course",
                    resumes_tbl.university as "Univeristy",
                    jobs_tbl.name as "Job-Applied",
                    applications_tbl.is_approved as "is-Hired" 
               FROM applications_tbl 
               INNER JOIN jobs_tbl ON applications_tbl.job_id = jobs_tbl.id
               INNER JOIN resumes_tbl ON applications_tbl.resume_id = resumes_tbl.id`;
    database.db.query
    (query,(err,rows,result)=>
        {
            if(err)
            {
                utility.raiseMessage(res, 500, false, err)
            }
            else
            {
                utility.raiseData(res, "Successfully got all applications", rows)
            }
        }
    )
}

const deleteApplication=(req,res,next)=>
{
    let id=req.params.id

    if(id==""||id==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided!")
    }
    else
    {
        let query=`SELECT id FROM applications_tbl WHERE id=${id}`

        database.db.query
        (query,(err,rows,result)=>
            {
                if(err)
                {
                    utility.raiseMessage(res, 500, false, err)
                }
                else
                {
                    if(rows.length>0)
                    {
                        let deleteQuery=`DELETE FROM applications_tbl WHERE id=${id}`
                        database.db.query
                        (deleteQuery,(err,rows,result)=>
                            {
                                if(err)
                                {
                                    utility.raiseMessage(res, 500, false, err)
                                }
                                else
                                {
                                    utility.raiseMessage(res, 200, true, "Successfuly deleted your application") 
                                }
                                
                            }
                        )
                    }
                    else
                    {
                        utility.raiseMessage(res, 400, false, "Application does not exist.")
                    }
                }
            }
        )
    }
}

const processApplication=(req,res,next)=>
{
    let id=req.params.id
    let isApproved=req.body.is_approved

    if(id=="" || id==null || isApproved=="" || isApproved==null)
    {
        utility.raiseMessage(res, 400, false, "Invalid details provided!");
    }
    else
    {
        let query=`SELECT * from applications_tbl where id=${id}`

        database.db.query
        (query,(err,rows,result)=>
            {
                if (err)
                {
                    utility.raiseMessage(res, 500, false, err);
                }
                else
                {
                    if(rows.length==1)
                    {
                        let jobId = rows[0].job_id

                        let updateApplicationQuery=`UPDATE applications_tbl SET is_approved='${isApproved}' WHERE id=${id}`

                        database.db.query
                        (updateApplicationQuery,(err,rows,result)=>
                            {
                                if(err)
                                {
                                    utility.raiseMessage(res, 500, false, err);
                                }
                                else
                                {
                                    let jobSelectQuery=`SELECT * from jobs_tbl where id=${jobId}`

                                    database.db.query
                                    (jobSelectQuery,(err,jobRows,result)=>
                                        {
                                            if(err)
                                            {
                                                utility.raiseMessage(res, 500, false, err);
                                            }
                                            else
                                            {
                                                let job = jobRows[0]

                                                if(job.slots > 0)
                                                {
                                                    if(isApproved)
                                                    {
                                                        let updateJobQuery=`UPDATE jobs_tbl SET slots=slots-1 WHERE id=${jobId}`
                            
                                                        database.db.query
                                                        (updateJobQuery,(err,rows,result)=>
                                                            {
                                                                if(err)
                                                                {
                                                                    utility.raiseMessage(res, 500, false, err);
                                                                }
                                                            }
                                                        )
                                                    }

                                                    utility.raiseMessage(res, 200, true, "Succesfully processed application");
                                                }
                                                else
                                                {
                                                    utility.raiseMessage(res, 400, false, "Job's already been filled!");
                                                }
                                            }
                                        }
                                    )
                                }
                            }
                        )
                    }
                    else
                    {
                        utility.raiseMessage(res, 400, false, "Application does not exist");
                    }
                }
            }
        )
    }
}

module.exports=
{
    createApplication,
    viewAllApplications,
    deleteApplication,
    processApplication
}