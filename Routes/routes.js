const express = require('express');
const Model = require('../Model/model')
const router = express.Router();

router.post('/post',async (req,res)=>{
    const data = new Model({
        value: req.body.sensorValue
    });
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message:eroor.message});
    }
});

module.exports = router;


