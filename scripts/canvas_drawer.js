/* Entity to handle rendering on the canvas
   TODO: handle switching between libraries or loading different ones
   TODO: redraw on user request
*/
define(['./rainbow'], function (rainbow) {

    return {
        render: function (cx) {
          rainbow.canvasDrawer(cx);
        },
    };
});
