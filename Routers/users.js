const express = require("express");
const router = express.Router();
const knex = require("../config/dbConnection")
const hashPassWord = require("../MiddleWares/middleWare")
const bcrypt = require("bcrypt")
const {accessToken,verifyToken,saleraccessToken,salerverifyToken} = require("../MiddleWares/jwt")
// const verifyToken = require("../MiddleWares/jwt")

router.post('/', hashPassWord, async (req,res)=>{
    let user =  await knex("buyers").where({email : req.body.email});
    // console.log(user);
    if(user.length > 0){
        res.send("Already Existed.")
    }
    else{
        let {nameOfCustomer, email, password} = req.body
        console.log({nameOfCustomer, email, password});
        if(nameOfCustomer!= undefined && email!= undefined && password!=undefined){
            await knex("buyers").insert(req.body);
            res.send("New registration done.")
        }
        else{
            res.send("Something went wrong, check your data.")
        }
    }
});

router.get('/login', async (req,res)=>{
    const detailsChecking = await knex("buyers").where ({email : req.body.email})
    if(detailsChecking.length > 0){
        let checkingHashPassword = await bcrypt.compare(req.body.password,detailsChecking[0].password);
        if(checkingHashPassword){
            // console.log(detailsChecking[0].buyersId);
            let token = accessToken(detailsChecking[0].buyersId);
            res.cookie("addCookie",token);
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

router.put("/",verifyToken, async (req,res)=>{
    console.log(res.userData);
    await knex("buyers").where ({password:res.userData[0].password}).update({email:req.body.email});
    res.send("Updated your details.")
});

router.delete('/',verifyToken, async (req, res) => {
    try {
        await knex("buyers").where(res.userData[0]).del();
        res.send("data is deleted!")
    } catch (error) {
        res.send("Something is wrong login first!")
    }
});


module.exports = router;

