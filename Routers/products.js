const express = require("express");
const router = express.Router();
const knex = require("../config/dbConnection")

router.post('/',async (req,res)=>{
        const {productsName, productQuantity, salerId, productPrice, quality} =  req.body
        if(productsName!=undefined && productQuantity!= undefined && salerId!= undefined && productPrice!= undefined && quality!= undefined){
            await  knex("selectedProducts").insert(req.body)
            res.send("New item is added!")
        }
        else{
            res.send("Not added your item, something is wrong!")
        }
});

module.exports = router;
