const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');
var Dingus = require('./dingus.js');

var dingus = new Dingus({ ctx: ctx });

dingus.draw();
