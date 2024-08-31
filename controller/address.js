const Address = require("../models/address");


//add address logic start here
const addAddress = async (req, res) => {
    try {
        const { username, phone, city, state, country, pincode, address } = req.body;
        const userId = req.user;
        if (!userId) {
            return res.status(401).json({ message: "invalid userid" });
        }

        const newAddress = await Address.create({ userId, username, phone, city, state, country, pincode, address });

        return res.status(200).json({ message: "Address add successfull", newAddress })

    } catch (error) {
        console.log("error from add address lgoic", error);
    }
}


//get address
const getAddress = async (req, res) => {
    try {
        const userId = req.user
        if (!userId) {
            return res.status(401).json({ message: "invalid userid" });
        }

        const address = await Address.find({ userId }).sort({ createAt: -1 });

        if (!address) {
            return res.status(404).json({ message: "Address not found" })
        } else {
            return res.status(200).json({ message: "Address added successfull", address })
        }

    } catch (error) {
        console.log("error from get address", error);
    }
}

module.exports = { addAddress, getAddress }