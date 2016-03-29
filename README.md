# Game Time Testing - Basic Tests

We have two different options for running our tests that we don't have yet.

- From the terminal: `npm test`
- And by running the web server `npm start` and visiting the test endpoint `http://localhost:8080/webpack-dev-server/test.html`

### Trying It Out

For our game, let's say I want to display a little block on the screen.

I'll call this block a `dingus` and set up a test for it.

In the test folder, I'll create a `dingus-test.js` file.

I'll require this test file in my `test/index.js` by adding the line `require('./dingus-test.js');`

In my `test/dingus-test.js` I'll add the lines:

```js
const chai = require('chai');
const assert = chai.assert;

const Dingus = require('../lib/dingus');
```

Let's walk through what that does:

* `const` is ES6 - if you're not familiar with ES6, think of it as a much fancier `var`
* The first & second lines bring in the `chai` assertion library and define `assert` for us so that we can use it.
* The last line says that we are defining the `Dingus` object in the test as the result of requiring the Dingus file.

I can run the tests now by starting up the server `npm start` and visiting the test.html at http://localhost:8080/webpack-dev-server/test.html

But I see a scary error which tells us we don't have a dingus, to paraphrase.

Let's do ahead and create a `lib/dingus.js` file.

So now, I'll use Mocha and Chai to set up my test description and context.

```js
describe('Dingus', function() {
  context('with default attributes', function() {
    // Create a Dingus
    // Test that it starts with a default x and y coordinates
    // Test that it starts with a default height and width.  
  });  
});
```

And now, to fill out the tests:

```js
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
});
```

More scary errors!

I can get rid of the errors and instead see failures by adding the following code to my `lib/dingus.js`

```js
function Dingus(options){

}

module.exports = Dingus;
```

I can get the tests to pass by adding the following code to my `lib/dingus.js`

```js
function Dingus(options){
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.height = options.height || 10;
  this.width = options.width || 10;
}

module.exports = Dingus;
```

## Your Turn

Now that we have a default x, y, width and height. Let's test drive creating a `scoot` function on the Dingus prototype.

Here is the psuedo code for what the method should do.

```js
  // scoot function
  // scoot makes the dingus move to the right by 1
```

Create a test and then make it pass!

## Next Up - Separating Logic

4. [separating-logic](https://github.com/turingschool-examples/gametime-testing-journey/tree/separating-logic)

----

1. [background](https://github.com/turingschool-examples/gametime-testing-journey/tree/background)
2. [mocha-syntax](https://github.com/turingschool-examples/gametime-testing-journey/tree/mocha-syntax)
3. [basic-tests](https://github.com/turingschool-examples/gametime-testing-journey/tree/basic-tests)
4. [separating-logic](https://github.com/turingschool-examples/gametime-testing-journey/tree/separating-logic)
5. [unit-tests-and-the-dom](https://github.com/turingschool-examples/gametime-testing-journey/tree/unit-tests-and-the-dom)
6. [sinon](https://github.com/turingschool-examples/gametime-testing-journey/tree/sinon)
7. [after-gametime](https://github.com/turingschool-examples/gametime-testing-journey/tree/after-gametime)

-----
# Game Time Starter Kit

To install the dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/webpack-dev-server/` to run your application.
* `http://localhost:8080/webpack-dev-server/test.html` to run your test suite in the browser.

To build the static files:

```js
npm run build
```


To run tests in Node:

```js
npm test
```
