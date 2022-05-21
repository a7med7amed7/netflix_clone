const router = require('express').Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");
const jwt=require('jsonwebtoken');
router.post("/register",async(req,res) =>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:cryptoJs.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),
    })
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }

})
router.post("/login",async(req,res) =>{

    await User.findOne({email:req.body.email}).then((user)=>{
        const bytes = cryptoJs.AES.decrypt(user.password,process.env.SECRET_KEY);
        const originalPassword = bytes.toString(cryptoJs.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json("Password doesn't match.")

        const accessToken = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY,{
            expiresIn:"5d"
        })

        const {password,...info}=user._doc; // Seperate password from other data.
        res.status(200).json({...info,accessToken});

    }).catch(err =>{
        console.log(err);
        res.status(401).json("Email doesn't match.")
    })


})
module.exports=router;