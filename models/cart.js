const mongoose = require("mongoose");


const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required:true
    },
    title:{type:String,required:true},
    price:{type:Number,required:true},
    qty:{type:Number,required:true},
    img:{type:String,required:true},

});


const cartSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[cartItemSchema]
});


const Cart = new mongoose.model("Cart",cartSchema)

module.exports = Cart;