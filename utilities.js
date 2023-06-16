const raiseMessage=(res, code, isSuccessful, message)=>
{
    res.status(code).json
    (
        {
            successful: isSuccessful,
            message: message
        }
    )
}

const raiseData=(res, message, data)=>
{
    res.status(200).json
    (
        {
            successful: true,
            message: message,
            count:data.length,
            data:data,
        }
    )
}

module.exports = {
    raiseMessage,
    raiseData,
}