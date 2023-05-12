const express = require("express");
const recordScreenshots = require("./recordScreenshot");
const { default: postWebsiteToStrapi } = require("./postWebsiteToStrapi");
const app = express();
const PORT = 8888;

app.use(express.json());

app.post("/take_screenshots", (req, res) => {
    const { url } = req.body;
    res.status(200).send({ msg: "I will take care of it." });

    recordScreenshots(url);
    // postWebsiteToStrapi();
});

app.listen(PORT, () =>
    console.log(`Express server running on http://localhost:${PORT}`)
);
