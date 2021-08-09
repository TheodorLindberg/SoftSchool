import Cheerio from "cheerio";
import {
  AbilityField,
  AbilityFields,
  AbilityHistory,
  AbilityHistoryField,
} from "../definitions";
import { fetchSchoolsoftPage } from "../fetchSchoolsoftPage";
import { exctractAbilityField } from "./getMatrix";

export default async function getAbility(
  token: string,
  abilityId: string
): Promise<AbilityHistory> {
  let page = await fetchSchoolsoftPage(
    `/right_student_ability_ajax.jsp?action=list&student=8698&gradesubject=-1&year=-1&ability=${abilityId}&testview=1&course=4029&system_step=-1&date=2021-07-17&archive=0&showhistory=1`,
    token
  );

  const $ = Cheerio.load(page);

  let changes: AbilityHistoryField[] = [];

  $("body > table > tbody > tr.hand").each(
    (i: number, elem: cheerio.Element) => {
      const $tr = $(elem);

      const updateData = $($tr.children()[0]).text();
      const date = updateData.substring(0, updateData.lastIndexOf(":") + 3);
      const author = updateData.substring(
        updateData.lastIndexOf(":") + 4,
        updateData.length
      );

      let change: AbilityHistoryField = {
        index: i,
        abilityId: Number(abilityId),
        date: date,
        author: author,
        E: exctractAbilityField($($tr.children()[1])),
        C: exctractAbilityField($($tr.children()[2])),
        A: exctractAbilityField($($tr.children()[3])),
        comment: $($tr.children()[4]).text(),
      };
      changes.push(change);
    }
  );

  return changes;
}
