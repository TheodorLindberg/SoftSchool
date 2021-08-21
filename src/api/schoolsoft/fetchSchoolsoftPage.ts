import { Response } from "./definitions";
import axios, { AxiosError, AxiosResponse, Method } from "axios";
import { Iconv } from "iconv";
import HttpError from "../error";
import { NextApiRequest } from "next";

const https = require("https");

export const cache = false;

const url = process.env.SCHOOLSOFT_PATH;

export async function fetchSchoolsoftPage(
  path: string,
  JSESSIONID?: string,
  method?: Method,
  data?: any
) {
  console.log(url + path);
  if (!JSESSIONID) throw new HttpError("Invalid Schoolsoft Session", 403);
  let response;

  try {
    response = await axios.request({
      url: url + path,
      method: method || "GET",
      headers: {
        Cookie: `JSESSIONID=${JSESSIONID}`,
        ...(data && { "Content-Type": "application/x-www-form-urlencoded" }),
      },
      responseType: "arraybuffer",
      data: data,
    });
  } catch (error: any) {
    if (error?.response?.status == 403) {
      throw new HttpError("Invalid Schoolsoft Session", 403);
    } else {
      throw new HttpError("Internal server error", 500);
    }
  }

  if (
    response.data ==
    `<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\r\n<html>\r\n<head><title>SchoolSoft</title>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">\r\n</head>\r\n<body onload=\"top.location.replace('../jsp/Login.jsp?eventMessage=ERR_Not_Logged_In');\" >\r\n</body>\r\n</html>\r\n`
  ) {
    throw new HttpError("Invalid or outdated schoolsoft session", 403);
  }

  //The Schoolsoft version needs to be decoded to utf-8
  if (response.headers["content-type"] == "text/html;charset=ISO-8859-1") {
    const iconv = new Iconv("ISO-8859-1", "utf-8");
    return iconv.convert(response.data) as any as string;
  } else {
    return response.data;
  }
  //Convert data
}

export function getSchoolsoftToken(req: NextApiRequest) {
  if (req.headers.jsessionid) return (req.headers as any).jsessionid;
  else if (req.cookies.JSESSIONID) return req.cookies.JSESSIONID;
  else if (req.query.JSESSIONID) return req.query.JSESSIONID as string;
  else {
    return undefined;
  }
}
