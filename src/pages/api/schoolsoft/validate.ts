// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

type Response = {
  valid: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  await axios
    .get(
      "https://sms.schoolsoft.se/rudbeck/jsp/student/right_student_ability_ajax.jsp?action=list&ability=1",
      { headers: { Cookie: `JSESSIONID=${(req as any).token}` } }
    )
    .then((response) => res.status(200).json({ valid: true }))
    .catch((error) => res.status(403).json({ valid: false }));
}
