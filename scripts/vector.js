define([], function () {
    function magnitude(v1){
        if (typeof v1.z == 'undefined') {
            return Math.sqrt((v1.x*v1.x) + (v1.y*v1.y));
        } else {
            return Math.sqrt((v1.x*v1.x) + (v1.y*v1.y) + (v1.z*v1.z));
        }
    };
    function normalize(v1){
        var mag = magnitude(v1);
        var out = {
            x: v1.x / mag, 
            x: v1.y / mag,
        };
        if (typeof v1.z !== 'undefined'){
            out.z = v1.z/mag;
        }
        return out;
    };
    function add(v1, v2){
        var out = {
            x: v1.x + v2.x,
            y: v1.y + v2.y,
        };
        if (typeof v1.z !== 'undefined'){
            out.z = v1.z + v2.z;
        }
        return out;
    };
    function subtract(v1, v2){
        var out = {
            x: v1.x - v2.x,
            y: v1.y - v2.y,
        };
        if (typeof v1.z !== 'undefined'){
            out.z = v1.z - v2.z;
        }
        return out;
    };
    function scalar(s, v1){
        var out = {
            x: s* v1.x,
            y: s* v1.y,
        };
        if (typeof v1.z !== 'undefined'){
            out.z = s * v1.z;
        }
        return out;
    }
    return {
        vector: function (){

        },
        magnitude: function(v1){
            return magnitude(v1);
        },
        normalize: function (v1) {
            return normalize(v1);
        },
        add: function(v1, v2){
            return add(v1, v2);
        },
        subtract: function(v1, v2){
            return subtract(v1, v2);
        },
        scalar: function(s, v1){
            return scalar(s, v1);
        },
        multiply: function(v1, v2) {

        }
    }
});