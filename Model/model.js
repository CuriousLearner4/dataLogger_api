const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    value:String,
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('sensorData',schema);