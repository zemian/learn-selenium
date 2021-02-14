// Use this test script with webdriver-test.js to test browser interactively
//
// Open google site and perform a search

const {By, Key, until} = require('selenium-webdriver');
(async function () {
    await driver.get('http://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
})();
