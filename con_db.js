const mysql=require('mysql')

//DEFINE DATABASE DETAILS
//HOST,USER,DATABASE NAME/SCHEMA,PORT(OPTIONAL)
const db=mysql.createConnection
(   
    {
        host: "localhost",
        user: "root",
        database: "backend_finals"
    }
)

const connectDatabase=()=>
{
    db.connect
    ((error)=>
        {
            if(error)
            {
                console.log("Error connecting to database.")
            }
            else
            {
                console.log("Successfully conected to database.")
            }
        }
    )
}

module.exports=
{
    db,
    connectDatabase
    
}