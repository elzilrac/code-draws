define(['./colorlib', './random', './tree'], function (colorlib, random, tree) {

    function hillscape(cx){
        // draws multiple hills in a plane. Trees on top of hills?
        for (var i=0; i<random.sample(2,5); i++){
            var hillsize = random.sample(50,100);
            hill(cx, Math.random()*cx.canvas.width, cx.canvas.height, hillsize);
        }
    }

    function foreground(cx){
        var forestSize = 3;
            var treeHeight = (cx.canvas.height ) * 3.35; // since we scale smaller, move it down
            cx.scale(0.3, 0.3);

            for (var i=0; i< forestSize; i++){
                var xpos = random.sample(cx.canvas.width * .10, cx.canvas.width * 3);
                tree.drawtree(cx, xpos,  treeHeight);
            }
    }

    function midground(cx){
        var mgcolor = colorlib.colormixer("#898c64", 100, 100, 100);
        cx.fillStyle = mgcolor;
        cx.strokestyle = mgcolor;
        // hill(cx, cx.canvas.width/2, cx.canvas.height, 100);
        hillscape(cx);
        mgcolor = colorlib.lighten(mgcolor, 0.2);
        cx.fillStyle = mgcolor;
        cx.strokestyle = mgcolor;
        hillscape(cx);
    };

    function background(cx){
        var bgcolor1 = colorlib.colormixer("#465ac3", 100, 100, 100);
        var bgcolor2 = colorlib.colormixer("#9afbff", 100, 100, 100);
        var gradient = cx.createLinearGradient(0, 0, 0, cx.canvas.height);
        gradient.addColorStop(0, bgcolor1);
        gradient.addColorStop(1, bgcolor2);
        cx.fillStyle = gradient;
        cx.fillRect(0, 0, cx.canvas.width, cx.canvas.height);

    };

    return {
        canvasDrawer: function (cx) {
            background(cx);
            midground(cx);
            foreground(cx);

        },
    }

});

function hill(cx, x, y, width){
    cx.beginPath();
    cx.arc(x, y, width, Math.PI, Math.PI*2, false);
    cx.closePath();
    cx.fill();
}
