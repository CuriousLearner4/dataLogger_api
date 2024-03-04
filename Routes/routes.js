const express = require('express');
const Model = require('../Model/model');
const router = express.Router();

router.post('/post',async (req,res)=>{
    console.log(req.body);
    const data = new Model({
        value: req.body.sensorValue
    });
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
});

router.get('/get',async (req,res)=>{
    try{
        const data = await Model.find().limit(1).sort({$natural:-1});
        res.status(200).json(data);
    }
    catch(error){
        res.send(400).json({message:error.message});
    }
})

module.exports = router;


