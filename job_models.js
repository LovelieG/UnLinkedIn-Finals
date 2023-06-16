const jobModel=(name,description,slots,empid)=>
{
    let job=
    {
        name: name,
        description: description,
        slots: slots,
        emp_ID: empid
    }

    //KEY NAME(LEFT SIDE)=>COLUMN NAME IN THE
    //VALUE(RIGHT SIDE)=>WILL COME FROM THE CLIENT REQUEST
    return job
}

module.exports=
{
    jobModel
}