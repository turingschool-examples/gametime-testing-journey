# Game Time Testing - Basic Mocha Syntax

Our GameTime starter kit comes with Mocha already installed and set up. How do I know this?

First, look in the `package.json` file:

```
  // This includes mocha as a dependency
  "devDependencies": {
    // ...
    "mocha": "^2.2.5",
    // ...
  }
```

```
  // That last line sets up the npm test command to use mocha
  "scripts": {
    "start": "./node_modules/webpack-dev-server/bin/webpack-dev-server.js",
    "build": "./node_modules/webpack/bin/webpack.js",
    "test": "./node_modules/mocha/bin/mocha --compilers js:babel/register"
  },
```

Second, check out the `webpack.config.js`

```
// The (second to) last line of code sets up our testing entry point using mocha
entry: {
  main: "./lib/index.js",
  test: "mocha!./test/index.js"
},
```

Before we dig into some exercises, let's look at some basic Mocha syntax.

#### The Interface
Mocha has different 'interface' systems that allow developers to choose the DSL style.

* `BDD` will give you an RSpec style of testing syntax, including: `describe()`, `context()`, `it()`, `before()`, `after()`, `beforeEach()`, and `afterEach()`.
  ```javascript
  describe('Array', function() {
  before(function() {
    // ...
  });

  describe('#indexOf()', function() {
    context('when not present', function() {
      it('should not throw an error', function() {
        (function() {
          [1,2,3].indexOf(4);
        }).should.not.throw();
      });
      it('should return -1', function() {
        [1,2,3].indexOf(4).should.equal(-1);
      });
    });
    context('when present', function() {
      it('should return the index where the element first appears in the array', function() {
        [1,2,3].indexOf(3).should.equal(2);
      });
    });
  });
});
///example taken from the mochajs.org page
  ```
* `TDD` will give you a MiniTest or TestUnit style of testing syntax, including: `suite()`, `test()`, `suiteSetup()`, `suiteTeardown()`, `setup()`, and `teardown()`.

  ```javascript
  suite('Array', function() {
  setup(function() {
    // ...
  });

  suite('#indexOf()', function() {
    test('should return -1 when not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
///example taken from the mochajs.org page
  ```
  * Mocha also provides `Exports`, `QUnit` and `Require` styles.

The default style that you'll likely see is BDD.

## Assertions and Chai

As we mentioned in the `background` section, Mocha does not have a default assertion library. We can add on our preferred assertion library, such as [Chai](http://chaijs.com/) to add them in.

What this means, is that Mocha provides the framework (the `describe` block, the running of the tests) and Chai provides the syntatic sugar around saying this like `assert.equal` or `.should.equal`.

Chai provides you with different styles of this - including the big ones, `assert`, `expect` and `should`.

Luckily, this is also already included for us in the `package.json`:

```
    "chai": "^3.2.0",
```


## Next Up - Basic Tests

3. [basic-tests](https://github.com/turingschool-examples/gametime-testing-journey/tree/basic-tests)

----

1. [background](https://github.com/turingschool-examples/gametime-testing-journey/tree/background)
2. [mocha-syntax](https://github.com/turingschool-examples/gametime-testing-journey/tree/mocha-syntax)
3. [basic-tests](https://github.com/turingschool-examples/gametime-testing-journey/tree/basic-tests)
4. [seperating-logic](https://github.com/turingschool-examples/gametime-testing-journey/tree/seperating-logic)
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
