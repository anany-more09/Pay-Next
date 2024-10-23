const express = require("express");
const {authmiddleware} = require("../middleware")
const {handleGetBalance, handleTransfer} = require("../Controllers/acount");
const bankRoute = express.Router();

bankRoute.get("/balance", authmiddleware, handleGetBalance);
bankRoute.post("/transfer", authmiddleware, handleTransfer);


module.exports={
    bankRoute
}