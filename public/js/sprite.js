/*
 * This file creates the general sprite object that all other objects depend on.
 *
 * Be careful when editing this file as you can easily break everything else if this file changes significantly.
 */

(function() {

    //todo: turn the list of parameters into properties on an object that i can just pass into this object
    function _Sprite(_sheet_url, _width, _height, _xFrames, _yFrames) {
        var obj= {};
        var img = new Image();
        img.src = _sheet_url;

        obj.sheet = img;
        obj.width = _width;
        obj.height = _height;
        obj.posibleFramesX = _xFrames;
        obj.posibleFramesY = _yFrames;
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
