define(['./colorlib', './random', './tree'], function (colorlib, random, tree) {
    return {
        canvasDrawer: function (cx) {

            // TODO: ugly global
            STOP_ANIMATE = false;
            // Basic animation bones from 
            // http://www.html5canvastutorials.com/advanced/html5-canvas-linear-motion-animation/
            window.requestAnimFrame = (function(callback) {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
            })();

            window.cancelAnimationFrame = (function(callback) {
                return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame ||
                function(id) {
                    clearTimeout(id);
                };
            })();

            var myRectangle = {
                x: 0,
                y: 75,
                width: 100,
                height: 50,
                borderWidth: 5
            };

            // wait one second before starting animation
            var animTimeoutID = setTimeout(function() {
                var startTime = (new Date()).getTime();
                animate(myRectangle, cx, startTime);
            }, 1000);
        },
    }
});

function draw() {
    // Buffer for animation
    var buffer = document.querySelector("buffer").getContext("2d");

    var buffer_context = buffer.getContext('2d');
    var context = canvas.getContext('2d');

    // Draw ...

    context.drawImage(buffer, 0, 0);
}


function animate(myRectangle, context, startTime, lastTime) {
    // TODO: ugly global
    if (STOP_ANIMATE){
        return true;
    }
    var buffer = document.createElement('canvas');
    buffer.width = context.canvas.width;
    buffer.height = context.canvas.height;

    var buffer_context = buffer.getContext('2d');

    // update
    var time = (new Date()).getTime() - startTime;
    fps = 1 / ((time-lastTime)/1000);
    //console.log(fps);

    var amplitude = 150;

    // in ms
    var period = 2000;
    var centerX = buffer_context.canvas.width / 2 - myRectangle.width / 2;
    var nextX = amplitude * Math.sin(time * 2 * Math.PI / period) + centerX;
    myRectangle.x = nextX;

    var radius = 150;
    var offsetX = nextX - centerX;
    myRectangle.y = Math.sqrt((radius*radius) + (offsetX*offsetX));

    // clear
    context.clearRect(0, 0, buffer_context.canvas.width, buffer_context.canvas.height);

    // draw

    // junk draw
    buffer_context.lineWidth = myRectangle.borderWidth;
    buffer_context.beginPath();
    buffer_context.moveTo(centerX, 300);
    //buffer_context.lineTo(myRectangle.x, myRectangle.y);
    buffer_context.quadraticCurveTo(centerX, buffer_context.canvas.height, myRectangle.x, myRectangle.y);
    buffer_context.quadraticCurveTo(myRectangle.x, myRectangle.y, myRectangle.x+5, myRectangle.y-5);
    buffer_context.stroke();
    buffer_context.closePath();

    context.drawImage(buffer, 0, 0);

    // request new frame
    requestAnimFrame(function() {
      animate(myRectangle, context, startTime, time);
    });
}

function curverunner (cx, curvelist){
    // Renders an "s" curve (set of points)
    for (var i=0; i<curvelist.length ;i++){
        cx.beginPath();
        cx.moveTo(curvelist[i].x, curvelist[i].y);
        cx.quadraticCurveTo(curvelist[i].x1, curvelist[i].y1, curvelist[i].x2, curvelist[i].y2);
        cx.quadraticCurveTo(curvelist[i].x3, curvelist[i].y3, curvelist[i].x4, curvelist[i].y4);
        cx.stroke();
        cx.closePath();

    }
    var finalpos = curvelist[curvelist.length-1];
    cx.moveTo(finalpos.x4, finalpos.y4);
};