/*
 * The program is started from this file.
 *
 * After declaring a global namespace, the program driver is initialized and started in this file.
 */

var driver = require('main.js');

window.ctx = document.getElementById("canvas").getContext("2d");
window.gameData = {};

requireDone(function() {
    driver.createGame(ctx);
});