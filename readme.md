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

2. Install this npm package

    npm install
   
3. Just run the tests with NodeJs

   node test/google-search.js
   
   To use "test/webdriver-test.js", see comments.
