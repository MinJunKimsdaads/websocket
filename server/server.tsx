const express = require('express');
const app = express();
const port = 3001;
const cors = require("cors");

app.use(cors());

app.io = require('socket.io')();

// const Server =  require('socket.io');
// const io = require('socket.io')('http://localhost:3000/');

// app.use(()=>{
//     console.log('dddd');
// })

app.get('/',(req, res)=>{
    res.send('connect');
})

app.get('/test',(req, res)=>{
    res.send('test');
})

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})

app.io.on('connection', (socket)=>{
    console.log('socket connected');
    socket.on("send message",(item)=>{
        const message = "id :" + item.name + "// message : " + item.msg;
        console.log(message);
        app.io.emit("receive message", {name: item.name, msg:item.msg})
    })
    socket.on("disconnect", function(){
        console.log("user disconnected:",socket.id);
    })
})