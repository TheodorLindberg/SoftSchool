// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "api/error";
import { MessagesResponse } from "api/schoolsoft/definitions";
import {
  fetchSchoolsoftPage,
  getSchoolsoftToken,
} from "api/schoolsoft/fetchSchoolsoftPage";
import getMessages from "api/schoolsoft/scraper/getMessages";
import axios from "axios";
import { SCHOOLSOFT_API } from "api/apis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const path = req.url?.substr(req.url?.search("/file/") + 6);
  console.log(path);
  console.log(getSchoolsoftToken(req));
  const response = await axios({
    url: "https://sms.schoolsoft.se/rudbeck/jsp/student/" + path,
    method: "GET",
    responseType: "blob",
    timeout: 0,
    headers: {
      cookie: `JSESSIONID=${getSchoolsoftToken(req)}`,
    },
  });
  console.log(response.headers);

  let contentType = response?.headers
    ? response.headers["content-type"]
    : "text";
  res.setHeader("Content-Type", contentType);
  res.write(response.data);
  res.end();
}
