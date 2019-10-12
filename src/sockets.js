module.exports = io => {
    var lineHistory = [];

    io.on('connection', socket => {
        console.log('User connected');
        for (let coordenates in lineHistory){
            socket.emit('drawLineServer',{ line:lineHistory[coordenates] })
          }
        socket.on('drawLine', drawCoordenatesData => {
            console.log(drawCoordenatesData)
            lineHistory.push(drawCoordenatesData.line);
            socket.emit('drawLineServer', drawCoordenatesData);
        });
    })

}