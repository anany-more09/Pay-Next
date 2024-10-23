const express = require("express");
const cors = require("cors");
const {connectToMongoDb} = require("./db");
const app = express();
const {userRoute} = require("./Routes/user")
const {bankRoute} = require("./Routes/acount")

const CONNECTION_URL = process.env.MONGO_CONNECTION_STRING 
const PORT = 3000

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRoute)
app.use("/api/v1/acount", bankRoute)

connectToMongoDb(CONNECTION_URL)
    .then(() => {
           app.listen(PORT, ()=>{
            console.log(`Server is runing at port ${PORT}`)
           })
    })
    .catch((err) => {
       console.log("Failed to connect Mongodb database")
       process.exit(1)
    })


