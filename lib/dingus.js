function Dingus(options){
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.height = options.height || 10;
  this.width = options.width || 10;
}

Dingus.prototype.scoot = function(){
  this.x++;
}

module.exports = Dingus;
