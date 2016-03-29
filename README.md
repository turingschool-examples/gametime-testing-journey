# Game Time Testing - Background

Unit tests test units of functionality (try saying that one three times in a row). Given a certain input, test that this block of code gives certain output.

Integration tests test the more that one piece of your code work together as you expect them to.

Testing JavaScript, especially in a project like GameTime, can be confusing at first. So let's try and remove some of the mystery.

## A General Overview of the Testing Terms

#### Major Testing Frameworks

* [QUnit](http://qunitjs.com/) - QUnit is an early testing framework. It doesn't come with a lot of bells and whistles, or really, any bells and whistles.
* [Mocha](https://mochajs.org/) - Mocha describes itself as the 'simple, flexible, fun' testing framework. The reason for the flexibility is that things like spy frameworks and assertion libraries are not built in to Mocha - so if you want these things, you add them in piecemeal.
* [Jasmine](https://github.com/jasmine/jasmine) - Jasmine describes itself as a 'Dom-less simple JavaScript testing framework'. It has a built in mocking library (unlike Mocha) and is generally thought of as an 'all-one-package'.

There are (way) more JavaScript unit testing frameworks - but these are the major ones at the time of writing.


#### Nice Things to Add to Your Testing Framework
* [Chai](http://chaijs.com/) - Chai is an 'assertion library' which can be added to any testing framework to beef up the language and readable style of tests. If you think about the syntactic sugar of RSpec, Chai will give you familiar ways to chain assertions that make tests more readable. It is usually used with Mocha, as Mocha does not have a built in assertion library. Other assertion libraries include `should.js`, `expect.js`, `better-assert`. `unexpected`.
* [Sinon.JS](http://sinonjs.org) - A library  used to add test spies, mocks and stubs to your tests. Works with QUnit, Jasmine and Mocha.


### Next Up

2. [mocha-syntax](https://github.com/turingschool-examples/gametime-testing-journey/tree/mocha-syntax)

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
