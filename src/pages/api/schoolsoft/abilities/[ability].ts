// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "api/error";
import { AbilityHistoryResponse } from "api/schoolsoft/definitions";
import { getSchoolsoftToken } from "api/schoolsoft/fetchSchoolsoftPage";
import getAbility from "api/schoolsoft/scraper/getAbility";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AbilityHistoryResponse>
) {
  await getAbility(getSchoolsoftToken(req), req.query.course as string)
    .then((messages) => {
      res.json({ data: messages });
    })
    .catch((err) => {
      handleError(err, res);
    });
}
