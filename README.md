# Game Time Testing - Basic Tests

If we're okay with not running our tests in the terminal, we're able to actually use the `document` to create a canvas in our test environment.

### Trying It Out

If you remember, our definition of Dingus allows us to pass in a canvas context.

```js
function Dingus(options){
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.height = options.height || 10;
  this.width = options.width || 10;
  this.ctx = options.ctx;
}
```

If we want to test out that this actually works as expected, we can write this slightly contrived test:


```js
it('allows a user to add a canvas context', function () {
  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d');
  var dingus = new Dingus({ctx: ctx});
  assert(dingus.ctx === ctx);
});
```

Within our test, we can actually create a 'canvas' element on `document` that we can use to test against.

Woah, right?

### What If We Run Tests In The Terminal

This is pretty great, but what if you're running your tests in the terminal? You'll get an error:

```bash
var canvas = document.createElement('canvas');
             ^

ReferenceError: document is not defined
```

We have access to 'document' when we run the tests in the browser, but not within the terminal.

We could try passing in document and then creating it in a test... but that seems kind of not great.

Or instead of depending on creating the canvas from the `document`, we could just pass an empty `{}` in the test.

Or, we can use Mocking and Stubbing, which we'll cover in the next lesson....

## Next Up - Sinon

6. [sinon](https://github.com/turingschool-examples/gametime-testing-journey/tree/sinon)

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
