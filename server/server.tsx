var express = require('express');
var http = require('http');
var port =  3001;

var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server,  { cors: { origin: '*' } });

io.on('connection', (socket) => {
   socket.on('send message',(item)=>{
        const message = "id : " + item.name + "//  message : " + item.msg;
        console.log(message);
        io.emit("receive message", { name: item.name, msg: item.msg });  //"receive message"라는 이벤트 발생
   })

   socket.on("disconnect", function () {
        console.log("user disconnected: ", socket.id);
   });
});


server.listen(3001,()=>{
    // 모든 도메인
    console.log('listening on :3001');
});