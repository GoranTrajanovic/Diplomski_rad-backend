const express = require("express");
const { default: recordScreenshots } = require("./recordScreenshot");
const { default: postWebsiteToStrapi } = require("./postWebsiteToStrapi");
const app = express();
const PORT = 8888;

app.use(express.json());

app.post("/take_screenshots", (req, res) => {
    const { url } = req.body;

    recordScreenshots(url);
    // postWebsiteToStrapi();

    res.status(200).send({
        msg: "Screenshots stored",
    });
});

app.listen(PORT, () =>
    console.log(`Express server running on http://localhost:${PORT}`)
);
