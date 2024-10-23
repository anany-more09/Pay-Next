
const mongoose = require("mongoose");

async function connectToMongoDb(connection_url) {
    try {
        await mongoose.connect(connection_url);
        console.log("Connection to MongoDB is successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = {connectToMongoDb}