define(['./colorlib', './random'], function (colorlib, random) {


    function randline(nsteps, x, y, branch, orientation) {
        orientation = typeof orientation !== 'undefined' ? orientation : random.coinflip();

        var xinc = random.sample(8, 12);
        // Mirror the x values to flip the branching left if "negative" orientation
        if (!orientation){
            xinc *= -1;
        }
        var yinc = random.sample(10, 25);
        // The increments scale down a bit with branch and steps
        // var scale = (branch+nsteps)/3;
        // xinc*= scale;
        // yinc*= scale;

        var points = {
          x: x,
          y: y,
          x1: x,
          y1: y-yinc,
          x2: x+xinc,
          y2: y-yinc*1.1,
          x3: x+xinc*3,
          y3: y-yinc*1.2,
          x4: x+xinc*3,
          y4: y-yinc*3,
          branch: branch,
          step: nsteps,
        };

        function canbranch(branch, steps){
            // rolls the dice to see if it branches
            // gets more branchy towards the leaves, but also less likely to branch if you are a leaf
            var dicevalue = Math.max((2.0/Math.log(steps)), 1) - (branch*0.6);
            dicevalue = Math.max(dicevalue, 2);
            return random.rolldie(dicevalue);
        }


        if (nsteps > 0) {
            var res = randline(nsteps-1, points.x4, points.y4, branch, orientation);
            if (canbranch(branch, nsteps)) { // the more branches the less likely to branch
                // we can actually start the branch from a number of the points, so let's pick one
                var starting = random.draw([[x, y],[points.x2, points.y2]]);
                var newsteps = random.sample(nsteps-1, nsteps);
                res = res.concat(randline(nsteps, starting[0], starting[1], branch +1, !orientation));
            }
            res.push(points);
            return res;
        }
        return [points];
    };

    function curverunner (cx, curvelist){
        // Renders an "s" curve (set of points)
        for (var i=0; i<curvelist.length ;i++){
            cx.beginPath();
            cx.moveTo(curvelist[i].x, curvelist[i].y);
            cx.quadraticCurveTo(curvelist[i].x1, curvelist[i].y1, curvelist[i].x2, curvelist[i].y2);
            cx.quadraticCurveTo(curvelist[i].x3, curvelist[i].y3, curvelist[i].x4, curvelist[i].y4);
            // as branch and step increase, we want to decrease linewidth
            var weight = ((curvelist[i].branch * 0.25) + curvelist[i].step);
            cx.lineWidth = Math.min(1+weight, 5);
            cx.stroke();
            cx.closePath();
        }
        var finalpos = curvelist[curvelist.length-1];
        cx.moveTo(finalpos.x4, finalpos.y4);
    };

    function drawtree(cx, x, y){
        // Randomly draw a tree at a location
        var nsteps = Math.floor(random.sample(3,5));
        var pointlist = randline(nsteps, x, y, 1);
        cx.strokeStyle = colorlib.colormixer('#4e3b1d', 50, 50, 50);
        curverunner(cx, pointlist);
    };

    return {
        canvasDrawer: function (cx) {
            var forestSize = 1;
            var treeHeight = (cx.canvas.height * .80) * 2; // since we scale smaller, move it down
            cx.scale(0.5, 0.5);

            for (var i=0; i< forestSize; i++){
                var xpos = random.sample(cx.canvas.width * .10, cx.canvas.width * .90);
                drawtree(cx, xpos,  treeHeight);
            }

        },
    }

});
