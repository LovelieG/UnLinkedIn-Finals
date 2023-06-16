const resumeModel=(firstName,lastName,birthdate,contactNumber,gender, course, university,email,password)=>
{
    let resume=
    {
        first_name: firstName,
        last_name: lastName,
        birthdate: birthdate,
        contact_number: contactNumber,
        gender: gender,
        course: course,
        university: university,
        email: email,
        password: password
    }

    //KEY NAME(LEFT SIDE)=>COLUMN NAME IN THE
    //VALUE(RIGHT SIDE)=>WILL COME FROM THE CLIENT REQUEST
    return resume
}

module.exports=
{
    resumeModel
}