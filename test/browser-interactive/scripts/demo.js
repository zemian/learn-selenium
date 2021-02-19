// Demo script to be run by webdriver-test.js interactively
// Note the "driver" var is already loaded and ready to use
const {By, Key, until} = require('selenium-webdriver');
(async function () {
    await driver.get('http://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
})();
