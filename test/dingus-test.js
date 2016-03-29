const chai = require('chai');
const assert = chai.assert;

const Dingus = require('../lib/dingus');

describe('Dingus', function() {
  context('with default attributes', function() {
    var dingus = new Dingus({});

    it('should assign an x coordinate', function() {
      assert.equal(dingus.x, 0);
    });

    it('should assign a y coordinate', function() {
      assert.equal(dingus.y, 0);
    });

    it('should assign a height', function(){
      assert.equal(dingus.height, 10);
    });

    it('should assign a width', function(){
      assert.equal(dingus.width, 10);
    });
  });

  describe('with default attributes', function() {
    var dingus = new Dingus({});

    it('should increment the dingus by 1', function() {
      assert.equal(dingus.x, 0);
      dingus.scoot();
      assert.equal(dingus.x, 1);
    });
  });
});
