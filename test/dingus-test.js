const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');

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

  describe('scoot', function() {
    var dingus = new Dingus({});

    it('should increment the dingus by 1', function() {
      assert.equal(dingus.x, 0);
      dingus.scoot();
      assert.equal(dingus.x, 1);
    });
  });

  describe('draw', function(){
    it('should call fillRect on the canvas', function() {
      var context = stub().of("fillRect");
      var dingus = new Dingus({ctx: context});
      dingus.draw();
      assert.equal(context.fillRect.calls.length, 1);
    });

    it('should pass the length, width, x, y to fillRect', function(){
      var context = stub().of("fillRect");
      var dingus = new Dingus({ctx: context});
      dingus.draw();
      assert.equal(context.fillRect.calls[0][0], dingus.x);
      assert.equal(context.fillRect.calls[0][1], dingus.y);
      assert.equal(context.fillRect.calls[0][2], dingus.height);
      assert.equal(context.fillRect.calls[0][3], dingus.width);
    });
  });
});
