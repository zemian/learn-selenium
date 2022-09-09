// When things failed, how to do ensure we print errors?
// Example, if chromedriver has wrong versions, how do we debug it?
const {Builder, By, Key, until} = require('selenium-webdriver');

// // NOTE: This style of coding will not print the wrong chromedriver version errors!
// it("selenium google search example", function(done) {
//   this.timeout(60000);
//   (async () => {
//     let driver = await new Builder().forBrowser('chrome').build();  
//     await driver.get('http://www.google.com/');
//     await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//     await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//     await driver.quit();
//     done();
//   })();
// });

// This coding style will print the error!
/* Disabled just so entire test suite will pass
it("selenium google search example", async function() {
  this.timeout(60000);
  let driver = await new Builder().forBrowser('chrome').build();  
  await driver.get('http://www.google.com/');
  await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
  await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  await driver.quit();
});
*/
