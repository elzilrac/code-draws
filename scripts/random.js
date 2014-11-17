/* The Random library
   Contains functions for simulating random events
*/
define(function () {
    return {

        sample: function (small, large){
          var diff = large - small;
          return small + (Math.random()*diff);
        },

        draw: function (arr){
            // draw a single element from the array
            var size = arr.length;
            var idx = Math.floor(Math.random()*size);
            return arr[idx];
        },

        coinflip: function (){
          if(Math.random() > 0.5) {return true;} else {return false;}
        },

        rolldie: function (sides){
          if (Math.random() < (1.0/sides)) {return true;} else {return false;}
        },

    };
});
