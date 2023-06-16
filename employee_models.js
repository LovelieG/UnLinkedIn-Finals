const employeeModel=(firstname,lastname,username,password,employeeCompany)=>
{
    let employee=
    {
        first_name: firstname,
        last_name: lastname,
        username: username,
        password: password,
        company_name: employeeCompany,
    }

    //KEY NAME(LEFT SIDE)=>COLUMN NAME IN THE
    //VALUE(RIGHT SIDE)=>WILL COME FROM THE CLIENT REQUEST
    return employee
}

module.exports=
{
    employeeModel
}