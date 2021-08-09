// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "api/error";
import { CoursesResponse } from "api/schoolsoft/definitions";
import { getSchoolsoftToken } from "api/schoolsoft/fetchSchoolsoftPage";
import getCourses from "api/schoolsoft/scraper/getCourses";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CoursesResponse>
) {
  await getCourses(getSchoolsoftToken(req))
    .then((messages) => {
      res.json({ data: messages });
    })
    .catch((err) => {
      handleError(err, res);
    });
}
