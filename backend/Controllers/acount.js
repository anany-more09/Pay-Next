const mongoose = require("mongoose");
const { Acount } = require("../Models/acount");

async function handleTransfer(req, res) {
    

    try {
        
        const { amount, to } = req.body;
        const senderId = req.userId;

        if (!senderId || !to || amount === undefined) {
            throw new Error("Missing required fields: senderId, to, or amount");
        }

        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            throw new Error("Invalid amount: Must be a positive number");
        }

        if (senderId === to) {
            throw new Error("Sender and receiver cannot be the same");
        }

        const fromAccount = await Acount.findOne({ userId: senderId })
        if (!fromAccount) {
            throw new Error("Sender account not found");
        }

        if (fromAccount.balance < numericAmount) {
            throw new Error("Insufficient balance");
        }

        const toAccount = await Acount.findOne({ userId: to })
        if (!toAccount) {
            throw new Error("Recipient account not found");
        }

        const fromUpdateResult = await Acount.updateOne(
            { userId: senderId },
            { $inc: { balance: -numericAmount } }
        );
        console.log(fromUpdateResult); // Check the result of the update

        const toUpdateResult = await Acount.updateOne(
            { userId: to },
            { $inc: { balance: numericAmount } }
        );
        console.log(toUpdateResult); // Check the result of the update

        

        return res.json({ message: "Transaction Successful" });

    } catch (err) {
     
        console.error("Transaction failed:", err); // Log the full error for debugging
        return res.status(400).json({
            message: "Transaction Failed",
            error: err.message,
        });
    } finally {
       
    }
}

async function handleGetBalance(req, res)
{
    const account = await Acount.findOne({
        userId: req.headers.userId // may require change after testing

    });
    
    res.json({
       balance: account.balance
    });
   
}

module.exports = {
    handleTransfer,
    handleGetBalance
}
