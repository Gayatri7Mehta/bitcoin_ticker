const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const crypto = req.body.crypto;
    const fiat = req.body.fiat;
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${fiat}`;

    https.get(url, function (response) {
        response.on("data", function (data) {
            const cryptoData = JSON.parse(data);
            const price = cryptoData[crypto][fiat];
            res.send(`<h1>The price of ${crypto.charAt(0).toUpperCase() + crypto.slice(1)} is ${price} ${fiat.toUpperCase()}.</h1>`);
        });
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
