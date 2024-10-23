const express = require("express");
const userRoute = express.Router();
const { handleUserSignUp, handleUserSignIn, handleUpdateUser, filterUsers } = require("../Controllers/user");
const {authmiddleware} = require("../middleware")

userRoute.post("/signup", handleUserSignUp)
userRoute.post("/signin", handleUserSignIn)
userRoute.put("/update",authmiddleware, handleUpdateUser)
userRoute.get("/bulk", filterUsers)

module.exports = userRoute

// "/api/v1/user
// "/api/v1/transaction"