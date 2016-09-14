function Dingus(options={}){
  // var opts = options || {};
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.height = options.height || 10;
  this.width = options.width || 10;
  this.ctx = options.ctx;
};

Dingus.prototype.draw = function(){
  // this.ctx
}

module.exports = Dingus;
