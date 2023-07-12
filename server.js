const knex = require("./config/dbConnection");
const express = require("express");

const app =  express();

app.use(express.json());

const User = require("./Routers/users");
app.use("/user",User)


const addToCart = require("./Routers/addToCart");
app.use("/addToCart",addToCart)


const products = require("./Routers/products");
app.use("/products",products)


const salers = require("./Routers/salers");
app.use("/salers",salers)

// const test = require("./test")

app.listen(5000,()=>{
    console.log("Running at 5000 port.");
})