const express = require("express");
const userRoute = express.Router();
const { handleUserSignUp, handleUserSignIn, handleUpdateUser,  getUsers } = require("../Controllers/user");


userRoute.post("/signup", handleUserSignUp)
userRoute.post("/signin", handleUserSignIn)
userRoute.put("/update", handleUpdateUser)
userRoute.get("/bulk",  getUsers)


module.exports = {
    userRoute
}

// "/api/v1/user
// "/api/v1/transaction"