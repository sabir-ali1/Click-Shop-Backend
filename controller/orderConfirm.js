const OrderConfirm = require("../models/orderConfirm");


//add order 
const addOrderConfirm = async (req, res) => {
    try {
        const { items,username,phone,city,state,country,pincode,address} = req.body;
        const userId = req.user
        if(!userId){
            return res.status(401).json({message:"invalid userid"});
        }

        const orderConfirm = await OrderConfirm.create({userId,items,username,phone,city,state,country,pincode,address});

        return res.status(200).json({message:"Order Successfull",orderConfirm});

    } catch (error) {
        console.log("error from order confirm logic",error);
    }
}

module.exports = {addOrderConfirm};