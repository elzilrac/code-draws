/* Colorlib
   Color processing library
*/
define(function () {
    return {
        colormixer: function (hex, r, g, b) {
            return colormixer(hex, r, g, b);
        },
        lighten: function (hex, scale){
          return lighten(hex, scale);
        }
    };
});

function lighten(hex, scale){
  // washes out a color. Adds "scale" (should be 0 to 1)

  var rgb = hexToRgb(hex);
  var normalized = {
    r: Math.min(rgb.r + (rgb.r*scale), 254),
    g: Math.min(rgb.g + (rgb.g*scale), 254),
    b: Math.min(rgb.b + (rgb.b*scale), 254),
  }

  return rgbToHex(normalized.r, normalized.g, normalized.b);
}

function colormixer(hex, r, g, b){
  // pass in 3 values (scale of 0 to 1) for each R, G, B
  // you want each color to get mixed up. Holds proportional.
  var rgb = hexToRgb(hex);
  var raw_vector = {
    r:  Math.random()*r+rgb.r,
    g:  Math.random()*g+rgb.g,
    b:  Math.random()*b+rgb.b};

  var normalized = normalize(raw_vector.r, raw_vector.g, raw_vector.b);
  var scalar = Math.max(Math.max(rgb.r, rgb.g), rgb.b);

  return rgbToHex(normalized.x*scalar, normalized.y*scalar, normalized.z*scalar);
}

function normalize(x, y, z){
  var mag = Math.sqrt((x*x) + (y*y) + (z*z));
  return {x: x/mag, y: y/mag, z: z/mag};
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