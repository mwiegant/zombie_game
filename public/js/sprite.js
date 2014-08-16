/*
 * obj is the general Sprite object that all other objects will use as a parent.
 */

(function() {

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
        obj.xPos = 100;
        obj.yPos = 100;

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

        console.log("a new sprite has been created");
        return obj;
    }

    exports("public/js/sprite.js", "create", _Sprite);

})();
