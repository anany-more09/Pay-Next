
const mongoose = require("mongoose")
 
const acountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, // Reference to user model
        ref: 'User',
        required: true,
    },
    balance:
    {
        type: Number,
        required:true
    }
});
const Acount = mongoose.model('Acount', acountSchema)

module.exports={
    Acount
}