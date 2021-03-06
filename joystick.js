var JoystickManager = {
    started: false,
    startPosition: [null, null],
    container: null,
    circle: null,
    point: null,
    diameter: 100,
    pointDiameter: 10,
    init: function() {
        JoystickManager.container = document.getElementById("joystick-container");
        JoystickManager.circle = document.getElementById("circle");
        JoystickManager.point = document.getElementById("point");
        JoystickManager.initEvents();
    },
    initEvents: function() {
        JoystickManager.container.onmousedown = function(e){
            e.preventDefault();
            var coords = [e.clientX, e.clientY];
            JoystickManager.startMove(coords);
        };
        JoystickManager.container.ontouchstart = function(e){
            e.preventDefault();
            var touchList = e.changedTouches;
            var coords = [touchList[0].clientX, touchList[0].clientY];
            JoystickManager.startMove(coords);
        };
        JoystickManager.container.onmousemove = function(e){
            e.preventDefault();
            JoystickManager.movePoint([e.clientX, e.clientY]);
        };
        JoystickManager.container.ontouchmove = function(e){
            e.preventDefault();
            var touchList = e.changedTouches;
            const coords = [touchList[0].clientX, touchList[0].clientY];
            JoystickManager.movePoint(coords);
        };
        JoystickManager.container.oncontextmenu = function(e){
            e.preventDefault();
        };
        JoystickManager.container.onmouseout = function(e){
            e.preventDefault();
            JoystickManager.stopMove();
        };
        JoystickManager.container.onmouseup = function(e){
            e.preventDefault();
            JoystickManager.stopMove();
        };
        JoystickManager.container.ontouchend = function(e){
            e.preventDefault();
            JoystickManager.stopMove();
        };
    },
    distance: function(coords) {
        var xPow2 = Math.pow((JoystickManager.startPosition[0] - coords[0]), 2)
        var yPow2 = Math.pow((JoystickManager.startPosition[1] - coords[1]), 2)
        return Math.sqrt(xPow2 + yPow2)
    },
    clearJoystick: function() {
        JoystickManager.circle.style.display = "none";
    },
    setJoystick: function() {
        var left = JoystickManager.startPosition[0] - JoystickManager.container.offsetLeft - JoystickManager.diameter/2;
        var top = JoystickManager.startPosition[1] - JoystickManager.container.offsetTop - JoystickManager.diameter/2;
        JoystickManager.circle.style.top = top + "px";
        JoystickManager.circle.style.left = left + "px";
        JoystickManager.circle.style.display = "block";

        JoystickManager.movePoint(JoystickManager.startPosition)
    },
    movePoint: function(coords) {
        if (JoystickManager.started) {
            var dist = JoystickManager.distance(coords)
            var left = coords[0] - JoystickManager.startPosition[0];
            var top = coords[1] - JoystickManager.startPosition[1];
            if (dist > JoystickManager.diameter/2) {
                left = (left * JoystickManager.diameter) / (dist * 2)
                top = (top * JoystickManager.diameter) / (dist * 2)
            }
            JoystickManager.point.style.top = JoystickManager.diameter/2 - JoystickManager.pointDiameter/2 + top + "px";
            JoystickManager.point.style.left = JoystickManager.diameter/2 - JoystickManager.pointDiameter/2 + left + "px";    
        }
    },
    startMove: function(coords) {
        JoystickManager.started = true;
        JoystickManager.startPosition = coords;
        JoystickManager.setJoystick(coords)
    },
    stopMove: function() {
        JoystickManager.started = false;
        JoystickManager.startPosition = [null, null];
        JoystickManager.clearJoystick();
    },
};