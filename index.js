const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/routes')
require('dotenv').config();

const app = express();
const mongoString = process.env.DATABASE_URL;

app.use(express.json());
app.use('/api',routes);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error',(err)=>{
    console.log(err);
});

database.once('connected',()=>{
    console.log('connected');
});

app.listen(3000,()=>{
    console.log("server started");
});
