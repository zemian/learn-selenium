const {By, Key, until} = require('selenium-webdriver');
(async function () {
    let maxTimeout = 5000;
    await driver.get('http://localhost/unicopnext');

    // Calling driver.getTitle() do not need to wait on element
    let titleText = await driver.getTitle();
    console.log("driver.getTitle=" + titleText);

    let locator = By.css('head > title');
    let elem = driver.findElement(locator);
    await driver.wait(until.elementLocated(locator), maxTimeout);

    // Note you cannot get title text using .getText() because title is not visible!
    // let titleText2 = await elem.getText();
    let titleText2 = await elem.getAttribute("textContent");
    console.log("title elem.getAttribute=" + titleText2);
})();
