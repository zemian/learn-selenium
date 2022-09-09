// How to verify chromedriver path?
// https://stackoverflow.com/questions/26191142/selenium-nodejs-chromedriver-path

const {Builder, By, Key, until, Capabilities} = require('selenium-webdriver');

var chrome = require('selenium-webdriver/chrome');
//var path = require('chromedriver').path;

it("selenium custom chromedriver path", async function() {
  this.timeout(60000);

  // Note: this will initialize code to check Chrome browser version match to driver
  //let driver = await new Builder().forBrowser('chrome').build();
  //console.log(driver);

  //console.log(chrome);
  // console.log(path);

  // Use custom driver path
  const path = '/Users/zemian/bin/chromedriver_105.0.5195.52';
  var service = new chrome.ServiceBuilder(path).build();
  chrome.setDefaultService(service);

  // var driver = new Builder()
  //   .withCapabilities(Capabilities.chrome())
  //   .build();
  // //console.log(driver);

  let driver = await new Builder().forBrowser('chrome').build();
  driver.quit();
});
