// lib/dingus.js

//var heightValue = 26;
//var widthValue = 101;
//var options = {width: widthValue, height: heightValue}
//var dingus = new Dingus(options);

function Dingus(options){
  // options = {width: widthValue, height: heightValue}
  this.x = options.x || 5;
  this.y = options.y || 5;
  this.height = options.height || 10;
  this.width = options.width || 10;
}

module.exports = Dingus;
