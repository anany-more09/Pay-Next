const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/pay-next')

async function connectToMongodb(connectToMongodb)
{
    try{
        await mongoose.connect(connectToMongodb)
        console.log("Connection to Mongodb is Successfull")
     }
     catch(error)
     {
        console.log("Error connecting to Mongodb:", error)
     }
    
}

module.exports={
    connectToMongodb
}