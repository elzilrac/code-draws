require(['./canvas_drawer'], function(canvas_drawer) {
    canvas_drawer.pageSetup();
    var cx = document.querySelector("canvas").getContext("2d");
    canvas_drawer.render(cx);
});