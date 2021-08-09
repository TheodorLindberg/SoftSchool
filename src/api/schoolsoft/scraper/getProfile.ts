import Cheerio from "cheerio";
import { Mentour, Profile } from "../definitions";
import { fetchSchoolsoftPage } from "../fetchSchoolsoftPage";

export default async function getProfile(token: string): Promise<Profile> {
  const page = await fetchSchoolsoftPage("/right_student_pwdadmin.jsp", token);

  const $ = Cheerio.load(page);

  let mentours: Mentour[] = [];

  $("#pwdadmin > div.span6left > div:nth-child(20) > div > div > div")
    .children(".display")
    .each((i, element) => {
      let td = $("div > div > div > table > tbody > tr > td", element);
      let html = td?.html()?.split("<");
      if (html && html?.length >= 2) {
        let mentour: Mentour = {
          name: html[0],
          phone: html[1].substr(3, html[1].length),
          email: td.children("a").text(),
          img: $(element).find("img").attr("src") || "",
        };
        mentours.push(mentour);
      }
    });

  let profile: Profile = {
    user: {
      firstname: $(
        "#pwdadmin > div.span6left > div:nth-child(5) > div > div > div > p"
      ).text(),
      lastname: $(
        "#pwdadmin > div.span6left > div:nth-child(6) > div > div > div > p"
      ).text(),
      socialnumber: $(
        "#pwdadmin > div.span6left > div:nth-child(7) > div > div > div > p"
      ).text(),
      class: $(
        "#pwdadmin > div.span6left > div:nth-child(8) > div > div > div > p"
      ).text(),
    },
    contact: {
      adress: $(
        "#pwdadmin > div.span6left > div:nth-child(10) > div > div > div > p"
      ).text(),
      postcode: $(
        "#pwdadmin > div.span6left > div:nth-child(11) > div > div > div > p"
      ).text(),
      phoneHouse: $(
        "#pwdadmin > div.span6left > div:nth-child(12) > div > div > div > p"
      ).text(),
      phoneOther: $(
        "#pwdadmin > div.span6left > div:nth-child(13) > div > div > div > p"
      ).text(),
      mail: $(
        "#pwdadmin > div.span6left > div:nth-child(14) > div > div > div > p"
      ).text(),
      classroomMail: $(
        "#pwdadmin > div.span6left > div:nth-child(15) > div > div > div > p"
      ).text(),
      phone: $("#mobile").val(),
    },
    mentours: mentours,
    settings: {
      platform: $(
        "#pwdadmin > div.span6right > div:nth-child(2) > div > div > div > p"
      ).text(),
      guardians:
        $(
          "#pwdadmin > div.span6right > div:nth-child(4) > div > div > div > p"
        ).html() || "",
    },
  };

  return profile;
}
