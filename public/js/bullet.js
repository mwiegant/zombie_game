/*
 * This is the bullet class, bullets are shot by the player
 */

(function() {

    var sprite = require("public/js/sprite.js");

    function _Bullet(_xPos, _yPos, _xVel, _yVel) {
        var _sheet_url = "./public/img/bullet.png";
        var _size = 16;
        var _frames = 1;
        var obj = sprite.create(_sheet_url, _size, _size, _frames, _frames);

        obj.initX = _xPos;
        obj.initY = _yPos;
        obj.xPos = _xPos;
        obj.yPos = _yPos;
        obj.maxDistance = 50;
        obj.deleteThis = false;

        obj.update = function(data) {
            obj.xPos += _xVel;
            obj.yPos += _yVel;

            if( obj.xPos < 0 || obj.xPos > window.canvasWidth ) {
                obj.deleteThis = true;
            }
            else if( obj.yPos < 0 || obj.yPos > window.canvasHeight ) {
                obj.deleteThis = true;
            }
            else if( Math.abs(obj.yPos - obj.initY) > obj.maxDistance || Math.abs(obj.yPos - obj.initY) > obj.maxDistance ) {
                obj.deleteThis = true;
            }
        };

//        console.log("---> a bullet has been created");
        return obj;
    }

    exports("public/js/bullet.js", "create", _Bullet);


})();

