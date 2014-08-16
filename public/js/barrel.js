/*
This file contains the code for explosive barrels.
 */

(function() {

    var sprite = require("public/js/sprite.js");

    //todo: turn the list of parameters into properties on an object that i can just pass into this object
    function _Barrel(_sheet_url, _width, _height, _xFrames, _yFrames) {

        var obj = sprite.create(_sheet_url, _width, _height, _xFrames, _yFrames);

        obj.update = function(data) {
            // todo: if this barrel has been hit, go through its frames

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
                    collided = true;
            }

            if(collided) {
                obj.xPos += bullet.xVel;
                obj.yPos += bullet.yVel;

                obj.hp--;
                if(obj.hp < 1)  obj.deleteThis = true;
            }

            return collided;
        };

//        console.log("---> a barrel has been created");
        return obj;
    }

    exports("public/js/barrel.js", "create", _Barrel);


})();