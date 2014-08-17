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

    var input = require("public/js/input.js");


    var allImages = [
        "./public/img/bullet.png",
        "./public/img/barrel_map.png",
        "./public/img/player_map_2.png",    //todo remove this when no longer needed
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
    var barrels = [];

    // todo move this information into a JSON.js file

    //todo: build the player sheet correctly
    var playerSheet = {
        "url": "./public/img/player_map_2.png",
        "width": 80,
        "height": 100,
        "xFrames": 5,
        "yFrames": 4
    };
    var zombieSheet = {
        "url": "./public/img/zombie_map.png",
        "width": 40,
        "height": 56,
        "xFrames": 4,
        "yFrames": 4
    };

    //todo: resize the bullet sheet
    var barrelSheet = {
        "url": "./public/img/barrel_map.png",
        "width": 72,
        "height": 54,
        "xFrames": 4,
        "yFrames": 3
    };

    // todo: build a bullet sheet
    var bulletSheet = {
        "url": "./public/img/bullet.png",
        "width": 16,
        "height": 16,
        "xFrames": 1,
        "yFrames": 1
    }

    function _createGame() {
        var obj = {};

        obj.setupInput = function() {
            input.setData("playerX", 100);
            input.setData("playerY", 100);
            input.setData("playerRotate", 0);
            input.setData("firingOrientation", [0,1]);


            input.listen(W_KEY, function(_data){
                var yPos = _data.playerY = player.yPos;
                if(yPos > 4 )
                    _data.playerY = yPos - 4;

                _data.playerRotate = Math.PI;
                _data.firingOrientation = [0, -1];
            });

            input.listen(S_KEY, function(_data) {
                var yPos = _data.playerY = player.yPos;
                if(yPos - 104 < window.canvasHeight)    // 104 is the 4 movement + character height
                    _data.playerY = yPos + 4;

                _data.playerRotate = 0;
                _data.firingOrientation = [0, 1];
            });

            input.listen(A_KEY, function(_data) {
                var xPos = _data.playerX = player.xPos;
                if(xPos > 4)
                    _data.playerX = xPos - 4;

                _data.playerRotate = Math.PI / 2;
                _data.firingOrientation = [-1, 0];
            });

            input.listen(D_KEY, function(_data) {
                var xPos = _data.playerX = player.xPos;
                if(xPos - 84 < window.canvasWidth)     // 84 is the 4 movement + character width
                    _data.playerX = xPos + 4;

                _data.playerRotate = Math.PI / -2;
                _data.firingOrientation = [1, 0];
            });

            input.listen(SPACEBAR, function(_data) {
                var xPos = (player.xPos + player.width) / 2;
                var yPos = (player.yPos + player.height) / 2;
                var xFiring = (_data.firingOrientation[0] * player.width);
                var yFiring = (_data.firingOrientation[1] * player.height);

                var finalX = xPos + xFiring;
                var finalY = yPos + yFiring;
                bullets.push( bullet.create( bulletSheet, finalX, finalY, _data.firingOrientation[0], _data.firingOrientation[1]) );
            });
            input.listen(ENTER, function(_data) {
                var xPos = (player.xPos + player.width) / 2;
                var yPos = (player.yPos + player.height) / 2;
                var xFiring = (_data.firingOrientation[0] * player.width) + 5;
                var yFiring = (_data.firingOrientation[1] * player.height) + 5;

                var finalX = xPos + xFiring;
                var finalY = yPos + yFiring;
                barrels.push( barrel.create( barrelSheet, finalX, finalY));
            });
        };

        obj.setupGame = function() {
            if(frame === 0){
                player = shooter.create(playerSheet);
                zombies.push( zombie.create(zombieSheet) );

                obj.setupInput();
            }


        };

        obj.update = function() {
            // todo: update program state, especially using user input

            player.update( input.getAllData() );

            bullets.forEach( function(_bullet) {
                _bullet.update( input.getAllData() );

                if(_bullet.deleteThis) {
                    var index = bullets.indexOf(_bullet);
                    bullets.splice(index, 1);
                }

            });

            zombies.forEach( function(_zombie) {
                _zombie.update( input.getAllData() );

                bullets.forEach( function(_bullet) {
                    if( _zombie.collidesWith(_bullet) ) {
                        var index = bullets.indexOf(_bullet);
                        bullets.splice(index, 1);
                    }
                });

                if(_zombie.deleteThis) {
                    var index = zombies.indexOf(_zombie);
                    zombies.splice(index, 1);
//                    console.log("## a zombie has been killed");
                }
            });

            barrels.forEach( function(_barrel) {
                _barrel.update();

                bullets.forEach( function(_bullet) {
                    if( _barrel.collidesWith(_bullet) ) {
                        var index = bullets.indexOf(_bullet);
                        bullets.splice(index, 1);
                    }
                });

                if(_barrel.deleteThis) {
                    var index = barrels.indexOf(_barrel);
                    barrels.splice(index, 1);
//                    console.log("## a barrel has exploded");
                }
            });
        };

        obj.draw = function() {
            window.ctx.clearRect(0,0, window.canvasWidth, window.canvasHeight);

            player.draw();

            bullets.forEach( function(_bullet) {
                _bullet.draw();
            });

            zombies.forEach( function(_zombie) {
                _zombie.draw();
            });

            barrels.forEach( function(_barrel) {
                _barrel.draw();
            })
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