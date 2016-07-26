//test/dingus-test.js

// could use var, but we were feeling fancy and used const
const assert = require('chai').assert;

const Dingus = require('../lib/dingus');

describe('Dingus', function() {
  context('with default attributes', function() {

    var dingus = new Dingus();

    it('has a default x value', function(){
      assert.equal(dingus.x, 5);
    });

    it('has a default y value', function(){
      assert.equal(dingus.y, 5);
    });

    it('has a default height value', function(){
      assert.equal(dingus.height, 10);
    });

    it('has a default width value', function(){
      assert.equal(dingus.width, 10);
    });
  });

  context('with some assigned attributes', function(){
    it('should allow me to assign specific and otherwise use defaults', function(){
      // Create a dingus with only a height and width assigned
      //var dingus = new Dingus(xValue, yValue, heightValue, widthValue);
      var heightValue = 25;
      var widthValue = 100;
      var dingus = new Dingus('', '', heightValue, widthValue);
      assert.equal(dingus.height, heightValue);
      assert.equal(dingus.width, widthValue);
      assert.equal(dingus.x, 5);
      assert.equal(dingus.y, 5);
      // test that the height and width are not defaults
      // test that the x and y are defaults
    });
  });

  context('with all assigned attributes', function() {
    var xValue = 57;
    var yValue = 8;
    var heightValue = 42;
    var widthValue = 21;
    var dingus = new Dingus(xValue, yValue, heightValue, widthValue);

    it('assigns the xValue passed in as the dingus x', function(){
      assert.equal(dingus.x, xValue);
    });

    it('assigns the yValue passed in as the dingus y', function(){
      assert.equal(dingus.y, yValue);
    });

    it('assigns the heightValue passed in as the dingus height', function(){
      assert.equal(dingus.height, heightValue);
    });

    it('assigns the widthValue passed in as the dingus width', function(){
      assert.equal(dingus.width, widthValue);
    });
  });
});
