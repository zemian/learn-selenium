/*
A script to bootstrap a Selenium webdriver object and wait for user
to enter key stroke to reload live scripts to test the browser.

This provide a fast feedback loop for user to experiment the selenium
API without have to restart full script with browser reloading.

Usage:

1. Run: node src/test/demos/webdriver-test.js
2. Wait for browser to open
3. On the termina prompt, you may type following:key
	Type "quit" to exit this script
	Type "ENTER" to re-evaluate the test.js script file 
*/

const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const readline = require("readline");
const vm = require('vm');
const fs = require('fs');

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
	console.log("Starting browser automation.");

	const options = new chrome.Options();
	options.addArguments('user-data-dir=temp');
	console.log("Chrome options", options);
	const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

	function promptLoop () {
		prompt.question("Press ENTER to continue, (or 'quit' to exit)? ", async function (answer) {
			console.log("Answer: ", answer);
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
				} else if (command === 'test') {
					const fn = args[1];
					await onEnter(driver, fn);
				}
			}
			promptLoop();
		});
	}
	promptLoop();
}

function isPromise () {
	// https://gist.github.com/MarkoCen/ec27b8cd42855fde8a245d43b7b081d0
}

async function onEnter(driver, fn = 'test/demos/test.js') {
	console.log("Running VM script:", fn);
	fs.readFile(fn, async (err, data) => {
		if (err) {
			console.error("ERROR: ", err);
			return;
		}

		// NOTE: - console.log() will not work by default
		const context = {
			driver: driver,
			console: console,
			require: require
		}
		try {
			let ret = vm.runInNewContext(data, context, {filename: fn});
			// If result is an Promise instance, wait for it.
			if (Promise.resolve(ret) !== ret) {
				ret = await ret;
			}
			console.log("Result:", ret);
		} catch (error) {
			console.error("ERROR: ", error);
			console.log("Please re-enter command to retry.");
		}
	});
}

main();
