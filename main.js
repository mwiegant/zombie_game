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
    var fpscounter = require("public/js/fpscounter.js");

    var allImages = [
        //todo properly name everything, no _2 or _3 shit (reflect changes in the sheets below as well)
        "./public/img/bullet_map.png",
        "./public/img/barrel_map_2.png",
        "./public/img/player_map_3.png",
        "./public/img/player_map.png",
        "./public/img/zombie_map.png"
    ];

    var W_KEY = 87;
    var A_KEY = 65;
    var S_KEY = 83;
    var D_KEY = 68;
    var SPACEBAR = 32;
    var ENTER = 13;
    var MOVE_SPEED = 8;
    var frame = 0;
    var lastTime = 0;

    var player;
    var frameCounter;
    var zombies = [];
    var bullets = [];
    var barrels = [];

    // todo move the sheets information into a JSON.js file

    var playerSheet = {
        "url": "./public/img/player_map_3.png",
        "width": 66,
        "height": 58,
        "xFrames": 9,
        "yFrames": 4
    };
    var zombieSheet = {
        "url": "./public/img/zombie_map.png",
        "width": 40,
        "height": 56,
        "xFrames": 4,
        "yFrames": 4
    };

    var barrelSheet = {
        "url": "./public/img/barrel_map_2.png",
        "width": 52,
        "height": 54,
        "xFrames": 9,
        "yFrames": 1
    };

    var bulletSheet = {
        "url": "./public/img/bullet_map.png",
        "width": 16,
        "height": 16,
        "xFrames": 4,
        "yFrames": 1
    };

    var frameCounterSpecs = {
        dx: 40,
        dy: 400,
        xScale: 140,
        yScale: 50
    };

    function _createGame() {
        var obj = {};

        obj.setupInput = function() {
            input.setData("playerX", 100);
            input.setData("playerY", 100);
            input.setData("playerRotate", 0);
            input.setData("firingOrientation", [0,1]);
            input.setData('playerXFrame', 0);
            input.setData('playerYFrame', 0);

            input.listen(W_KEY, function(_data){
                var yPos = _data.playerY = player.yPos;
                if(yPos > 4 )
                    _data.playerY = yPos - MOVE_SPEED;

                _data.playerRotate = Math.PI;
                _data.firingOrientation = [0, -1];

                _data.playerXFrame++;
                _data.playerYFrame = 2;

            });

            input.listen(S_KEY, function(_data) {
                var yPos = _data.playerY = player.yPos;
                if(yPos - (4 + playerSheet.height) < window.canvasHeight)
                    _data.playerY = yPos + MOVE_SPEED;

                _data.playerRotate = 0;
                _data.firingOrientation = [0, 1];

                _data.playerXFrame++;
                _data.playerYFrame = 0;
            });

            input.listen(A_KEY, function(_data) {
                var xPos = _data.playerX = player.xPos;
                if(xPos > 4)
                    _data.playerX = xPos - MOVE_SPEED;

                _data.playerRotate = Math.PI / 2;
                _data.firingOrientation = [-1, 0];

                _data.playerXFrame++;
                _data.playerYFrame = 1;
            });

            input.listen(D_KEY, function(_data) {
                var xPos = _data.playerX = player.xPos;
                if(xPos - (4 + playerSheet.width) < window.canvasWidth)
                    _data.playerX = xPos + MOVE_SPEED;

                _data.playerRotate = Math.PI / -2;
                _data.firingOrientation = [1, 0];

                _data.playerXFrame++;
                _data.playerYFrame = 3;
            });

            input.listen(SPACEBAR, function(_data) {
                var xPos = player.xPos + (player.width / 2);
                var yPos = player.yPos + (player.height / 2);
                var xFiring = (_data.firingOrientation[0] * 5);
                var yFiring = (_data.firingOrientation[1] * 5);

                var finalX = xPos + xFiring;
                var finalY = yPos + yFiring;
                bullets.push( bullet.create( bulletSheet, finalX, finalY, _data.firingOrientation[0], _data.firingOrientation[1]) );
            });

            input.listen(ENTER, function(_data) {
                var xPos = player.xPos + (player.width / 2);
                var yPos = player.yPos + (player.height / 2);
                var xFiring = (_data.firingOrientation[0] * 5);
                var yFiring = (_data.firingOrientation[1] * 5);

                var finalX = xPos + xFiring;
                var finalY = yPos + yFiring;
                barrels.push( barrel.create( barrelSheet, finalX, finalY));
            });
        };

        obj.setupGame = function() {
            if(frame === 0){
                player = shooter.create(playerSheet);
                frameCounter = fpscounter.create( frameCounterSpecs, window.ctx );
                zombies.push( zombie.create(zombieSheet) );

                zombies.push( zombie.create(zombieSheet) );
                zombies.push( zombie.create(zombieSheet) );
                zombies.push( zombie.create(zombieSheet) );
                zombies.push( zombie.create(zombieSheet) );
                zombies.push( zombie.create(zombieSheet) );
                zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );zombies.push( zombie.create(zombieSheet) );





                obj.setupInput();
            }


        };

        obj.update = function() {

            player.update( input.getAllData() );

            frameCounter.update();

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

                // todo add zombie collision detection with barrels
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
                    console.log("## a barrel has exploded");
                }
            });
        };

        obj.draw = function() {
            window.ctx.clearRect(0,0, window.canvasWidth, window.canvasHeight);

            player.draw();

            frameCounter.draw();

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