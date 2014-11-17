/* Colorlib
   Color processing library
*/
define(function () {
    return {
        colormixer: function (hex, r, g, b) {
            return colormixer(hex, r, g, b);
        },
    };
});

function colormixer(hex, r, g, b){
  // pass in 3 values (scale of 0 to 1) for each R, G, B
  // you want each color to get mixed up. Holds proportional.
  var rgb = hexToRgb(hex);
  return rgbToHex(Math.random()*r+rgb.r, Math.random()*g+rgb.g, Math.random()*b+rgb.b);
}

//These 3 functions below shamelessly stolen from stack overflow because lazy.
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