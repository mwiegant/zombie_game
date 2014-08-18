/*
 * This file creates the general sprite object that all other objects depend on.
 *
 * Be careful when editing this file as you can easily break everything else if this file changes significantly.
 */

(function() {

      function _Sprite(_sheet) {
        var obj= {};
        var img = new Image();
        img.src = _sheet.url;

        obj.sheet = img;
        obj.width = _sheet.width;
        obj.height = _sheet.height;
        obj.possibleFramesX = _sheet.xFrames;
        obj.possibleFramesY = _sheet.yFrames;
        obj.frameX = 0;
        obj.frameY = 0;
        obj.xPos = 10;
        obj.yPos = 10;
        obj.hp = 1;
        obj.deleteThis = false;

        obj.draw = function() {
            window.ctx.drawImage(
                obj.sheet,
                obj.frameX * obj.width,
                obj.frameY * obj.height,
                obj.width,
                obj.height,
                obj.xPos,
                obj.yPos,
                obj.width,
                obj.height
            );

        };

//        console.log("a new sprite has been created");
        return obj;
    }

    exports("public/js/sprite.js", "create", _Sprite);

})();
