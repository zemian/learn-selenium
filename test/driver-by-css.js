/**
 * A extension to Selenium Driver that add more convenient methods
 * for easier to use and help write shorter test code.
 */
const {By, Key, until} = require('selenium-webdriver');
class DriverByCss {
    driver;
    maxTimeout;

    // Alias these for convenience so user does not need to import them all the time.
    By = By;
    Key = Key;
    until = until;

    constructor(driver, maxTimeout = 2000) {
        this.driver = driver;
        this.maxTimeout = maxTimeout;
    }

    /** Open URL and return title text */
    openUrl(url) {
        return this.openUrlAndGetElement(url, 'head > title').then(elem => {
            return elem.getAttribute('textContent');
        });
    }

    openUrlAndGetElement(url, cssSelector = null) {
        return new Promise(resolve => {
            this.driver.get(url);
            if (cssSelector) {
                this.waitElement(cssSelector).then(elem => resolve(elem));
            } else {
                resolve(null);
            }
        });
    }

    findElement(cssSelector) {
        let locator = By.css(cssSelector);
        return driver.findElement(locator);
    }

    waitElement(cssSelector) {
        let locator = By.css(cssSelector);
        return this.driver.wait(until.elementLocated(locator), this.maxTimeout);
    }

    waitElementText(cssSelector) {
        return this.waitElement(cssSelector).then((elem) => elem.getText());
    }

    waitElementAttribute(cssSelector, attributeName) {
        return this.waitElement(cssSelector).then((elem) => elem.getAttribute(attributeName));
    }

    waitTitle() {
        return this.waitElement('head > title').then((elem) => elem.getAttribute('textContent'));
    }

    /** Wait, send input text and follow by ENTER key */
    sendInputText(cssSelector, text) {
        return this.waitElement(cssSelector).then((elem) => elem.sendKeys(text, Key.RETURN));
    }
}

module.exports = DriverByCss;
