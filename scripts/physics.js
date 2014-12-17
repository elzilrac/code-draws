define(['./animate', './vector', './random'], function (animate, vector, random) {
    function physicsDrawer(context, runtime, kwargs){
        kwargs = typeof kwargs !== 'undefined' ? kwargs : {fixedPoint: {x:context.canvas.width/2, y: 300}, movingPoint: {x:context.canvas.width/2, y:150} };

        var force_vector = {
            x: random.sample(-3, 3),
            y: random.sample(-3, 3),
        };

        var amplitude = 150;
        var period = 2000;

        var centerX = context.canvas.width / 2;
        var nextX = amplitude * Math.sin(runtime * 2 * Math.PI / period) + centerX;

        var radius = 150;
        var offsetX = nextX - centerX;
        var nextY = Math.sqrt((radius*radius) + (offsetX*offsetX));

        var goal = {x: nextX, y: nextY}; // the goal course

        // how far off is our point?
        var difference = vector.subtract(kwargs.movingPoint, goal);
        // add in 25 % of the correct direction
        kwargs.movingPoint = vector.subtract(kwargs.movingPoint, vector.scalar(0.25, difference));

        // add in the random force
        kwargs.movingPoint = vector.add(kwargs.movingPoint, force_vector);        

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

    return {
        canvasDrawer: function (cx) {
            animate.setupWindow();
            var animator = new animate.Animator(cx, physicsDrawer);
            animate.startAnimation(cx);
            animator.doAnimation();

        },
    }
});
