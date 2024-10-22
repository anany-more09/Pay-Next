const express = require("express");
const cors = require("cors");
import { connectToMongodb } from "./db";
const app = express();
import { userRoute } from "./Routes/user"

const CONNECTION_URL = process.env.MONGO_CONNECTION_STRING 
const PORT = 3000

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRoute)
app.use("/api/v1/account", acountRoute)

connectToMongodb(CONNECTION_URL)

    .then(() => {
           app.listen(PORT, ()=>{
            console.log(`Server is runing at port ${PORT}`)

           })
    })
    .catch((err) => {
       console.log("Failed to connect Mongodb database")
       process.exit(1)
    })


