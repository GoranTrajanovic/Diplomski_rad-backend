// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs, { mkdirSync } from "fs";
import { chromium, firefox, webkit, devices } from "playwright";
import prepareURL from "./helper_functions/prepareURL";

export default function recordScreenshots(URL) {
    const { dir, URLSubpath } = prepareURL(URL);

    let timeAtStart = Date.now();

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    try {
        takeScreenshot(URL, URLSubpath, "chromium", "desktop");
        takeScreenshot(URL, URLSubpath, "firefox", "desktop");
        takeScreenshot(URL, URLSubpath, "webkit", "desktop");
        takeScreenshot(URL, URLSubpath, "chromium", "mobile");
        takeScreenshot(URL, URLSubpath, "webkit", "mobile");

        res.status(200).json({ url: req.body.url });
        console.log(
            `It took ${
                (Date.now() - timeAtStart) / 1000
            } seconds to complete ${URLWithoutHttps}`
        );

        // uploadToBackend(dir, URLWithoutHttps);
    } catch (err) {
        console.log(err);
        res.status(404).json({ errorMsg: "Error occured." });
    }
}

async function takeScreenshot(URL, URLSubpath, browser, device) {
    console.log(`Processing screenshot for: ${browser} ${device}`);
    let browser = await (browser === "chromium"
        ? chromium
        : browser === "firefox"
        ? firefox
        : browser === "webkit"
        ? webkit
        : null
    ).launch();
    let context = await browser.newContext(
        device === "mobile" ? devices["iPhone 11"] : null
    );
    let page = await context.newPage();
    await page.goto(URL);
    await page.screenshot({
        path: `${dir}/${URLSubpath}_-_${browser}_-_${device}.png`,
        fullPage: true,
    });
}
