/**
 * Created by Max on 8/5/14.
 */

/*
This is going to be the main program driver.
 */

(function() {
    var shooter = require("shooter.js");
    // todo: require the rest of the modules
    var input = require("helperMods/input.js");


    var data = {};


    var ctx;
    var UP_ARROW = 38;
    var DOWN_ARROW = 40;
    var LEFT_ARROW = 37;
    var RIGHT_ARROW = 39;
    var ENTER = 13; // todo: get code for SPACEBAR and use that instead of ENTER
    var frame = 0;
    var lastTime = 0;


    /*
    Starts a new game, performing setup actions before launching into the game loop.
     */
    function startNewGame(_ctx) {
        ctx = _ctx;

        /*
        Binds all the keys that will be used to their required functionality
         */
        function setupInput(){
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

            input.listen(ENTER, function(_data) {
                // todo: hook up to player and fire projectiles

            });
        }

        function refreshData() {
            // todo: remove this function?
        }

        /*
        Performs initial game setup actions, to be called on making a new game.
         */
        function setupGame() {
            if(frame === 0){
                input.setData("gameOver", false);
                input.setData("continue", false);
                gameScene = scene.Scene(ctx);
                gameUi = new user_interface.UserInterface(ctx);
                gameScene.initialize(_levels[level]);
                gameUi.create();
                MAX_LEVELS = _levels.length;
                setupInput();
            }
        }



        function update() {

            // todo: get data from input class and update the game data here

            // get the time elapsed since last frame
            data.ts = data.ts || Date.now();
            var ts = Date.now();
            data.timeElapsed = ts - data.ts;
            data.ts = ts;
            data.frame = frame;
            frame++;


            // todo: update the collection of objects




        }

        function draw() {
            // todo: insert collection of objects to draw
        }

        /*
        Keeps the game looping as long as needed.
         */
        function requestAnimFrame(cb) {
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
        }

        function run() {
            if(Date.now () - lastTime > 1){
                lastTime = Date.now();
                update();
                draw();
            }
            requestAnimFrame(run);
        }

// ===========  The Important Stuff that Gets Everything Rolling
        setupGame();
        run();
// ===========

    }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
//                              CODE THAT STARTS THE GAME FOLLOWS                                          //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



    requireDone(function () {
        var ctx = document.getElementById("canvas").getContext("2d");

        startNewGame(ctx);
    });

})();