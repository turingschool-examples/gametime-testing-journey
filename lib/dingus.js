// lib/dingus.js

function Dingus(options){
  this.x = options.x || 5;
  this.y = options.y || 5;
  this.height = options.height || 10;
  this.width = options.width || 10;
  // this.scoot = function(){}
}

Dingus.prototype.scoot = function(){
  this.x = this.x + 1;
};



// dingus.scoot();
// want the dingus to move to the right by 1 pixel

module.exports = Dingus;
