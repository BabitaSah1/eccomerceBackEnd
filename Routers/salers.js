const express = require("express");
const router = express.Router();
const knex = require("../config/dbConnection")
const hashPassWord = require("../MiddleWares/middleWare")
const bcrypt = require("bcrypt")
const {accessToken,verifyToken, saleraccessToken,salerverifyToken} = require("../MiddleWares/jwt")

router.post('/',hashPassWord,async (req,res)=>{
    // console.log(req.body.email);
   let saler = await knex("salers").where({email:req.body.email});
    if(saler.length>0){
        res.send("Already exist!")
    }
    else{
        console.log(req.body);
        const {salerName,email,password,phoneNo} =  req.body
        if(salerName!=undefined && email!= undefined && password!= undefined && phoneNo!= undefined){
            await  knex("salers").insert(req.body)
            res.send("New Registration is done!")
        }
        else{
            res.send("something is wrong!")
        }
    }
});

router.get('/login', async (req,res)=>{
    const detailsChecking = await knex("salers").where ({email : req.body.email})
    if(detailsChecking.length > 0){
        let checkingHashPassword = await bcrypt.compare(req.body.password,detailsChecking[0].password);
        if(checkingHashPassword){
            let token = saleraccessToken(detailsChecking[0].phoneNo);
            res.cookie("saleraddCookie",token);
            // console.log(req.header.cookie);
            res.send("Login successfully.")
        }
        else{
            res.send("passWord is not matched.")
        }
    }
    else{
        res.send("Email is not matched.")
    }
});

router.put("/",salerverifyToken, async (req,res)=>{
    console.log(res.userData);
    await knex("salers").where ({password:res.userData[0].password}).update({email:req.body.email});
    res.send("Updated your details.")
});

router.delete('/',salerverifyToken, async (req, res) => {
    try {
        await knex("salers").where(res.userData[0]).del();
        res.send("data is deleted!")
    } catch (error) {
        res.send("Something is wrong login first!")
    }
});

module.exports = router;