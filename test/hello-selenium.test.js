// npx mocha test/hello-selenium.test.js
// 
// Note a selenium browser test on a decent machine will 5+ seconds to complete
// but Mocha default timeout is only 2s, so you have to ensure to give enough max
// time allow to run a test. If the test completes early, it will not idle until
// max timeout period obviously. 
// 
// It's normally a bad practice to make webdriver to sleep a certain number of 
// second! It's better to wait for a condition instead.
//
const {Builder, By, Key, until} = require('selenium-webdriver');
it("selenium google search example", async function() {
  this.timeout(60000);
  let driver = await new Builder().forBrowser('chrome').build();  
  await driver.get('http://www.google.com/');
  await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
  await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  await driver.quit();
});
