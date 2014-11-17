/* Entity to handle rendering on the canvas
   TODO: handle switching between libraries or loading different ones
   TODO: redraw on user request
*/
define(['./tree', './rainbow'], function (tree, rainbow) {

    return {
        render: function (cx) {
          tree.canvasDrawer(cx);
          // rainbow.canvasDrawer(cx);
        },
    };
});
