const mongoose = require("mongoose")
const Acount = require("../Models/acount");

async function handleGetBalance(req, res)
{
    const account = await Acount.findOne({
        userId: req.headers.userId // may require change after testing

    });
    
    res.json({
       balance: account.balance
    });

}

async function handleTransfer(req, res)
{
   const session = await mongoose.startSession();
try{
   session.startTransaction();
   const { amount, to } = req.body;

   //Fetch the accounts within the transaction
   const account = await Acount.findOne({userId: req.userId}).session(session);
    if(!account || account.balance < amount)
        {
            await session.abortTransaction();
            return res.status(400).jsno({
                message: "Insufficient Balance"  //if anyone/two user tries to do the "Concurrent request" then it will protect us from fooling the database;
            });
        } 

    const toAccount = await Acount.findOne({userId:to }).session(session);

    if(!toAccount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // PERFORM THE ACTUAL TRANSACTION from x user's acount to some y user's account

    await Acount.updateone({userId: req.userId}, {$inc:{balance: -amount}}).session(session)
    await Acount.updateone({userId:to}, {$inc:{balance: amount}}).session(session)
    

    // Commit the transaction 
    await session.commitTransaction();
}
catch(err){
    await session.abortTransaction();
    return res.status(500).json({
        message:"Internal Server Error"
    });
}

    res.json({
        message: "Transaction Successfull"
    });
}

module.exports = {
    handleGetBalance,
    handleTransfer
}



// here anything that comes under 
//      session.startTransaction(); to   await session.commitTransaction();
// if anything goes wrong it will abort the transaction or stop the process.
