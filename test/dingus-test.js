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

  context('with assigned attributes', function() {
    var xValue = 57;
    var dingus = new Dingus(xValue);
    // Create a Dingus
      // give it assigned attributes

    it('assigns the xValue passed in as the dingus x', function(){
      assert.equal(dingus.x, xValue);
    });
    // test that what we pass in equals what is set
    // if we tell a dingus what it's x is, it doesn't use the default value
  });
});
