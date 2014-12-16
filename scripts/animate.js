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

function drawRectangle(myRectangle, context) {
    context.beginPath();
    context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.lineWidth = myRectangle.borderWidth;
    context.strokeStyle = 'black';
    context.stroke();
}

function animate(myRectangle, context, startTime) {
    // TODO: ugly global
    if (STOP_ANIMATE){
        return true;
    }
    // update
    var time = (new Date()).getTime() - startTime;
    var amplitude = 150;

    // in ms
    var period = 2000;
    var centerX = context.canvas.width / 2 - myRectangle.width / 2;
    var nextX = amplitude * Math.sin(time * 2 * Math.PI / period) + centerX;
    myRectangle.x = nextX;

    var radius = 150;
    var offsetX = nextX - centerX;
    myRectangle.y = Math.sqrt((radius*radius) + (offsetX*offsetX));

    // clear
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // draw
    // drawRectangle(myRectangle, context);

    // junk draw
    context.lineWidth = myRectangle.borderWidth;
    context.beginPath();
    context.moveTo(centerX, 300);
    // context.quadraticCurveTo(centerX, context.canvas.height, myRectangle.x, myRectangle.y);
    context.quadraticCurveTo(myRectangle.x, myRectangle.y, myRectangle.x+5, myRectangle.y-5);
    context.stroke();
    context.closePath();

    // request new frame
    requestAnimFrame(function() {
      animate(myRectangle, context, startTime);
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