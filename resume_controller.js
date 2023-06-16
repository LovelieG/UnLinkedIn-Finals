const database=require('../models/con_db')
const resumeModel=require('../models/resume_models')
const utility=require('../extras/utilities')

const createResume=(req,res,next)=>
{
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let birthdate = req.body.birthdate;
    let contactNumber = req.body.contactnumber;
    let gender = req.body.gender;
    let course = req.body.course;
    let university = req.body.university;
    let email=req.body.email;
    let password=req.body.password;

    if( firstName==""|| firstName==null||
        lastName==""||lastName==null||
        birthdate==""||birthdate==null ||
        contactNumber==""||contactNumber==null ||
        gender==""||gender==null ||
        course==""|| course==null ||
        university==""||university==null||
        email==""||email==null||
        password==""||password==null)
    {
        utility.raiseMessage(res, 400, false, "Invalid details provided!")
    }
    const today= new Date();
    const birthdateObj=new Date(birthdate);
    if(birthdateObj>today)
    {
        utility.raiseMessage(res,400,false,"Invalid birthdate. Date must be before the current date.")
    }

    if (contactNumber.length>11)
    {
        utility.raiseMessage(res,400,false,"The maximum digit is 11")
    }
    
    if(gender!="Male" && gender!="Female")
    {
        {
            utility.raiseMessage(res,400,false,"Invalid gender. Use only Male or Female.")
        }
    }
    else 
    {

        let query=`SELECT email FROM resumes_tbl WHERE email='${email}'`
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
                        utility.raiseMessage(res, 400, false, "Email already exist please use another one")
                    }
                    else
                    {
                        let insertQuery=`INSERT INTO resumes_tbl SET ?`
                        let resume= resumeModel.resumeModel(firstName,lastName,birthdate,contactNumber,gender, course, university,email,password)

                        database.db.query
                        (insertQuery,resume,(err,rows,result)=>
                            {
                                if(err)
                                {
                                    utility.raiseMessage(res, 500, false, err)
                                }
                                else
                                {
                                    utility.raiseMessage(res, 200, true, "Successfully added new resume!")
                                }
                            }
                        )
                    }
                }
            }
        )
    }
}

const viewAllResumes= (req,res,next)=>
{
    let query=`SELECT CONCAT(first_name ,' ', last_name) as "Applicant-Name",
                      course as "Course",
                      university as "University",
                      email as "Email",
                      contact_number as "Contact-number",
                      gender as "Sex",
                      birthdate as "Birthday"
    FROM resumes_tbl` 
    database.db.query
    (query,(err,rows,result)=>
        {
            if(err)
            {
                utility.raiseMessage(res, 500, false, err)
            }
            else
            {
                utility.raiseData(res, "Successfully got all resumes.", rows)
            }
        }
    )
}

const updateResume=(req,res,next)=>
{
    let ID = req.params.id
    let lastName = req.body.last_name
    let email=req.body.email
    let contactNumber=req.body.contact_number
    let course=req.body.course
    let university=req.body.university
    let password=req.body.password

    if(password=="" || password==null)
    {
        utility.raiseMessage(res, 400, false, "Password / Information should not be blank!")
    }
    else if((lastName=="" || lastName==null)&&(contactNumber=="" || contactNumber==null)&&(email==""||email==null)&&(course==""||course==null)&&(university==""||university==null))
    {
        utility.raiseMessage(res, 400, false, "You did not change anything!");
    }
    else
    {
        let query=`SELECT id,last_name,contact_number,email,course,university,password FROM resumes_tbl WHERE id=${ID}`

        database.db.query
        (query,(err,rows,result)=>
            {
                if (err)
                {
                    utility.raiseMessage(res, 500, false, err)
                }
                else
                {
                    
                    if(rows.length==1)
                    {
                        if(rows[0].password != password)
                        {
                            utility.raiseMessage(res, 400, false, "You entered wrong password!");
                        }
                        else
                        {
                            let hasPrecedence=false
                            let lastNameQuery=""
                            if(lastName!=null && lastName!="")
                            {
                                hasPrecedence=true
                                lastNameQuery=` last_name='${lastName} '`                                
                            }

                            let emailQuery=""
                            if(emailQuery!=null && emailQuery!="")
                            {
                                if(hasPrecedence==true)
                                {
                                    emailQuery=` ,email='${email} '`
                                }
                                else
                                {
                                    hasPrecedence=true
                                    emailQuery=` email='${email} '`
                                }
                            }

                            let contactNumberQuery=""
                            if(contactNumberQuery!=null && contactNumberQuery!="")
                            {
                                if(hasPrecedence==true)
                                {
                                    contactNumberQuery=` ,contact_number='${contactNumber} '`
                                }
                                else
                                {
                                    hasPrecedence=true
                                    contactNumberQuery=` contact_number='${contactNumber} '`
                                }
                            }
                            let courseQuery=""
                            if(courseQuery!=null && courseQuery!="")
                            {
                                if(hasPrecedence==true)
                                {
                                    courseQuery=` ,course='${course} '`
                                }
                                else
                                {
                                    hasPrecedence=true
                                    courseQuery=` course='${course} '`
                                }
                            }
                            let universityQuery=""
                            if(universityQuery!=null && universityQuery!="")
                            {
                                if(hasPrecedence==true)
                                {
                                    universityQuery=` ,university='${university} '`
                                }
                                else
                                {
                                    hasPrecedence=true
                                    universityQuery=` university='${university} '`
                                }
                            }
                            let passwordQuery=""
                            if(passwordQuery!=null && passwordQuery!="")
                            {
                                if(hasPrecedence==true)
                                {
                                    passwordQuery=` ,password='${password} '`
                                }
                                else
                                {
                                    hasPrecedence=true
                                    passwordQuery=` password='${password} '`
                                }
                            }
                            let updateQuery=`UPDATE resumes_tbl SET ${lastNameQuery} ${emailQuery} ${contactNumberQuery} ${courseQuery} ${universityQuery} ${passwordQuery} WHERE id=${ID}`
                            database.db.query
                            (updateQuery,(err,rows,result)=>
                                {
                                    if(err)
                                    {
                                        utility.raiseMessage(res, 500, false, err);
                                    }
                                    else
                                    {
                                        utility.raiseMessage(res, 200, true, "Succesfully updated your information");
                                    }
                                }
                            )
                        }
                    }
                    else
                    {
                        utility.raiseMessage(res, 400, false, "Employee does not exist");
                    }
                }
            }
        )
    }
}

const deleteResume=(req,res,next)=>
{
    let id=req.params.id

    if(id==""||id==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided!")
    }
    else
    {
        let query=`SELECT id FROM resumes_tbl WHERE id=${id}`

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
                        let deleteQuery=`DELETE FROM resumes_tbl WHERE id=${id}`
                        database.db.query
                        (deleteQuery,(err,rows,result)=>
                            {
                                if(err)
                                {
                                    utility.raiseMessage(res, 500, false, err)
                                }
                                else
                                {
                                    utility.raiseMessage(res, 200, true, "Successfuly deleted resume listing.")
                                }
                                
                            }
                        )
                    }
                    else
                    {
                        utility.raiseMessage(res, 500, false, "Resume listing does not exist.")
                    }
                }
            }
        )
    }
}

const loginUser=(req,res,next)=>{

    let userEmail=req.body.email;
    let userPassword=req.body.password;

    if( userEmail==""||
        userEmail==null ||
        userPassword==""||
        userPassword==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided.");
    }

    else
    {
        let query=`SELECT email, password FROM resumes_tbl WHERE email='${userEmail}'`

        database.db.query
        (query,(err,rows,results)=>
            {
                if(err)
                {
                    utility.raiseMessage(res, 500, false, err);
                }
                else
                {
                    if(rows.length==0)
                    {
                        utility.raiseMessage(res, 404, false, "user not found");
                    }
                    else if(rows.length == 1)
                    {
                        if(rows[0].password == userPassword)
                        {
                            utility.raiseMessage(res, 200, true, "Successfully logged in!");
                        }

                        else
                        {
                            utility.raiseMessage(res, 400, false, "You entered wrong password!");
                        }
                    }
                    else
                    {
                        utility.raiseMessage(res, 400, false, "Multiple employees found!");
                    }
                }
            }
        )
    }
}

const viewCompany= (req,res,next)=>
{
    let Company=req.params.company
    if(Company==""||Company==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided!")
    }
    else
    {

    
        let query=`SELECT CONCAT(first_name ,' ', last_name) as "Employee-Name",
                            username as "Username",
                            company_name as "Company-Name"
        FROM employees_tbl WHERE company_name='${Company}'`;
        database.db.query
        (query,(err,rows,result)=>
            {
                if(err)
                {
                    utility.raiseMessage(res, 500, false, err)
                }
                else
                {
                    const count=rows.length;
                    if(count>0)
                    {
                        {
                            utility.raiseData(res,`Succesfully found "${Company}" `,rows)
                        }
                    }
                    else
                    {
                        utility.raiseMessage(res, 200, false, "No 'Company' found")
                    }

                }

            }
        )
    }    
}

const viewTypeOfJob= (req,res,next)=>
{
    let jobType=req.params.typeofjob
    if(jobType==""||jobType==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided!")
    }
    else
    {

    
        let query=`SELECT name as "Type-of-job",
                          description as "Description-of-job",
                          slots as "Vacancies" 
        FROM jobs_tbl WHERE name LIKE '%${jobType}%'`;
        database.db.query
        (query,(err,rows,result)=>
            {
                if(err)
                {
                    utility.raiseMessage(res, 500, false, err)
                }
                else
                {
                    const count=rows.length;
                    if(count>0)
                    {
                        utility.raiseData(res,`Succesfully found job type "${jobType}" `,rows)
                    }
                    else
                    {
                        utility.raiseMessage(res, 200, false, `"No "${jobType}" found"`)
                    }

                }

            }
        )
    }    
}

const viewAppliedJob= (req,res,next)=>
{
    let appliedJob=req.params.appliedjob
    if(appliedJob==""||appliedJob==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided!")
    }
    else
    {

    
        let query=`SELECT CONCAT(resumes_tbl.first_name ,' ',resumes_tbl.last_name) as "Applicant-Name",
                          jobs_tbl.name as "Type-of-job",
                          jobs_tbl.description as "Job-description",
                          applications_tbl.is_approved as "is-Hired"
        FROM applications_tbl
        INNER JOIN jobs_tbl ON applications_tbl.job_id = jobs_tbl.id
        INNER JOIN resumes_tbl ON applications_tbl.resume_id = resumes_tbl.id
        WHERE resumes_tbl.email = '${appliedJob}'`;
        database.db.query
        (query,(err,rows,result)=>
            {
                if(err)
                {
                    utility.raiseMessage(res, 500, false, err)
                }
                else
                {
                    const count=rows.length;
                    if(count>0)
                    {
                        utility.raiseData(res, "Successfully got all applications", rows)
                    }
                    else
                    {
                        utility.raiseMessage(res, 200, false, `'${appliedJob}' has no applications yet`)
                    }

                }

            }
        )
    }    
}

const viewJobByCompany= (req,res,next)=>
{
    let companyJob=req.params.company_job
    if(companyJob==""||companyJob==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided!")
    }
    let query=`SELECT employees_tbl.company_name as "Company-Name",
                      employees_tbl.username as "Employee-Username",
                      jobs_tbl.name as "Job-Name"

    FROM employees_tbl
    INNER JOIN jobs_tbl ON employees_tbl.id = jobs_tbl.emp_ID                
    WHERE employees_tbl.company_name='${companyJob}'`

    database.db.query
    (query,(err,rows,result)=>
        {
            if(err)
            {
                utility.raiseMessage(res, 500, false, err)
            }
            else
            {
                utility.raiseData(res, "Successfully got all companies job.", rows)
            }
        }
    )
}
module.exports=
{
    createResume,
    viewAllResumes,
    updateResume,
    deleteResume,
    loginUser,
    viewCompany,
    viewAppliedJob,
    viewTypeOfJob,
    viewJobByCompany
}


