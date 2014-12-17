define([], function () {
    return {
        setupWindow: function(){
            // Prep the browser window for animating
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
        },
        stopAnimation: function(context){
            context.canvas.setAttribute('animating', 'false');
        },
        startAnimation: function(context){
            context.canvas.setAttribute('animating', 'true');
        },
        Animator: function(context, animationFunction){
            /* Animator: a simple frame buffered animator
                takes in a canvas context and an animationFunction (does the 
                drawing)
                animationFunction's signature must be (context, runtime, kwargs)
                    context - canvas context to draw to (technically the buffer)
                    runtime - in milliseconds since doAnimaion first gets called
                    kwargs - the output of the animationFunction gets passed
                        back in on subsiquent frame renders (pass forward data)
            */
            this.runtime = 0;
            this.context = context;
            this.context.canvas.setAttribute('animating', 'true');
            //setAttribute() 
            this.createFrameBuffer = function(){
                var buffer = document.createElement('canvas');
                buffer.width = this.context.canvas.width;
                buffer.height = this.context.canvas.height;
                return buffer;
            };
            this.buffer = this.createFrameBuffer();
            this.doAnimation = function() {bufferedAnimation(this.context, animationFunction, this.buffer)};

        },
    }
});

function bufferedAnimation(context, drawer, buffer, runtime, lastTime, drawerOut){
    lastTime = typeof lastTime !== 'undefined' ? lastTime : (new Date()).getTime();
    runtime = typeof runtime !== 'undefined' ? runtime : 0;
    
    var is_animating = context.canvas.getAttribute('animating') == 'true';
    if (!is_animating){
        return;
    }
    // clear the buffer
    buffer.getContext('2d').clearRect(0, 0, buffer.width, buffer.height);

    // Keep track of elapsed time
    var time = (new Date()).getTime();
    runtime += (time - lastTime);

    // do the drawing to the buffer
    // ...
    var buffer_ctx = buffer.getContext('2d');
    drawerOut = drawer(buffer_ctx, time, drawerOut);

    // clear the main canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // copy the buffer 
    context.drawImage(buffer, 0, 0);

    // request new frame
    requestAnimFrame(function() {
        bufferedAnimation(context, drawer, buffer, runtime, time, drawerOut);
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