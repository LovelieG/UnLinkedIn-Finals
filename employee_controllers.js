const database=require('../models/con_db')
const employeeModel=require('../models/employee_models')
const utility=require('../extras/utilities')

const createEmployee=(req,res,next)=>
{
    let employeeFirstName=req.body.firstname;
    let employeeLastName=req.body.lastname;
    let employeeUsername=req.body.username;
    let employeePassword=req.body.password;
    let employeeCompany=req.body.employeeCompany

    if( employeeFirstName==""|| employeeFirstName==null ||
        employeeLastName=="" || employeeLastName==null  ||
        employeeUsername=="" || employeeUsername==null  ||
        employeePassword=="" || employeePassword==null  ||
        employeeCompany==""  || employeeCompany==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided.");
    }

    else
    {
        let query=`SELECT username FROM employees_tbl WHERE username='${employeeUsername}'`

        database.db.query
        (query,(err,rows,results)=>
            {
                if(err)
                {
                    utility.raiseMessage(res, 500, false, err);
                }
                else
                {
                    if(rows.length>0)
                    {
                        utility.raiseMessage(res, 400, false, "Username is taken please put another one.");
                    }
                    else
                    {
                        let insertQuery=`INSERT INTO employees_tbl SET ?`
                        let employee= employeeModel.employeeModel(employeeFirstName,employeeLastName,employeeUsername,employeePassword,employeeCompany)

                        database.db.query
                        (insertQuery,employee,(err,rows,result)=>
                            {
                                if(err)
                                {
                                    utility.raiseMessage(res, 500, false, err);
                                }
                                else
                                {
                                    utility.raiseMessage(res, 200, true, "Successfully added new employee!");
                                }
                            }
                        )
                    }
                }
            }
        )
    }
}

const loginEmployee=(req,res,next)=>{

    let employeeUsername=req.body.username;
    let employeePassword=req.body.password;
    

    if( employeeUsername==""||
        employeeUsername==null ||
        employeePassword==""||
        employeePassword==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided.");
    }

    else
    {
        let query=`SELECT username, password FROM employees_tbl WHERE username='${employeeUsername}'`

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
                        utility.raiseMessage(res, 404, false, "Employee not found");
                    }
                    else if(rows.length == 1)
                    {
                        if(rows[0].password == employeePassword)
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

const updatePassword=(req,res,next)=>
{
    let employeeId=req.params.id
    let oldPassword=req.body.old_password
    let newPassword=req.body.new_password

    if(newPassword=="" || newPassword==null||oldPassword=="" || oldPassword==null)
    {
        utility.raiseMessage(res, 400, false, "Password should not be blank!");
    }
    else
    {
        let query=`SELECT id, password from employees_tbl where id=${employeeId}`

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
                        if(rows[0].password == newPassword)

                        {
                            utility.raiseMessage(res, 400, false, "Should not use old password!");
                        }
                        else if(rows[0].password!=oldPassword)
                        {
                            utility.raiseMessage(res, 400, false, "Invalid password");
                        }
                        else
                        {
                            let updateQuery=`UPDATE employees_tbl SET password='${newPassword}' WHERE id=${employeeId}`
                            database.db.query
                            (updateQuery,(err,rows,result)=>
                                {
                                    if(err)
                                    {
                                        utility.raiseMessage(res, 500, false, err);
                                    }
                                    else
                                    {
                                        utility.raiseMessage(res, 200, true, "Succesfully updated password");
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

const updateEmployee=(req,res,next)=>
{
    let employeeId=req.params.id
    let lastName=req.body.last_name
    let changeCompany=req.body.change_company
    let password=req.body.password

    if(password=="" || password==null)
    {
        utility.raiseMessage(res, 400, false, "Password / Information should not be blank!");
    }
    else if((lastName=="" || lastName==null) && (changeCompany==null || changeCompany==""))
    {
        utility.raiseMessage(res, 400, false, "You did not change anything!");
    }

    else
    {
        let query=`SELECT id, last_name,company_name,password from employees_tbl where id=${employeeId}`

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
                            let companyQuery=""
                            if(changeCompany!=null && changeCompany!="")
                            {
                                if(hasPrecedence)
                                {
                                    companyQuery=` ,company_name='${changeCompany} '`
                                }
                                else
                                {
                                    hasPrecedence=true
                                    companyQuery=` company_name='${changeCompany} '`
                                }
                            }
                            let updateQuery=`UPDATE employees_tbl SET ${lastNameQuery} ${companyQuery} WHERE id=${employeeId}`
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

const deleteEmployee=(req,res,next)=>
{
    let id=req.params.id

    if(id==""||id==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided!")
    }
    else
    {
        let query=`SELECT id FROM employees_tbl WHERE id=${id}`

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
                        let deleteQuery=`DELETE FROM employees_tbl WHERE id=${id}`
                        database.db.query
                        (deleteQuery,(err,rows,result)=>
                            {
                                if(err)
                                {
                                    utility.raiseMessage(res, 500, false, err)
                                }
                                else
                                {
                                    utility.raiseMessage(res, 200, true, "Successfuly deleted Employee.")
                                }
                                
                            }
                        )
                    }
                    else
                    {
                        utility.raiseMessage(res, 500, false, "Employee does not exist.")
                    }
                }
            }
        )
    }
}

const viewCourse= (req,res,next)=>
{
    let Course=req.params.course
    if(Course==""||Course==null)
    {
        utility.raiseMessage(res, 404, false, "Invalid details provided!")
    }
    else
    {

    
        let query=`SELECT CONCAT(first_name ,' ', last_name) as "Applicant-Name",
                          course as "Course",
                          university as "University",
                          email as "Email",
                          contact_number as "Contact-number",
                          birthdate as "Birthday"
        FROM resumes_tbl 
        WHERE course='${Course}'`;
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
                        utility.raiseData(res, `Succesfully found ${Course}`,rows)
                    }
                    else
                    {
                        utility.raiseMessage(res, 200, false, `No ${Course} found`)
                    }

                }

            }
        )
    }    
}

module.exports=
{
    createEmployee,
    updatePassword,
    updateEmployee,
    loginEmployee,
    deleteEmployee,
    viewCourse
}