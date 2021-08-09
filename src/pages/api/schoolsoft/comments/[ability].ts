// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "api/error";
import { MatrixCommentHistoryResponse } from "api/schoolsoft/definitions";
import { getSchoolsoftToken } from "api/schoolsoft/fetchSchoolsoftPage";
import getCommentAbility from "api/schoolsoft/scraper/getCommentAbility";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MatrixCommentHistoryResponse>
) {
  await getCommentAbility(getSchoolsoftToken(req), req.query.course as string)
    .then((messages) => {
      res.json({ data: messages });
    })
    .catch((err) => {
      handleError(err, res);
    });
}
