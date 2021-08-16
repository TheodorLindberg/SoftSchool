// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "api/error";
import { SchedulesListResponse } from "api/schoolsoft/definitions";
import { getSchoolsoftToken } from "api/schoolsoft/fetchSchoolsoftPage";
import getListSchedules from "api/schoolsoft/scraper/getListSchedules";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SchedulesListResponse>
) {
  await getListSchedules(getSchoolsoftToken(req))
    .then((messages) => {
      res.json({ data: messages });
    })
    .catch((err) => {
      handleError(err, res);
    });
}
