const applicationModel=(jobId,resumeId)=>
{
    let application=
    {
        job_id: jobId,
        resume_id: resumeId
    }

    //KEY NAME(LEFT SIDE)=>COLUMN NAME IN THE
    //VALUE(RIGHT SIDE)=>WILL COME FROM THE CLIENT REQUEST
    return application
}

module.exports=
{
    applicationModel
}