require("dotenv").config();
const express = require("express");
const connectDB = require("./utils/db");
const app = express();
const userRouter = require("./router/user");
const productRouter = require("./router/product");
const cartRouter = require("./router/cart");
const addressRouter = require("./router/address");
const orderConfirmRouter = require("./router/orderConfirm");
const cors = require("cors")

app.use(express.json());

const corsOption = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    Credentials: true
}

app.use(cors(corsOption))

app.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to home page" })
});

//user router
app.use("/api/auth", userRouter);

//product router
app.use("/api/auth", productRouter);

//cart router
app.use("/api/cart", cartRouter);

//address router
app.use("/api/address", addressRouter);

//order confirm router
app.use("/api/order", orderConfirmRouter);

const port = 5000;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running on port http://localhost:${port}`);
    })
})