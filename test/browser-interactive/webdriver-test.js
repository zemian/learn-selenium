/*
A script to bootstrap a Selenium webdriver object and wait for user
to enter key stroke to reload live scripts to test the browser.

This provide a fast feedback loop for user to experiment the selenium
API without have to restart full script with browser reloading.

Usage:

1. Run: node webdriver-test.js
2. Wait for browser to open
3. On the terminal prompt, you may type following:key
	Type "quit" to exit this script
	Or Type "ENTER" to evaluate the "demo.js" script file
	Or Type a script name and press ENTER to evaluate it.

The script will have the following global variables accessible:

	driver - the webdriver instance from selenium
	console - use to print console output
	require - function to import node modules

REF: https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html
*/

const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const readline = require("readline");
const vm = require('vm');
const fs = require('fs');
const DriverByCss = require('../driver-by-css');

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
	console.log("Starting browser automation.");

	const options = new chrome.Options();
	options.addArguments('user-data-dir=temp/chrome-data');
	//console.log("Chrome options", options);
	const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

	function promptLoop () {
		prompt.question("Enter script and ENTER to continue, (or 'quit' to exit)? \n", async function (answer) {
			// console.log("Answer: " + answer);
			if (answer == '') {
				await onEnter(driver);
			} else {
				const args = answer.split(' ');
				const command = args[0];
				if (command === "quit" || command === 'x') {
					console.log("Closing down webdriver.");
					await driver.quit();
					prompt.close();
					return;
				} else {
					const fn = command;
					await onEnter(driver, fn);
				}
			}
			promptLoop();
		});
	}
	promptLoop();
}

async function onEnter(driver, fileName = 'demo.js') {
	if (!fileName.startsWith('/'))
		fileName = 'test/browser-interactive/scripts/' + fileName;
	console.log("Running VM script: " + fileName);
	fs.readFile(fileName, async (err, data) => {
		if (err) {
			console.error("ERROR: ", err);
			return;
		}

		// NOTE: - console.log() will not work by default
		let cssDriver = new DriverByCss(driver, 5000);
		const context = {
			driver: driver,
			cssDriver: cssDriver,
			console: console,
			require: require
		}
		try {
			let ret = vm.runInNewContext(data, context, {filename: fileName});
			// If result is an Promise instance, wait for it.
			if (Promise.resolve(ret) !== ret) {
				ret = await ret;
			}
			//console.log("Result:", ret);
		} catch (error) {
			console.error("ERROR: ", error);
			console.log("Please re-enter command to retry.");
		}
	});
}

main();
