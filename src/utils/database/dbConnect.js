const mongoose = require("mongoose")

const dataBaseConnection = ()=>{
    mongoose.connect(process.env.DATABASE_CONNECTION,{
        serverSelectionTimeoutMS: 5000,
    }).then(()=>{
        console.log("Connected to Database")
    }).catch(err=>{
        throw err  
    })
} 

module.exports = dataBaseConnection