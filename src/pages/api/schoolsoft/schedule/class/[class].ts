// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "api/error";
import { WeekScheduleResponse } from "api/schoolsoft/definitions";
import { getSchoolsoftToken } from "api/schoolsoft/fetchSchoolsoftPage";
import getSchedule from "api/schoolsoft/scraper/getSchedule";
import moment from "moment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeekScheduleResponse>
) {
  const { week, class: id } = req.query;
  await getSchedule(
    getSchoolsoftToken(req),
    Number.parseInt(week as string) || moment().week() - 1,
    "class",
    Number.parseInt(id as string)
  )
    .then((messages) => {
      res.json({ data: messages });
    })
    .catch((err) => {
      handleError(err, res);
    });
}
