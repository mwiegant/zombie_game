/*
 * The program is started from this file.
 *
 * After declaring a global namespace, the program driver is initialized and started in this file.
 */

toggleRequireDebug();   // this turns off all of those 'module X loading..' messages

var driver = require('main.js');
var canvas = document.getElementById("canvas");

window.ctx = canvas.getContext("2d");
window.canvasWidth = canvas.width;
window.canvasHeight = canvas.height;
window.gameData = {};



requireDone(function() {
    driver.createGame(ctx);
});