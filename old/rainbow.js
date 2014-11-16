function randline(nsteps, x, y, cx) {
    var xinc = 10;
    var yinc = sample(15, 25);

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
    };

    if (nsteps > 0) {
       var res = randline(nsteps-1, points.x4, points.y4, cx);
       res.push(points);
       return res;
    }
    return [points];
}

function curverunner(cx, curvelist){
  for (var i=0; i<curvelist.length ;i++){
      cx.moveTo(curvelist[i].x, curvelist[i].y);
      cx.quadraticCurveTo(curvelist[i].x1, curvelist[i].y1, curvelist[i].x2, curvelist[i].y2);
      cx.quadraticCurveTo(curvelist[i].x3, curvelist[i].y3, curvelist[i].x4, curvelist[i].y4);
  }
  var finalpos = curvelist[curvelist.length-1];
  cx.moveTo(finalpos.x4, finalpos.y4);
}

function randlinerunner(cx){
  // Want multiple draws of the same generated path
  var x = Math.random()*250;
  var y = 150;
  var nsteps = 20;//sample(10,20);
  var pointlist = randline(nsteps, x, y, cx);

  cx.beginPath();
  curverunner(cx, pointlist);
  cx.strokeStyle = colormixer('#2222ff', 50, 50, 0);
  cx.lineWidth = 10;
  cx.stroke();
  cx.closePath();
  
  cx.translate(10,10);
  cx.beginPath();
  curverunner(cx, pointlist);
  cx.strokeStyle = colormixer('#ff2222', 0, 50, 50);
  cx.lineWidth = 10;
  cx.stroke();
  cx.closePath();
  
  cx.translate(-5,-5);
  cx.beginPath();
  curverunner(cx, pointlist);
  cx.strokeStyle = colormixer('#22ff22', 50, 0, 50);
  cx.lineWidth = 10;
  cx.stroke();
  cx.closePath();
}

function colormixer(hex, r, g, b){
  // pass in 3 values (scale of 0 to 1) for each R, G, B
  // you want each color to get mixed up. Holds proportional.
  var rgb = hexToRgb(hex);
  // var rgb_out = {
  //   r: Math.random()*r+rgb.r,
  //   g: Math.random()*g+rgb.g,
  //   b: Math.random()*g+rgb.g,
  // };
  return rgbToHex(Math.random()*r+rgb.r, Math.random()*g+rgb.g, Math.random()*b+rgb.b);
}

function componentToHex(c) {
    c = parseInt(c);
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function sample(small, large){
  var diff = large - small;
  return small + (Math.random()*diff);
}

function coinflip(){
  if(Math.random() > 0.5) {return true;} else {return false;}
}

function rolldie(sides){
  if (Math.random() < (1.0/sides)) {return true;} else {return false;}
}

