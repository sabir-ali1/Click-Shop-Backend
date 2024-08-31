const Product = require("../models/proudct");

//add product
const addProduct = async (req,res) => {
    try {
        const {title,description,price,catogery,qty,img} = req.body;

        const product = await Product.create({title,description,price,catogery,qty,img});

        return res.status(200).json({message:"add product",product})

    } catch (error) {
        console.log("error from product logic",error);
    }
}

//get all product
const getAllProduct = async (req,res) => {
    try {
        const product = await Product.find();
        return res.status(200).json({message:"get all product",product})
    } catch (error) {
        console.log("error from get all product logic",error);
    }
}

//get single product from id
const getSingleProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(!product){
            return res.status(401).json({message:"product is not available"})
        }
        return res.status(200).json({message:product});
    } catch (error) {
        console.log("error from get single product logic".error);
    }
}


module.exports = {addProduct,getAllProduct,getSingleProduct}