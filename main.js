/*
 * This is the program driver for the game.
 *
 * It imports all the other files into the program and runs the entire game
 */

(function() {
    var shooter = require("public/js/shooter.js");

    // todo: require the rest of the modules
//    var input = require("helperMods/input.js");


    var allImages = [
        "./public/img/barrel_map.png",
        "./public/img/player_map.png",
        "./public/img/zombie_map.png"
    ];

    var UP_ARROW = 38;
    var DOWN_ARROW = 40;
    var LEFT_ARROW = 37;
    var RIGHT_ARROW = 39;
    var SPACEBAR = 32;
    var ENTER = 13;
    var frame = 0;
    var lastTime = 0;

    var player;


    function _createGame() {

        var obj = {};

        obj.preloadImages = function(arr, cb) {
            var newImages = [];
            var loadedImages = 0;
            var arr = (typeof arr!="object")? [arr] : arr;
            function imageloadpost() {
                loadedImages++;
                if(loadedImages==arr.length) {
                    console.log("All images have loaded, beginning program execution");
                }
            }
            for(var i=0; i<arr.length; i++) {
                newImages[i] = new Image();
                newImages[i].src = arr[i];
                newImages[i].onload = function() {
                    imageloadpost();
                };
                newImages[i].onerror = function() {
                    imageloadpost();
                };
            }
            return cb();
        };

        obj.setupInput = function() {
            input.listen(UP_ARROW, function(_data){
                // todo: hook up to player position and sprite
            });

            input.listen(DOWN_ARROW, function(_data) {
                // todo: hook up to player position and sprite
            });

            input.listen(LEFT_ARROW, function(_data) {
                // todo: hook up to player position and sprite
            });

            input.listen(RIGHT_ARROW, function(_data) {
                // todo: hook up to player position and sprite
            });

            input.listen(SPACEBAR, function(_data) {
                // todo: hook up to fire projectiles functionality

            });
            input.listen(ENTER, function(_data) {
                // todo: hook up to drop barrel functionality

            });
        };

        obj.setupGame = function() {
            if(frame === 0){
                player = shooter.create("./public/img/player_map.png", 125, 120, 5, 4);
            }


        };

        obj.update = function() {

            // todo: update program state, especially using user input



            // todo: update objects




        };

        obj.draw = function() {

            player.draw();

        };

        obj.requestAnimFrame = function(cb) {
            function fallback(cb) {
                window.setTimeout(cb, 10);
            }
            var func = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                fallback;
            func(cb);
        };

        obj.run = function() {
            if(Date.now () - lastTime > 1){
                lastTime = Date.now();
                obj.update();
                obj.draw();
            }
            obj.requestAnimFrame( obj.run );
        };

// ===========/////

        // after all images have been loaded, start program execution
        obj.preloadImages(allImages, function() {
            obj.setupGame();
            obj.run();
        });

// ===========\\\\\

        return obj;

    }

    exports("main.js", "createGame", _createGame);

})();