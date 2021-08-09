import { MatrixCommentHistoryField } from "../definitions";
import Cheerio from "cheerio";
import { MatrixCommentHistory } from "../definitions";
import { fetchSchoolsoftPage } from "../fetchSchoolsoftPage";
import { exctractAbilityField } from "./getMatrix";

export default async function getCommentAbility(
  token: string,
  commentAbilityId: string
): Promise<MatrixCommentHistory> {
  let page = await fetchSchoolsoftPage(
    `/right_student_ability_ajax.jsp?action=list&student=8698&gradesubject=-1&year=-1&ability=${commentAbilityId}&testview=1&course=4029&system_step=-1&date=2021-07-17&archive=0&showhistory=1`,
    token
  );

  const $ = Cheerio.load(page);

  let fields: MatrixCommentHistoryField[] = [];

  $("body > table > tbody > tr.hand").each(
    (i: number, elem: cheerio.Element) => {
      const $tr = $(elem);

      const updateData = $($tr.children()[0]).text();
      const date = updateData.substring(0, updateData.lastIndexOf(":") + 3);
      const author = updateData.substring(
        updateData.lastIndexOf(":") + 4,
        updateData.length
      );

      let field: MatrixCommentHistoryField = {
        date: date,
        author: author,
        comment: $($tr.children()[1]).text(),
      };
      fields.push(field);
    }
  );
  return fields;
}
