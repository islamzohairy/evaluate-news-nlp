var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const request = require("request");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
let port = process.env.PORT || 8081;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

app.post("/analyze", function (req, res) {
  const { formText, inputType } = req.body;
  let body = {};

  inputType === "url"
    ? (body = JSON.stringify({
        key: process.env.API_KEY,
        url: formText,
        lang: "auto",
      }))
    : (body = JSON.stringify({
        key: process.env.API_KEY,
        txt: formText,
        lang: "auto",
      }));

  const requestOptions = {
    method: "POST",
    body,
    redirect: "follow",
    uri: "https://api.meaningcloud.com/sentiment-2.1",
    headers: {
      "Content-Type": "application/json",
    },
  };
  request(requestOptions, function (error, response, body) {
    console.log("err: ", error);
    console.log(body);

    res.send(body);
    // return;
  });
});
