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
  var myHeaders = new Headers();

  myHeaders.append("Cookie", `JSESSIONID=${getSchoolsoftToken(req)}`);

  const response = await fetch(
    "https://sms.schoolsoft.se/rudbeck/jsp/student/" + path,
    {
      method: "GET",
      headers: myHeaders,
    } as Request
  );

  let data = new Uint8Array(await response.arrayBuffer());
  res.setHeader("Content-Type", response.headers.get("content-type") || "");
  res.write(data);
  res.end("");
}
