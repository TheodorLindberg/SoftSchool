// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "api/error";
import { getSchoolsoftToken } from "api/schoolsoft/fetchSchoolsoftPage";
import { NewsResponse } from "api/schoolsoft/definitions";
import getNews from "api/schoolsoft/scraper/getNews";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsResponse>
) {
  await getNews(getSchoolsoftToken(req))
    .then((messages) => {
      res.json({ data: messages });
    })
    .catch((err) => {
      handleError(err, res);
    });
}
