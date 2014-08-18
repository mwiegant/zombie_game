/*
This file contains the code for explosive barrels.
 */

(function() {

    var sprite = require("public/js/sprite.js");

    function _Barrel(_sheet, _xPos, _yPos) {

        var obj = sprite.create(_sheet);
        var FRAME_TIME = 1;

        obj.xPos = _xPos;
        obj.yPos = _yPos;
        obj.exploding = false;
        obj.frameTimer = 0;


        obj.update = function(data) {
            if(obj.exploding) {
                if(obj.frameX < obj.possibleFramesX) {
                    // this slows down how fast this object goes through the animation. . .
                    if( obj.frameTimer < FRAME_TIME) {
                        obj.frameTimer++;
                    }
                    else {
                        obj.frameTimer = 0;
                        obj.frameX++;
                        console.log("## going to next barrel frame");
                    }
                }
                else {
                    this.deleteThis = true;     // if this barrel has shown the full animation, then destroy it
                }
            }
        };

        obj.collidesWith = function(bullet) {
            var bulletX = bullet.xPos;
            var bulletY = bullet.yPos;

            var barrelLeft = obj.xPos + 5;
            var barrelRight = obj.xPos + obj.width - 5;
            var barrelTop = obj.yPos;
            var barrelBottom = obj.yPos + obj.height;

            var collided = false;

            if(bulletX > barrelLeft && bulletX < barrelRight) {
                if(bulletY > barrelTop && bulletY < barrelBottom)
                    collided = obj.exploding = true;
            }


            return collided;
        };

//        console.log("---> a barrel has been created");
        return obj;
    }

    exports("public/js/barrel.js", "create", _Barrel);


})();