import Cheerio from "cheerio";
import { Course, CourseList } from "../definitions";
import { fetchSchoolsoftPage } from "../fetchSchoolsoftPage";

export default async function getCourses(token: string): Promise<CourseList> {
  const page = await fetchSchoolsoftPage("/right_student_course.jsp", token);

  const $ = Cheerio.load(page);
  const getCourseList = function (table: cheerio.Cheerio, grade: boolean) {
    let courses: Array<Course> = [];
    table
      .children("tr[class=' ']:not(:last-child)")
      .each((i: number, elem: cheerio.Element) => {
        let e = $(elem);
        courses.push({
          name: $(e.children()[0]).text(),
          code: $(e.children()[1]).text(),
          category: $(e.children()[2]).text(),
          points: Number.parseInt($(e.children()[3]).text()),
          start: $(e.children()[4]).text(),
          end: $(e.children()[5]).text(),
          year: Number.parseInt($(e.children()[6]).text()),
          teacher: $(e.children()[7]).text(),
          grade: $(e.children()[grade ? 8  : 7]).text(),
          ur: $(e.children()[grade ? 9 : 8]).text(),
          id: Number.parseInt(
            $($(e.children()[grade ? 10 : 9]).find("input.hidden"))
              .attr("id")
              ?.substr(15) || ""
          ),
        });
      });
    return courses;
  };

  return {
    compleated: getCourseList(
      $("#inv_couse_content > table:nth-child(6) > tbody"),
      true
    ),
    started: getCourseList($("#edit > table > tbody"), true),
    notstarted: getCourseList(
      $("#inv_couse_content > table:nth-child(3) > tbody"),
      false
    ),
  };
}
