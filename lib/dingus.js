function Dingus(options){
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.height = options.height || 10;
  this.width = options.width || 10;
  this.ctx = options.ctx;
}

Dingus.prototype.scoot = function(){
  this.x++;
}

Dingus.prototype.draw = function(){
  this.ctx.fillStyle = "#FF0000";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Dingus;
