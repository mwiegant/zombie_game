/*
This is the zombie class. All zombie functionality goes into this file.
 */

(function() {

    var sprite = require("public/js/sprite.js");

    function _Zombie(_sheet_url, _width, _height, _xFrames, _yFrames) {

        var obj = sprite.create(_sheet_url, _width, _height, _xFrames, _yFrames);


        obj.update = function(data) {
            // todo implement zombie AI
        };

//        console.log("---> a zombie has been created");
        return obj;
    }

    exports("public/js/zombie.js", "create", _Zombie);


})();