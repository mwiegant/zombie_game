/*
 * This is the program driver for the game.
 *
 * It imports all the other files into the program and runs the entire game
 */

(function() {
    var shooter = require("public/js/shooter.js");
    var zombie = require('public/js/zombie.js');
    var bullet = require('public/js/bullet.js');
    var barrel = require('public/js/barrel.js');

    // todo: require the rest of the modules
    var input = require("public/js/input.js");


    var allImages = [
        "./public/img/bullet.png",
        "./public/img/barrel_map.png",
        "./public/img/player_map.png",
        "./public/img/zombie_map.png"
    ];

    var W_KEY = 87;
    var A_KEY = 65;
    var S_KEY = 83;
    var D_KEY = 68;
    var SPACEBAR = 32;
    var ENTER = 13;
    var frame = 0;
    var lastTime = 0;

    var player;
    var zombies = [];
    var bullets = [];

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
            //todo set up input with default values
            input.setData("playerX", 100);
            input.setData("playerY", 100);
            input.setData("playerRotate", 0);
            input.setData("firingOrientation", [0,1]);


            input.listen(W_KEY, function(_data){
                var yPos = _data.playerY;
                if(yPos > 0 && yPos - 120 < window.canvasHeight)
                    _data.playerY = yPos - 4;

                _data.playerRotate = Math.PI;
                _data.firingOrientation = [0, -1];
            });

            input.listen(S_KEY, function(_data) {
                var yPos = _data.playerY;
                if(yPos > 0 && yPos - 120 < window.canvasHeight)
                    _data.playerY = yPos + 4;

                _data.playerRotate = 0;
                _data.firingOrientation = [0, 1];
            });

            input.listen(A_KEY, function(_data) {
                var xPos = _data.playerX;
                if(xPos > 0 && xPos - 125 < window.canvasWidth)
                    _data.playerX = xPos - 4;

                _data.playerRotate = Math.PI / 2;
                _data.firingOrientation = [-1, 0];
            });

            input.listen(D_KEY, function(_data) {
                var xPos = _data.playerX;
                if(xPos > 0 && xPos - 125 < window.canvasWidth)
                    _data.playerX = xPos + 4;

                _data.playerRotate = Math.PI / -2;
                _data.firingOrientation = [1, 0];
            });

            input.listen(SPACEBAR, function(_data) {
                bullets.push( bullet.create( _data.playerX, _data.playerY, _data.firingOrientation[0] * 2, _data.firingOrientation[1] * 2) );
            });
            input.listen(ENTER, function(_data) {
                // todo: hook up to drop barrel functionality

            });
        };

        obj.setupGame = function() {
            if(frame === 0){
                player = shooter.create("./public/img/player_map.png", 125, 120, 5, 4);
                zombies.push( zombie.create("./public/img/zombie_map.png", 40, 56, 4, 4) );

                obj.setupInput();
            }


        };

        obj.update = function() {

            // todo: update program state, especially using user input



            // todo: update player, zombie, and other objects
            player.update( input.getAllData() );

            bullets.forEach( function(_bullet) {
                _bullet.update( input.getAllData() );

                if(_bullet.deleteThis) {
                    var index = bullets.indexOf(_bullet);
                    bullets.splice(index, 1);
                    console.log("## a bullet has been destroyed");
                }

            });

            zombies.forEach( function(_zombie) {
                _zombie.update( input.getAllData() );
            });

        };

        obj.draw = function() {
            window.ctx.clearRect(0,0, window.canvasWidth, window.canvasHeight);

            // todo: draw player, zombies, and other objects
            player.draw();

            bullets.forEach( function(_bullet) {
                _bullet.draw();
            });

            zombies.forEach( function(_zombie) {
                _zombie.draw();
            });
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
            preloadImages(allImages, function() {
            obj.setupGame();
            obj.run();
        });

// ===========\\\\\

        return obj;

    }

    exports("main.js", "createGame", _createGame);

})();