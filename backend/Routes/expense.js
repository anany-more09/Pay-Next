const express = require("express");
const { handleIncome } = require("../Controllers/user");
const trackRoute = express.Router();



trackRoute.post("/income", handleIncome)

module.exports = {
    trackRoute
}

// "/api/v1/user
// "/api/v1/transaction"
// "/api/v1/expense/income"