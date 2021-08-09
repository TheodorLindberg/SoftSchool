// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "api/error";
import { CourseMatrixResponse } from "api/schoolsoft/definitions";
import { getSchoolsoftToken } from "api/schoolsoft/fetchSchoolsoftPage";
import getMatrix from "api/schoolsoft/scraper/getMatrix";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CourseMatrixResponse>
) {
  await getMatrix(getSchoolsoftToken(req), req.query.course as string)
    .then((messages) => {
      res.json({ data: messages });
    })
    .catch((err) => {
      handleError(err, res);
    });
}
