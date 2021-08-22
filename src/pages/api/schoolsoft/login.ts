import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";
import cheerio from "cheerio";
axiosCookieJarSupport(axios);
import qs from "querystring";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method != "POST") {
    res.status(405).send("Method Not Allowed" as any);
    return;
  }
  try {
    const cookieJar = new tough.CookieJar();

    const { username, password } = req.body;
    var data = {
      authmech: "Användarnamn och Lösenord",
      do: "login",
      username: username,
      password: password,
      cbval_vendorBase64: "AAAk/wMGAAAAAQ==",
    };
    var config = {
      method: "post",
      url: "https://idp1.sollentuna.se/wa/auth",
      jar: cookieJar, // tough.CookieJar or boolean
      withCredentials: true, // If true, send cookie stored in jar
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(data),
    };
    const req1 = await axios(config as any);

    const responseData = req1.data;
    let titleIndex = responseData.search("<title>");
    let titleEndIndex = responseData.indexOf("<", titleIndex + 5);
    let title = responseData.substring(titleIndex + 7, titleEndIndex);

    if (title == "Sollentuna kommuns inloggningsportal") {
      res.send({ error: "Invalid username or password" });
      return;
    }

    var config2 = {
      method: "get",
      url: "https://idp1.sollentuna.se/redir/Schoolsoft_redirect.html",
      jar: cookieJar, // tough.CookieJar or boolean
      withCredentials: true, // If true, send cookie stored in jar
    };
    const req2 = await axios(config2 as any);

    var config3 = {
      method: "get",
      url: "https://sms.schoolsoft.se/rudbeck/samlLogin.jsp",
      jar: cookieJar, // tough.CookieJar or boolean
      withCredentials: true, // If true, send cookie stored in jar
      headers: {},
    };
    const req3 = await axios(config3 as any);

    const $ = cheerio.load(req3.data);

    let formData = {
      SAMLResponse: $("input[name='SAMLResponse']").attr("value"),
      RelayState: $("input[name='RelayState']").attr("value"),
    };

    var config4 = {
      method: "post",
      url: "https://sms.schoolsoft.se/Shibboleth.sso/SAML2/POST",
      jar: cookieJar, // tough.CookieJar or boolean
      withCredentials: true, // If true, send cookie stored in jar
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(formData),
    };
    const req4 = await axios(config4 as any);

    let JSESSION = cookieJar
      .toJSON()
      .cookies.find((cookie) => cookie.key == "JSESSIONID");
    if (JSESSION) var session = JSESSION.value;
    await cookieJar.removeAllCookies();
    res.json({ session: session });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
}
