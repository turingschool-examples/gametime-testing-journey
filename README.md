# Game Time Testing - Basic Tests

We know we have a dingus, and we know theoretically it exists and that theoretically it can scoot.

Seeing, however, is believing - and we'd like to actually render it on a canvas.

### Trying It Out

First steps first - let's put a canvas in our html. We can do that by adding the tag to our `index.html` file.

```
  <canvas id="game-canvas" width="200" height="420"></canvas>
```

In order to render the game on that canvas, we need implement the following sudo code:

```js
  // Use the DOM to find the canvas element on the page
  // Start a loop to animate the game
  // within that loop, draw the game elements
```

We can cram all of that logic together, but if we think about things from a test-driven perspective, we probably don't want to.

So starting in the `lib/index.js` file, let's walk through coding out the sudo-code.

```js
  // Use the DOM to find the canvas element on the page
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext('2d');
```

Do we need to test that the canvas is present? Well, if the canvas isn't present, the entire game won't work. So I think our test can just be visiting the app, and that'll probably be safe enough for now.

```js
// Use the DOM to find the canvas element on the page
 const canvas = document.getElementById("game-canvas");
 const ctx = canvas.getContext('2d');

 // Start a loop to animate the game
 function animate() {
   requestAnimationFrame(animate);
 }

 animate();
 ```

So we define an animation loop and kick it off automatically. Testing this isn't needed, which is good, because it's hard to test a loop.

Now for the hard part: how do we accomplish the final piece of sudo code `// within that loop, draw the game elements`

If we want to test it, we should keep as much logic as possible outside of `lib/index.js`

### Keep Yer Canvas in Yer Index.js

We can create a prototype method on 'Dingus' which handles our 'draw' logic.

Once we have that method, we can have our Dingus class accept the canvas context as an option when it's created. That way, in our tests, we get to define what Canvas is. _This is important_

Starting with a test, we can add the following prototype method to our `Dingus` object:

```js
Dingus.prototype.draw = function(){
  this.ctx.fillStyle = "#FF0000";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};
```

And then update our definition of Dingus to set this context:

```js
function Dingus(options){
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.height = options.height || 10;
  this.width = options.width || 10;
  this.ctx = options.ctx;
}
```

Then, we can update our code in `index.js` to create a new Dingus with the dingus the canvas context, `call draw()` on it within the loop (and then, optionally, `scoot()`) and BOOM - we see our dingus doing it's thing.

```js
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');

const Dingus = require('./dingus');
let dingus = new Dingus({ ctx: ctx });

// Start a loop to animate the game
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dingus.draw();
  dingus.scoot();
  requestAnimationFrame(animate);
}

animate();
```

So, the first questions is ***Since Dingus is the only thing using the canvas, why don't we just find the canvas within the Dingus file?***.

Well, because there isn't a canvas element in our testing world. If we had a file that we intended to test (spoiler alert, we don't intend to test `index.js`) and we included a call to get canvas from the DOM - we'd have to
- a. not test from the terminal
- b. include a canvas element in our test.html

The second question is, ***How much of this code do we want to test?***

And that's maybe the more interesting question.

We have roughly three major options here:

1. We write mocha tests that create a canvas element using the document - and this branch shows us how [unit-tests-and-the-dom](https://github.com/turingschool-examples/gametime-testing-journey/tree/unit-tests-and-the-dom)
  - Cons: we limit ourself to only writing tests that can be run from the test.html endpoint

2. We use a mocking, stubbing and spying library like Sinon to create a fake canvas element and then test that our spy canvas gets the data that we expect - and this branch talks more about that [sinon](https://github.com/turingschool-examples/gametime-testing-journey/tree/sinon)
  - Pros: we can run tests from the terminal or the browser
  - Cons: Sinon and Webpack don't play nicely, and we'll have to do some crazy configuration or switch to using Jasmine (which has a built in mocking, spying and stubbing library)

3. We don't write an automated test for the draw method

Ultimately, that decision is up to you.

## Next Up - Unit Tests and the DOM

7. [after-gametime](https://github.com/turingschool-examples/gametime-testing-journey/tree/after-gametime)

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
