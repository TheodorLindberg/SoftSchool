import Cheerio from "cheerio";
import {
  Ability,
  AbilityField,
  AbilityFields,
  abilityLevel,
  Matrix,
} from "../definitions";

import { fetchSchoolsoftPage } from "../fetchSchoolsoftPage";

export function exctractAbilityField($field: cheerio.Cheerio): AbilityField {
  let level: abilityLevel = "none";
  if ($field.children().attr("class") == "green") level = "green";
  if ($field.children().attr("class") == "yellow") level = "yellow";

  let content = "";
  if (level == "none") content = $field.html() || "";
  else content = $field.children().html() || "";

  return {
    text: content,
    level: level,
  };
}

export default async function getMatrix(
  token: string,
  courseId: string
): Promise<Matrix> {
  const page = await fetchSchoolsoftPage(
    `/right_student_ability_ajax.jsp?course=${courseId}&schooltype=9`,
    token
  );

  const $ = Cheerio.load(page);
  const abilities: Array<Ability> = [];
  console.log(page);
  $("body > table:nth-child(1) > tbody > tr.abilitychanges ").each(
    (i: number, elem: cheerio.Element) => {
      const $tr = $(elem);

      let req: Ability = {
        name: $($tr.children()[0]).text(),
        abilityId: Number($tr.attr("id")?.substr(14, 10)),

        E: exctractAbilityField($($tr.children()[1])),
        C: exctractAbilityField($($tr.children()[2])),
        A: exctractAbilityField($($tr.children()[3])),
        comment: $($tr.children()[4]).text(),
      };
      abilities.push(req);
    }
  );

  const lasteChangeText = $("#content > div.alert.alert-info > div").text();
  const lastChange = lasteChangeText.substr(
    lasteChangeText.indexOf("2"),
    lasteChangeText.length
  );

  const abilityId = $(
    "body > table:nth-child(3) > tbody > tr.abilitychanges.hand"
  )
    .attr("id")
    ?.substr(14, 10);

  return {
    abilities: abilities,
    lastChange: null as any,
    commentAbilityId: Number(abilityId),
    comment:
      $(
        "body > table:nth-child(3) > tbody > tr.abilitychanges.hand > td"
      ).html() || "",
  };
}
