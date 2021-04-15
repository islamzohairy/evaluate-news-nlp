const dotenv = require("dotenv");
dotenv.config();

let json = {
  key: process.env.API_KEY,
  lang: "auto",
};

module.exports = json;
