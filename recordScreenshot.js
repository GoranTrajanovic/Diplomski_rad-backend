// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs");
const { mkdirSync } = require("fs");
const { chromium, firefox, webkit, devices } = require("playwright");
const prepareURL = require("./helper_functions/prepareURL");

module.exports = function (URL) {
    const { dir, URLSubpath } = prepareURL(URL);

    let timeAtStart = Date.now();

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    try {
        Promise.all([
            takeScreenshot(dir, URL, URLSubpath, "chromium", "desktop"),
            takeScreenshot(dir, URL, URLSubpath, "firefox", "desktop"),
            takeScreenshot(dir, URL, URLSubpath, "webkit", "desktop"),
            takeScreenshot(dir, URL, URLSubpath, "chromium", "mobile"),
            takeScreenshot(dir, URL, URLSubpath, "webkit", "mobile"),
        ]).then(() => {
            console.log(
                `It took ${
                    (Date.now() - timeAtStart) / 1000
                } seconds to complete ${URLSubpath}`
            );
        });

        // uploadToBackend(dir, URLWithoutHttps);
    } catch (err) {
        console.log(err);
        res.status(404).json({ errorMsg: "Error occured in Express API." });
    }
};

async function takeScreenshot(dir, URL, URLSubpath, browser, device) {
    console.log(`Processing: ${URL} | ${browser} | ${device}`);
    let browserPW = await (browser === "chromium"
        ? chromium
        : browser === "firefox"
        ? firefox
        : browser === "webkit"
        ? webkit
        : null
    ).launch();
    // let browserPW = await chromium.launch();
    // let context = await browserPW.newContext();
    let context = await browserPW.newContext(
        device === "mobile" ? devices["iPhone 11"] : null
    );
    let page = await context.newPage();
    await page.goto(URL);
    await page.screenshot({
        path: `app/screenshots/${dir}/${URLSubpath}_-_${browser}_-_${device}.png`,
        fullPage: true,
    });
}
