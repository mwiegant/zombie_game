


(function() {

    var sprite = require("public/js/sprite.js");

    function _Shooter(_sheet_url, _width, _height, _xFrames, _yFrames) {

        var obj = sprite.create(_sheet_url, _width, _height, _xFrames, _yFrames);





        obj.update = function(data) {
            // todo update the frame count

            this.xPos = data.playerX;
            this.yPos = data.playerY;
            this.rotateAngle = data.playerRotate;
        };

        obj.draw = function() {
            // rotate the image, as the sprite sheet I am currently using only has 1 facing in it
//            window.ctx.save();
//            window.ctx.translate(obj.xPos + (obj.width / 2), obj.yPos + (obj.height / 2) );
//            window.ctx.rotate(obj.rotateAngle);

            window.ctx.drawImage(
                obj.sheet,
                // clip the selected part of the sprite sheet
                obj.frameX * obj.width, obj.frameY * obj.height, obj.width, obj.height,
                // point to the location on the canvas to draw the sprite
                obj.xPos, obj.yPos, obj.width, obj.height
            );


//            window.ctx.restore();

        }

//        console.log("---> a shooter has been created");
        return obj;
    }

    exports("public/js/shooter.js", "create", _Shooter);


})();