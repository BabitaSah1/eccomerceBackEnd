const jwt = require("jsonwebtoken");
const knex = require("../config/dbConnection");

const accessToken = (data) => {

    const token = jwt.sign(data, "secreteKey")
    // console.log(token);
    return token
}
// accessToken()

const verifyToken = async (req,res,next)=>{
    // console.log(req.headers.cookie.split(";")[0]);
    req.headers.cookie = req.headers.cookie.split(";")[0]
    var token = req.headers.cookie
    if(token){
        let tokens= token.split("=")[1]
        // console.log(tokens);
        var verify =  jwt.verify(tokens,"secreteKey")
        let db = await knex("buyers").where({buyersId:verify});
        res.userData = db 
        next()
        // res.send(db)
    }
    else{
        res.send("Token has expired.")
    }
}

const saleraccessToken = (data) => {

    const token = jwt.sign(data, "secreteKey")
    // console.log(token);
    return token
}
// accessToken()

const salerverifyToken = async (req,res,next)=>{
    // console.log(req.headers);
    var token = req.headers.cookie
    if(token){
        let tokens= token.split("=")[2]
        // console.log(tokens);
        // var verify = await jwt.verify(tokens,"secreteKey")
        let verify = await jwt.verify(tokens,"secreteKey")
        let db = await knex("salers").where({phoneNo:verify});
        res.userData = db 
        next()
    }
    else{
        res.send("Token has expired.")
    }
}

module.exports = {accessToken,verifyToken,saleraccessToken,salerverifyToken}