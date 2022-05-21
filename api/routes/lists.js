const router = require('express').Router();
const List = require("../models/List");
const verify=require("../verifyToken")

// Create List

router.post('/',verify, async (req,res)=>{
    if( req.user.isAdmin){
        const newList = new List(req.body);

        try{
            const savedList = await newList.save();
            res.status(200).json(savedList);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You're not allowed.")
    }
})

// Delete List


router.delete('/:id',verify, async (req,res)=>{
    if( req.user.isAdmin){

        try{
            await List.findByIdAndDelete(req.params.id)
            res.status(200).json("The list has been deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You're not allowed.")
    }
})

// Get Lists
router.get('/',verify, async (req,res)=>{
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let lists=[];
    try{
        if(typeQuery){
            if(genreQuery){
                lists=await List.aggregate([
                    {$sample:{size:3}},
                    {$match : {type:typeQuery,genre:genreQuery}}
                ])
            }else{
                lists=await List.aggregate([
                    {$sample:{size:3}},
                    {$match : {type:typeQuery}}
                ])
            }
        }else{
            lists = await List.aggregate([{$sample:{size:3}}])
        }
        res.status(200).json(lists);
    }catch(err){
        res.status(500).json(err);
    }
    
})



module.exports=router;