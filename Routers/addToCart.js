const express = require("express");
const router = express.Router();
const knex = require("../config/dbConnection");

const hashPassWord = require("../MiddleWares/middleWare")
const bcrypt = require("bcrypt")
const {accessToken,verifyToken, saleraccessToken,salerverifyToken} = require("../MiddleWares/jwt")

router.get('/',async (req,res)=>{
    console.log(req.body);
    const data = await knex("selectedProducts");
    res.send(data)
});

router.post("/",verifyToken, async (req, res) => {
    // console.log(req.body);
    try {
        const dataAddToCart =  req.body.addToCart;
        let buyerId = res.userData[0].buyersId
        for (item in dataAddToCart) {
            dataAddToCart[item].status = "pending"
            dataAddToCart[item].buyerId = buyerId
            console.log(buyerId);
        }
        console.log(dataAddToCart);
        await knex('addtocart').insert(dataAddToCart);
        res.send("products")
        
    } catch (error) {
        console.log(error);
        res.send("Something went wrong!")
    }
});

module.exports = router;