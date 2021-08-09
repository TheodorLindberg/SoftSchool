// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "api/error";
import { MessagesResponse } from "api/schoolsoft/definitions";
import { getSchoolsoftToken } from "api/schoolsoft/fetchSchoolsoftPage";
import getMessages from "api/schoolsoft/scraper/getMessages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessagesResponse>
) {
  await getMessages(getSchoolsoftToken(req), Number(req.query.offset || 0), 20)
    .then((messages) => {
      res.json({ data: messages });
    })
    .catch((err) => {
      handleError(err, res);
    });
}
