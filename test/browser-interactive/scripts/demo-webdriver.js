// Demo script to be run by webdriver-test.js interactively
// Note the "driver" var is already loaded and ready to use
const {By, Key, until} = require('selenium-webdriver');
(async function () {
    let maxTimeout = 5000;
    // Open google site and ensure title is displayed
    await driver.get('http://www.google.com');
    await driver.wait(until.titleIs('Google'), maxTimeout);

    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), maxTimeout);

    let elem = driver.findElement(By.css('#result-stats'));
    await driver.wait(until.elementIsVisible(elem), maxTimeout);
    let text = await elem.getText();
    console.log("Search result " + text);
})();
