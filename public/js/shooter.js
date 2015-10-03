


(function() {

    var sprite = require("public/js/sprite.js");

    function _Shooter(_sheet) {

        var obj = sprite.create(_sheet);

        obj.hp = 10;

        obj.update = function(data) {
            //todo check for zombie attacks (and death of this unit)

            this.frameX = data.playerXFrame;
            this.frameY = data.playerYFrame;

            if( this.frameX > this.possibleFramesX)     this.frameX = data.playerXFrame = 0;
            else if( this.frameX < 0 )                  this.frameX = data.playerXFrame = this.possibleFramesX;

            if( this.frameY > this.possibleFramesY || this.frameY < 0  ) {
                console.log("There was some kind of error in setting the y-frame for the player shooter object");
                this.frameY = 0;
            }

            this.xPos = data.playerX;
            this.yPos = data.playerY;
        };

        obj.draw = function() {


            window.ctx.drawImage(
                obj.sheet,
                // clip the selected part of the sprite sheet
                obj.frameX * obj.width, obj.frameY * obj.height, obj.width, obj.height,
                // point to the location on the canvas to draw the sprite
                obj.xPos, obj.yPos, obj.width, obj.height
            );


//            window.ctx.restore();

        };

//        console.log("---> a shooter has been created");
        return obj;
    }

    exports("public/js/shooter.js", "create", _Shooter);


})();