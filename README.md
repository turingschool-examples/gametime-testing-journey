# Game Time Testing - Sinon

### WARNING

Sinon is super cool but it doesn't play nicely with Webpack (welcome to the world of JS Testing). While the lesson below 'works on my machine' - it doesn't consistently work for everyone.

So, with that in mind, we'll teach the lesson from [here](https://github.com/turingschool/lesson_plans/blob/master/ruby_04-apis_and_scalability/testing_javascript-mocks_and_stubs.markdown)

Legacy lesson kept below if you want to spend the time to get Sinon up and running for your project.


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

## Mocking, Spying and Stubbing

We left off last lesson trying to figure out a meaningful way to test our `draw` method on dingus.

```js
Dingus.prototype.draw = function(){
  this.canvas.fillStyle = "#FF0000";
  this.canvas.fillRect(this.x, this.y, this.width, this.height);
};
```

We were also left with a test suite that has to be run in the browser.

We can fix BOTH of those issues by using something called Sinon.js.

## What Is Sinon?

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

## Setting Up Sinon.

First things first, we want to install and save `Sinon` in our dependencies.

`npm install sinon --save`

If only it were that easy though.

### Special Sinon Configuration for WebPack

Run `npm install imports-loader --save`

Then update your `webpack.config.js` file. Change the loaders to include this line `{ test: /sinon\.js$/, loader: "imports?define=>false,require=>false"}`:

It should look like this:

```js
module: {
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    { test: /\.css$/, loader: "style!css" },
    { test: /\.scss$/, loader: "style!css!sass" },
    { test: /sinon\.js$/, loader: "imports?define=>false,require=>false"}
  ]
},
```

This should work for you. If it doesn't, we're sorry, you can read through this [webpack issue discussion](https://github.com/webpack/webpack/issues/304) thread for more context and some other ideas for debugging.

## Writing the First Test

Now we want to include Sinon in the `test/dingus_test.js` by including this line of code:

```js
  const sinon = require('sinon/pkg/sinon');
```

Note: This syntax is part of a workaround to get Sinon to work with Webpack. Ordinarily, you would just use `const sinon = require('sinon');`

Let's create a test setup that describes the draw method:

```js
describe('draw()', function() {
  it('should draw itself on the canvas', function(){

  });
});
```
Knowing what we know about mocks, spys and stubs - let's try to psuedo-code out a solution.

```js
describe('draw()', function() {
  it('should draw itself on the canvas', function(){
    // Create a canvas
    // Spy on that canvas
    // Create a dingus that is passed the canvas
    // Verify that draw calls fillRect on the canvas with the correct values
  });
});
```

So first, let's set up a spy.

```js
describe('draw()', function() {
  it('should draw itself on the canvas', function(){
    // Create a canvas
    var canvas = { fillRect: function(){} };
    // Spy on that canvas
    var spy = sinon.spy(canvas, "fillRect");

    // Create a dingus that is passed the canvas
    var options = {canvas: canvas, x: 0, y: 0, height: 20, width: 10}

    var dingus = new Dingus(options);

    //......
```

* For `Create a canvas`, we've created a canvas object which has a `fillRect` function.
* For `Spy on that canvas`, we call the `spy` function on sinon and give it the context we created, and the name of the function to spy on.
* For `Create a dingus that is passed the canvas`, we pass some options including our canvas spy

Now we can make some slightly more meaningful assertions.

* Assert that our fillRect method gets called
* Assert that the correct x, y, height and width values are passed to it.

The entire test will look like this!

```js
describe('draw()', function() {
  it('should draw itself on the canvas', function(){
    var canvas = { fillRect: function(){} };
    var spy = sinon.spy(canvas, "fillRect");

    var options = {canvas: canvas, x: 0, y: 0, height: 20, width: 10}

    var dingus = new Dingus(options);

    dingus.draw();

    assert(spy.calledOnce, 'fillRect method was called on canvas context')
    assert(spy.calledWith(0, 0, 10, 20), 'fillRect method was called with unexpected args')
  });
});
```

## Your Turn

Let's pull things all together and create a method that will actually draw and render our dingus scooting.

In your `lib/index.js`, update the method to require the game and call draw on it within the animation loop. It should look like this:

```js
const $ = require('jquery');
const Game = require('./game.js')

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let game = new Game(canvas, ctx);

function animate() {
  game.draw(game);
  requestAnimationFrame(animate);
}

animate();
```

Update `Game` so that it is initialized with a new `dingus`.

The test drive a method, using Sinon, that calls the dingus draw method.

Bonus: Check out what the `scoot` method does, in the context of drawing...

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
