## Setting Up Sinon.

***WARNING***

While the lesson below 'works on my machine' - it doesn't consistently work for everyone.

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
  const sinon = require('sinon');
```

Note: You may need to use the following as part of the sinon work around to get Sinon to work with Webpack. `const sinon = require('sinon/pkg/sinon');;`

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
    // Create a canvas context
    var ctx = { fillRect: function(){} };
    // Spy on that canvas
    var spy = sinon.spy(ctx, "fillRect");

    // Create a dingus that is passed the canvas
    var options = {ctx: ctx, x: 0, y: 0, height: 20, width: 10}

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
    var ctx = { fillRect: function(){} };
    var spy = sinon.spy(ctxs, "fillRect");

    var options = {ctxs: ctx, x: 0, y: 0, height: 20, width: 10}

    var dingus = new Dingus(options);

    dingus.draw();

    assert(spy.calledOnce, 'fillRect method was called on canvas context')
    assert(spy.calledWith(0, 0, 10, 20), 'fillRect method was called with unexpected args')
  });
});
```
