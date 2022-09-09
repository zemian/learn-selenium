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

it("mocha string concat example", function() {
  assert.deepEqual("a" + "b", "ab"); 
});
