/*
This is the zombie class. All zombie functionality goes into this file.
 */

(function() {

    var sprite = require("public/js/sprite.js");

    function _Zombie(_sheet) {

        var obj = sprite.create(_sheet);
        obj.hp = 3;

        obj.update = function(data) {
            // todo implement zombie AI

        };

        obj.collidesWith = function(bullet) {
            var bulletX = bullet.xPos;
            var bulletY = bullet.yPos;

            var zombieXLeft = obj.xPos + 5;
            var zombieXRight = obj.xPos + obj.width - 5;
            var zombieYTop = obj.yPos;
            var zombieYBottom = obj.yPos + obj.height;

            var collided = false;

            if(bulletX > zombieXLeft && bulletX < zombieXRight) {
                if(bulletY > zombieYTop && bulletY < zombieYBottom)
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

//        console.log("---> a zombie has been created");
        return obj;
    }

    exports("public/js/zombie.js", "create", _Zombie);


})();