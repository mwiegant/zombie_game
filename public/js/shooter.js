


(function() {

    var sprite = require("public/js/sprite.js");

    function _Shooter(_sheet_url, _width, _height, _xFrames, _yFrames) {

        var obj = sprite.create(_sheet_url, _width, _height, _xFrames, _yFrames);





        obj.update = function() {
            // todo update the frame count and the position
        };


        console.log("---> a shooter has been created");
        return obj;
    }

    exports("public/js/shooter.js", "create", _Shooter);


})();