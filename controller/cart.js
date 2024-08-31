const Cart = require("../models/cart");


//add to cart logic
const addToCart = async (req, res) => {
    try {
        const { productId, title, price, qty, img } = req.body;

        const userId = req.user;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty;
            cart.items[itemIndex].price += price * qty
        } else {
            cart.items.push({ productId, qty, title, price, img });
        }

        await cart.save();

        return res.status(200).json({ message: "item add successfull", cart });

    } catch (error) {
        console.log("error from add to cart logic", error);
    }
}


//get user cart item
const getCart = async (req, res) => {
    try {
        const userId = req.user;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "cart not found" });
        }
        return res.status(200).json({ message: "user cart", cart });
    } catch (error) {
        console.log("error from get cart item logic", error);
    }
}

//delete product from cart
const removeProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "product is not availabel" });
        }

        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

        await cart.save();

        return res.status(200).json({ message: "remove product" })

    } catch (error) {
        console.log("error from delete product logic", error);
    }
}

//decrease qty
const decreaseQty = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const userId = req.user;
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "cart not found" });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            if (item.qty > qty) {
                const pricePerUnit = item.price / item.qty;
                item.qty -= qty
                item.price -= pricePerUnit * qty;
            } else {
                cart.items.splice(itemIndex, 1);
            }
        } else {
            return res.status(401).json({ message: "invalid product id" });
        }

        await cart.save();
        return res.status(200).json({ message: "decrease qty", cart });

    } catch (error) {
        console.log("error from decrease qty logic", error);
    }
}


//delte product from cart
const deleteAllProductFromCart = async (req,res) => {
    try {
        const userId = req.user
        const cart = await Cart.findOne({userId});

        if(!cart){
            cart = new Cart({item:[]})
        }else{
            cart.items= []
        }

        await cart.save();

        return res.status(200).json({message:"all cart remove"})

    } catch (error) {
        console.log("error from delete all cart",error);
    }
}


module.exports = { addToCart, getCart, removeProduct, decreaseQty,deleteAllProductFromCart }