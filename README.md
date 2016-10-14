# Game Time Testing - Mocking, Stubbing and Spying

We left off last lesson trying to figure out a meaningful way to test our `draw` method on dingus.

```js
Dingus.prototype.draw = function(){
  this.canvas.fillStyle = "#FF0000";
  this.canvas.fillRect(this.x, this.y, this.width, this.height);
};
```

We were also left with a test suite that has to be run in the browser.

We can fix BOTH of those issues by using techniques called 'spies, stubs and mocks'.

### Spies and Stubs and Mocks - What?

* A Spy: replaces a function and allows you to 'spy' and tracks things like 'number of times called' and variables invoked with.
* A Stub: allow you to 'replace' behavior or state of an object in order to use a test. A stub cannot automatically make a test fail.
* A Mock: objects that can be used to define expectations and then record and verify them. A mock can make your test fail.

The differences... are subtle... and there are many a blog post written to explain them all and their merits and faults.

### Spying

A spy watches your code and records how many times a method was called, the arguments passed in, the return value, and even the value of `this`.

### Stubs

Sometimes we have things in our application that call out to external services. That's not the kind of thing we want running in our test suite. If we had a function that called out to the Github API, then our test suite would need an Internet connection to run and then use up our API calls. That's not good. We're better off stubbing the function and having it return some fake data that we can use.

If you've used the vcr gem in Ruby, what's happening under the covers is stubbing. VCR records a fixture file of an api response the first time a test is run. It then stubs ajax calls to the same url and refers to that fixture data (or cassette) for all future tests.

The vcr gem can quickly bloat a project, if the fixture files are checked in to git- and if not,  cause intermittent failures when each developer has different fixture files depending on when they run the specs.

We can use stubs instead of an automatic solution like vcr to control our fixture data instead.

### Mocks

Mocks combine being fake methods, (like spies) and having pre-programmed behavior (like stubs) and then add on pre-programmed expectations. These expectations can automatically make a test fail.

## Using Spies to Test

There are a number of really cool libraries that allow us to mock, stub and spy. The Grandmomma of these libraries and the most commonly used is [SinonJS](http://sinonjs.org/).

Sinon is super cool but it doesn't play nicely with Webpack (welcome to the world of JS Testing). There is about a 40% likelihood that if you install Sinon in your GameTime project, it will cause errors for you. And an 80% chance that if it doesn't cause errors for you, it'll cause errors for your partner on the project!

Luckily, we're programmers and that means we have magical powers and we don't need to use other libraries, we can write them ourselves.

## A Bespoke Solution

Open your `test` folder and look in a folder called `support`.

You should see two files.

The first is called `stub.js` if you open that, you'll see that there is one function defined in there called stub which has some confusing code in it.

Go ahead and open the `stub-test.js` file and you'll see tests which define what this stub function can actually do for us.

### Writing the First Test

We can go ahead and include this test helper in our `dingus-test.js` by adding this line in the test file.

```js
  const stub = require('./support/stub');
```

Let's create a test setup that describes the draw method:

```js
describe('draw', function(){
  it('should call fillRect on the canvas', function() {

  });
```

Knowing what we know about mocks, spys and stubs - let's try to psuedo-code out a solution.

```js
describe('draw', function(){
  it('should call fillRect on the canvas', function() {
    // Create a stubbed canvas context
    // Create a spy for the fillRect function
    // Create a dingus that is passed the canvas
    // Draw the dingus
    // Verify that draw calls fillRect on the canvas with the correct values
  });
```

So first, let's set up a spy.

```js
describe('draw', function(){
  it('should call fillRect on the canvas', function() {
    var context = stub().of("fillRect");
    // Create a dingus that is passed the canvas
    // Draw the dingus
    // Verify that draw calls fillRect on the canvas with the correct values
  });
```

Now let's pass that stub with a spy to our dingus

```js
describe('draw', function(){
  it('should call fillRect on the canvas', function() {
    var context = stub().of("fillRect");
    var options = {ctx: context, x: 0, y: 5, height: 20, width: 10}
    var dingus = new Dingus(options);
    dingus.draw();
    // Verify that draw calls fillRect on the canvas with the correct values
  });
```
* For `Create a canvas`, we've created a canvas object which has a `fillRect` function.
* For `Spy on that canvas`, we call the `spy` function on sinon and give it the context we created, and the name of the function to spy on.
* For `Create a dingus that is passed the canvas`, we pass some options including our canvas spy

Now we can make some slightly more meaningful assertions.

Let's verify that fillRect gets called when we draw the dingus.

```js
describe('draw', function(){
  it('should call fillRect on the canvas', function() {
    var context = stub().of("fillRect");
    var options = {ctx: context, x: 0, y: 5, height: 20, width: 10}
    var dingus = new Dingus(options);
    dingus.draw();
    assert.equal(context.fillRect.calls.length, 1);
     //with the correct values
  });
```

And now we can test to see if fillRect got called with the correct arguments!

```js
describe('draw', function(){
  it('should call fillRect on the canvas', function() {
    var context = stub().of("fillRect");
    var options = {ctx: context, x: 0, y: 5, height: 20, width: 10}
    var dingus = new Dingus(options);
    assert.equal(context.fillRect.calls.length, 1);
    assert.equal(context.fillRect.calls[0][0], dingus.x);
    assert.equal(context.fillRect.calls[0][1], dingus.y);
    assert.equal(context.fillRect.calls[0][2], dingus.height);
    assert.equal(context.fillRect.calls[0][3], dingus.width);
  });
```

We may want to even split this test into two tests - one that asserts draw() `should call fillRect on the canvas` and one that asserts draw() `should pass the length, width, x, y to fillRect`.

## Your Turn

Let's pull things all together and create a method that will actually draw and render our dingus scooting.

In your `lib/index.js`, update the method to require a game class and call draw on it within the animation loop. It should look like this:

```js
const $ = require('jquery');
const Game = require('./game.js')

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let game = new Game(canvas, ctx);

function animate() {
  game.draw();
  requestAnimationFrame(animate);
}

animate();
```

Update or create a `Game` so that it is initialized with a new `dingus`.

The test drive a method, using stubbing and spying, that calls the game draw method. The `game.draw()` method should clear the canvas, and then move and draw the dingus.

Bonus: Check out what the `scoot` method does, in the context of drawing...

## Next Up - After GameTime

6. [after-gametime](https://github.com/turingschool-examples/gametime-testing-journey/tree/after-gametime)

----

1. [background](https://github.com/turingschool-examples/gametime-testing-journey/tree/background)
2. [mocha-syntax](https://github.com/turingschool-examples/gametime-testing-journey/tree/mocha-syntax)
3. [basic-tests](https://github.com/turingschool-examples/gametime-testing-journey/tree/basic-tests)
4. [separating-logic](https://github.com/turingschool-examples/gametime-testing-journey/tree/separating-logic)
5. [unit-tests-and-the-dom](https://github.com/turingschool-examples/gametime-testing-journey/tree/unit-tests-and-the-dom)
6. [sinon](https://github.com/turingschool-examples/gametime-testing-journey/tree/sinon)
7. [after-gametime](https://github.com/turingschool-examples/gametime-testing-journey/tree/after-gametime)

------

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
