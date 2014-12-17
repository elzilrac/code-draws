define(['./animate',], function (animate) {
    return {
        canvasDrawer: function (cx) {
            animate.setupWindow();
            var animator = new animate.Animator(cx, metrinomeDrawer);
            animate.startAnimation(cx);
            animator.doAnimation();

        },
    }
});


function metrinomeDrawer(context, runtime, kwargs){
    kwargs = typeof kwargs !== 'undefined' ? kwargs : {fixedPoint: {x:context.canvas.width / 2, y: 300}, movingPoint: {x:context.canvas.width / 2, y:75} };

    var amplitude = 150;
    var period = 2000;
    var centerX = context.canvas.width / 2;
    var nextX = amplitude * Math.sin(runtime * 2 * Math.PI / period) + centerX;
    kwargs.movingPoint.x = nextX;

    var radius = 150;
    var offsetX = nextX - centerX;
    kwargs.movingPoint.y = Math.sqrt((radius*radius) + (offsetX*offsetX));

    // clear
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // junk draw
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(kwargs.fixedPoint.x, kwargs.fixedPoint.y);

    context.quadraticCurveTo(kwargs.fixedPoint.x, context.canvas.height, kwargs.movingPoint.x, kwargs.movingPoint.y);
    context.quadraticCurveTo(kwargs.movingPoint.x, kwargs.movingPoint.y, kwargs.movingPoint.x+5, kwargs.movingPoint.y-5);
    context.stroke();
    context.closePath();

    return kwargs;
}
