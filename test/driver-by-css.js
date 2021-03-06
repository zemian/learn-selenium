/**
 * A extension to Selenium Driver that add more convenient methods
 * for easier to use and help write shorter test code.
 */
const {Builder, By, Key, until} = require('selenium-webdriver');
class DriverByCss {
    driver;
    maxTimeout;

    // Alias these for convenience so user does not need to import them all the time.
    By = By;
    Key = Key;
    until = until;

    constructor(webDriver, maxTimeout = 2000) {
        this.driver = webDriver;
        this.maxTimeout = maxTimeout;
    }

    /** Return a promise that resolve to a web Driver */
    static getWebDriver(browser = 'chrome') {
        return new Builder().forBrowser(browser).build();
    }

    /** Open URL and return title text */
    openUrl(url) {
        return this.openUrlAndGetElement(url, 'head > title').then(elem => {
            return elem.getAttribute('textContent');
        });
    }

    pause(ms) {
        return this.driver.sleep(ms);
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
        return this.driver.findElement(locator);
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

    /** Wait, send input text and follow by TAB key */
    sendInputText(cssSelector, text) {
        return this.findElement(cssSelector).then((elem) => elem.sendKeys(text));
    }
    sendInputTextEnter(cssSelector, text) {
        return this.findElement(cssSelector).then((elem) => elem.sendKeys(text, Key.RETURN));
    }
    sendEnterKey(cssSelector) {
        return this.findElement(cssSelector).sendKeys(Key.RETURN);
    }
    clickElement(cssSelector) {
        return this.findElement(cssSelector).click();
    }
}

module.exports = DriverByCss;
