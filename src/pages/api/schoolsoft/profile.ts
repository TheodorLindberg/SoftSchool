// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "api/error";
import { ProfileResponse } from "api/schoolsoft/definitions";
import { getSchoolsoftToken } from "api/schoolsoft/fetchSchoolsoftPage";
import getProfile from "api/schoolsoft/scraper/getProfile";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileResponse>
) {
  await getProfile(getSchoolsoftToken(req))
    .then((profile) => {
      res.json({ data: profile });
    })
    .catch((err) => {
      handleError(err, res);
    });
}
