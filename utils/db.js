const mongoose = require("mongoose");

const URL = process.env.mongo_url

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("database is connected successfull");
    } catch (error) {
        console.log("database is not connected");
    }
}

module.exports = connectDB;