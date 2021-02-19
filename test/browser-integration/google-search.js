const assert = require('assert');
const {Builder, By, Key, until} = require('selenium-webdriver');

describe('browser tests', function() {
  let maxTimeout = 5000; // 5 secs
  let driver;

  this.timeout(maxTimeout);
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  })
  after(async function () {
    if (driver)
      await driver.quit();
  })

  it('google search', async function () {
    // Open google site and perform a search
    await driver.get('http://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), maxTimeout);
  })
})
