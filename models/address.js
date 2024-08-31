const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    username:{type:String,required:true},
    phone:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    pincode:{type:Number,required:true},
    address:{type:String,required:true},
    createAt:{type:Date, default:Date.now}
});

const Address = new mongoose.model("Address",addressSchema);

module.exports = Address;