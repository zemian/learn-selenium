// npx mocha test/hello-mocha.test.js
const assert = require('chai').assert;
it("mocha chai.assert example", function() {
  assert.notDeepEqual(.1 + .2, .3); 
});

it("mocha async done function example", function(done) {
  setTimeout(() => {
    //console.log("Test completed");
    done();
  }, 350);
});

it("mocha await example", async function() {
  await new Promise((resolve) => {
    setTimeout(() => {
      //console.log("Test completed");
      resolve();
    }, 450);
  });
});

it("mocha return promise example", function() {
  return new Promise((resolve) => {
    setTimeout(() => {
      //console.log("Test completed");
      resolve();
    }, 550);
  });
});

// == There are 3 ways Mocha support async testing:

// Method1: return a Promise object
it("mocha multiple await work example#1", function() {
  return new Promise(async (resolve) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    await new Promise(resolve => setTimeout(resolve, 200));
    await new Promise(resolve => setTimeout(resolve, 300));
    resolve();
  });
});

// Method2: Use a "done" callback function to resolve test when ready.
it("mocha multiple await work example#2", function(done) {
  (async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    await new Promise(resolve => setTimeout(resolve, 200));
    await new Promise(resolve => setTimeout(resolve, 300));
    done();
  })();
});

// Method3: Use "async function", which is same as return a Promise.
it("mocha multiple await work example#3", async function() {
  // Do not use promise, but use 'done' callback instead.  
  await new Promise(resolve => setTimeout(resolve, 100));
  await new Promise(resolve => setTimeout(resolve, 200));
  await new Promise(resolve => setTimeout(resolve, 300));
});

/*
// Below will not work! Mocha requires either "async function" or "new Promise"
// or function(done) is used only, but not both combined.
it("mocha multiple await work example#4", async function(done) {
  // Do not use promise, but use 'done' callback instead.  
  await new Promise(resolve => setTimeout(resolve, 100));
  await new Promise(resolve => setTimeout(resolve, 200));
  await new Promise(resolve => setTimeout(resolve, 300));
  done();
});
*/



it("mocha string concat example", function() {
  assert.deepEqual("a" + "b", "ab"); 
});
