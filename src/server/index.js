var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const request = require("request");

const app = express();

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

app.post("/test", async function (req, res) {
  const formdata = new FormData();
  formdata.append("key", process.env.API_KEY);
  formdata.append("url", req.body.formText);
  formdata.append("lang", "auto");

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
    uri: "https://api.meaningcloud.com/sentiment-2.1",
  };
  const result = await request(requestOptions, function (error, response) {
    // console.log("response: ", response);
    console.log(error, response.body);
    return response;
  });
  res.json(result);
  // res.send(mockAPIResponse);
});
