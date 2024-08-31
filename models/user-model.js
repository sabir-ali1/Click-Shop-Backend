const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


//user schema logic
const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
});



//jwt token logic
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId : this._id,
            email: this.email,
            isAdmin: this.isAdmin
        },
        process.env.secret_key,
        {
            expiresIn:"5d"
        }   
        )
        
    } catch (error) {
        console.log("error from  jwt logic",error);
    }
}


const User = new mongoose.model("User",userSchema);


module.exports = User