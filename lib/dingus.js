// lib/dingus.js

function Dingus(options){
  this.x = options.x || 5;
  this.y = options.y || 5;
  this.height = options.height || 10;
  this.width = options.width || 10;
}

module.exports = Dingus;
