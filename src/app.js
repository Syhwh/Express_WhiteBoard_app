const express=require('express');
const config=require('./config/config');
const socketIO=require('socket.io');
const http=require('http');
//
const app= express();
const server= http.createServer(app);
const io=socketIO(server);

//sockets
require('./sockets')(io);


const port = config.app.port;


app.use(express.static('./src/public'));







server.listen(port, () => {
    console.log(`Server runing in the port ${port}`);
})