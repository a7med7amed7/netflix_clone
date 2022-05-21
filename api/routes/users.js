const router = require('express').Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");
const verify=require("../verifyToken")

// Update user
router.put('/:id',verify, async (req,res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password=cryptoJs.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()
        }

        try{
            const updatedUser =await User.findOneAndUpdate(req.body.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can only update your account.")
    }
})

// Delete user
router.delete('/:id',verify, async (req,res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
        

        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.");

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can only Delete your account.")
    }
})

// Get user
router.get('/find/:id',verify, async (req,res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
        
        try{
            const user = await User.findById(req.params.id);
            const {password,...info} =user._doc;
            res.status(200).json(info);

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can only Delete your account.")
    }
})

// Get all users

router.get('/',verify, async (req,res)=>{
    const query = req.query.new; //new is varibale
    if(req.user.isAdmin){
        try{
            const users = query ?await User.find().sort({_id:-1}).limit(2) :await User.find();
            res.status(200).json(users);

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You're not admin.")
    }
})
// Analyze data

router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports=router;