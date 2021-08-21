const axios = require("axios");
const axiosCookieJarSupport = require("axios-cookiejar-support").default;
const tough = require("tough-cookie");
const cheerio = require("cheerio");
axiosCookieJarSupport(axios);
const qs = require("querystring");

const cookieJar = new tough.CookieJar();

const test = async () => {};

try {
  test();
} catch (error) {
  console.log(error);
}
