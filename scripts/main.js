require(['./canvas_drawer'], function(canvas_drawer) {
    var cx = document.querySelector("canvas").getContext("2d");
    canvas_drawer.render(cx);
});