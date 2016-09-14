const assert = require('chai').assert;

const Dingus = require('../lib/dingus');

describe('Dingus', function(){
  context('with default attributes', function(){
    it('should assign default coordinates and size', function(){
      var dingus = new Dingus();
      assert.equal(dingus.x, 0);
      assert.equal(dingus.y, 0);
      assert.equal(dingus.height, 10);
      assert.equal(dingus.width, 10);
    });
  });

  context('with set attributes', function(){
    var x = 45;
    var y = 67;
    var height = 42;
    var width = 1;

    it('allows me to set height, width, x, and y', function(){
      // create a Dingus with x, y, height and width defined
      // test that our set qualities are the end result
      var options = { width: width, height: height, y: y, x: x };
      var dingus = new Dingus(options);
      assert.equal(dingus.x, x);
      assert.equal(dingus.y, y);
      assert.equal(dingus.height, height);
      assert.equal(dingus.width, width);
    });

    it('allows me to set only width', function(){
      var options = { width: width };
      var dingus = new Dingus(options);
      assert.equal(dingus.width, width, 'width was improperly set');
      assert.equal(dingus.x, 0, 'x is not the default');
    });
  });
});
