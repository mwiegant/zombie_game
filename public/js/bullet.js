/*
 * This is the bullet class, bullets are shot by the player
 */

(function() {

    var sprite = require("public/js/sprite.js");

    function _Bullet(_sheet, _xPos, _yPos, _xVel, _yVel) {
        var obj = sprite.create(_sheet);
        var firstUpdate = true;


        obj.speed = 2;
        obj.maxDistance = 150;

        obj.initX = _xPos;
        obj.initY = _yPos;
        obj.xPos = _xPos;
        obj.yPos = _yPos;
        obj.xVel = _xVel * obj.speed;
        obj.yVel = _yVel * obj.speed;

        obj.xFrames = _xVel;
        obj.yFrames = _yVel;

        function adjustDirection() {
            if( obj.xVel > 0)           obj.frameX = 0;
            else if( obj.yVel > 0)      obj.frameX = 1;
            else if( obj.xVel < 0)      obj.frameX = 2;
            else if( obj.yVel < 0)      obj.frameX = 3;

            firstUpdate = false;
        }

        obj.update = function(data) {
            if(firstUpdate)     adjustDirection();      // this ensures that the bullet loads the right sprite image

            obj.xPos += obj.xVel;
            obj.yPos += obj.yVel;

            if( obj.xPos < 0 || obj.xPos > window.canvasWidth ) {
                obj.deleteThis = true;
            }
            else if( obj.yPos < 0 || obj.yPos > window.canvasHeight ) {
                obj.deleteThis = true;
            }
            else if( Math.abs(obj.yPos - obj.initY) > obj.maxDistance || Math.abs(obj.xPos - obj.initX) > obj.maxDistance ) {
                obj.deleteThis = true;
            }
        };

//        console.log("---> a bullet has been created");
        return obj;
    }

    exports("public/js/bullet.js", "create", _Bullet);


})();

