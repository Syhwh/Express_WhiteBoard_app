

// Inizialize
function init() {
    let mouse = {
        click: false,
        move: false,
        currentPosition: { x: 0, y: 0 },
        previousPosition: false
    }


    // Canvas Settings
    let width = window.innerWidth;
    let height = window.innerHeight;
    const canvas = document.querySelector('canvas');
    canvas.width = width*0.9;
    canvas.height = height*0.9;
    let ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', (e) => { mouse.click = true })
    canvas.addEventListener('mouseup', (e) => { mouse.click = false })
    canvas.addEventListener('mousemove', (e) => {
        mouse.currentPosition.x = e.clientX / width;
        mouse.currentPosition.y = e.clientY / height;
        mouse.move = true;

    })



 
    //socket Client
    const socket = io();
    socket.on('drawLineServer', data => {
        const line = data.line;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(line[0].x * width, line[0].y * height);
        ctx.lineTo(line[1].x * width, line[1].y * height);
        ctx.stroke();
    })


    function mainLoop  (){
        if (mouse.click && mouse.move && mouse.previousPosition) {
            socket.emit('drawLine', { line: [mouse.currentPosition, mouse.previousPosition] })
            mouse.move = false;
        }
        mouse.previousPosition = { x: mouse.currentPosition.x, y: mouse.currentPosition.y }
        setTimeout(mainLoop, 25);
    }
    mainLoop();



}


init();



