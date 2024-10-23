
const mongoose = require("mongoose");

async function connectToMongodb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/pay-next');
        console.log("Connection to MongoDB is successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = {
    connectToMongodb
};
