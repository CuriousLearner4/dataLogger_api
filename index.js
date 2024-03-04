const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');
const routes = require('./Routes/routes');
const Model = require('./Model/model');
require('dotenv').config();

const app = express();
const mongoString = process.env.DATABASE_URL;
const httpserver = http.createServer(app);
app.use(express.json());
const server = new socketio.Server(httpserver,{
    cors: {
        origin:'*',
    }
});
app.use('/api',routes);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error',(err)=>{
    console.log(err);
});

database.once('connected',()=>{
    console.log('connected');
});

server.on("connection", (socket)=>{
    let data = "";
    const getData = async()=>{
        data = await Model.find().limit(5).sort({$natural:-1});
    }
    setInterval(()=>{
        getData();
        socket.emit("message",data);
    },1000);
})



httpserver.listen(5000);