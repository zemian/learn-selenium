(async function () {
    let title = await cssDriver.openUrl('http://www.google.com');
    console.log("Page opened with title: " + title);

    await cssDriver.sendInputTextEnter("input[name='q']", 'webdriver');
    title = await cssDriver.waitTitle();
    console.log("Search page loaded with title: " + title);

    let stats = await cssDriver.waitElementText('#result-stats')
    console.log("Search result: " + stats);
})();
