This project is to learn about [Selenium](https://www.selenium.dev/documentation/en/)

Selenium is an umbrella project for a range of tools and libraries that enable 
and support the automation of web browsers.

## How to setup

1. Install Browser Driver under test
   
    Example: https://chromedriver.chromium.org/home
   
    Ensure to get a driver that match to your browser version.
   
    ```
    brew install chromedriver
    /usr/local/bin/chromedriver --version
    ```

   For Firefox: you will need "geckodriver" install.

2. Install this npm package

    npm install
   
3. Just run the tests with NodeJs

   npm run test

Or you may test the browser with scripts interactively:

   npm run test-interactive

Press ENTER to execute the "test/browser-interactive/scripts/demo.js" file.

## How to write selenium scripts using JS

- https://www.selenium.dev/selenium/docs/api/javascript/index.html
- https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html
