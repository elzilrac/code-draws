/* Entity to handle rendering on the canvas
    TODO: handle switching between libraries or loading different ones
    TODO: redraw on user request
*/

define(['./tree', './rainbow'], function (tree, rainbow) {
    var available = [
        {lib:tree, desc:'basic tree', date:'20141116'}, 
        {lib:rainbow, desc:'squiggly rainbow', date:'20141115'},
    ];

    function clear (cx){
          cx.setTransform(1, 0, 0, 1, 0, 0);
          cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height);
        }

    return {
        pageSetup: function () {
          
          var dd = document.createElement("select");
          dd.name = "ddWhichNamed";
          dd.id = "ddWhichNamed";
          var i = 0;
          for (var i in available){
              if (available.hasOwnProperty(i)){
                  var item = available[i];
                  dd.options[dd.length] = new Option(item.desc+' - '+item.date, i);
                  i +=1;
              }
          }
          dd.onchange = function(){require(['./canvas_drawer'], function(canvas_drawer) {
      var cx = document.querySelector("canvas").getContext("2d");
      canvas_drawer.render(cx);
    });};
          document.body.appendChild(dd);
        },

        render: function (cx) {
            clear(cx);
            var idx = document.getElementById("ddWhichNamed").value;
            available[idx].lib.canvasDrawer(cx);
        },
    };
});


