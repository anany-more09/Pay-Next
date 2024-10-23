
const mongoose = require("mongoose")
const User = require("./user")
 
const acountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, // this is a certain type that we have to give because in mongodb document we have $odj. it will make database little strict.
        ref: 'User', // Reference to user model
        required: true,
    },
    balance:
    {
        type: Number,
        integer: true,
        required:true
    }
});
const Acount = mongoose.model('Acount', acountSchema)

module.exports={
    Acount
}