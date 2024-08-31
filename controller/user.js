const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

//register logic start here
const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        //user check user is register or not
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(401).json({ message: "email already exist" });
        }

        //hash passwordd
        const saltRound = 10
        const hashPassword = await bcrypt.hash(password, saltRound);

        //create user
        const userCreated = await User.create({ username, email, phone, password: hashPassword });

        return res.status(200).json({ message: `register successfull ${userCreated.username}`, token: await userCreated.generateToken(), userId: userCreated._id.toString() });


    } catch (error) {
        console.log("error from register logic", error);
    }
}


//login logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //user check user is register or not
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(401).json({ message: "invalid credantials" });
        }

        //check password
        const user = await bcrypt.compare(password, userExist.password);

        if (user) {
            return res.status(200).json({ message: "login successfull", token: await userExist.generateToken(), userId: userExist._id.toString() })
        } else {
            return res.status(401).json({ message: "invalid credantials" })
        }


    } catch (error) {
        console.log("error from login logic", error);
    }
}


//get user data from backend
const getUserData = async (req, res) => {
    try {
        const data = req.user
        return res.status(200).json(data)
    } catch (error) {
        
    }y
}

module.exports = { register, login, getUserData }