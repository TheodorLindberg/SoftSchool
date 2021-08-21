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
  const { path } = req.query;
  await axios
    .get("https://sms.schoolsoft.se/rudbeck/jsp/student/" + path, {
      headers: {
        cookie: `JSESSIONID=${getSchoolsoftToken(req)}`,
      },
    })
    .then((response) => {
      console.log(path);
      let contentType = response?.headers
        ? response.headers["content-type"]
        : "text";
      console.log(contentType);
      console.log(response.headers);
      res.setHeader("Content-Type", contentType);
      res.send(response.data);
    })
    .catch((err) => handleError(err, res));
}
