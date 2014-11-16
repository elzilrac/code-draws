function randline(nsteps, x, y, cx, branchno) {
    branchno += 1;
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

    cx.moveTo(points.x, points.y);
    cx.quadraticCurveTo(points.x1, points.y1, points.x2, points.y2);
    cx.quadraticCurveTo(points.x3, points.y3, points.x4, points.y4);

    if (rolldie(5*branchno)) { // the more branches the less likely to branch
       return randline(20, x, y, cx);
    }

    if (nsteps > 0) {
       return randline(nsteps-1, points.x4, points.y4, cx);
    }
    return {x: points.x4, y:points.y4};
}

function randlinerunner(){
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  var x = Math.random()*250;
  var y = 150;
  cx.moveTo(x, y);
  var nsteps = 20;//sample(10,20);
  var finalpos = randline(nsteps, x, y, cx, 0);
  cx.moveTo(finalpos.x, finalpos.y);
  cx.lineWidth = 1;
  cx.closePath();
  cx.stroke();
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