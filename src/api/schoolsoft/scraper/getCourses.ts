import Cheerio from "cheerio";
import { ActiveCourse, Course, CourseList, courseStatus } from "../definitions";
import { fetchSchoolsoftPage } from "../fetchSchoolsoftPage";

export default async function getCourses(token: string): Promise<CourseList> {
  const page = await fetchSchoolsoftPage("/right_student_course.jsp", token);

  const $ = Cheerio.load(page);
  const getCourseList = function (
    table: cheerio.Cheerio,
    status: courseStatus
  ) {
    let layout: { [key: string]: number } = {};
    table
      .find("tr.longlistheader")
      .children()
      .each((i, elem) => {
        layout[$(elem).text()] = i;
      });
    console.log(layout);
    const getCategory = (name: string, e: cheerio.Cheerio) => {
      if (layout.hasOwnProperty(name)) {
        return $(e.children()[layout[name]]).text();
      } else {
        return "";
      }
    };

    let courses: Array<Course> = [];
    table
      .children("tr[class=' ']:not(:last-child)")
      .each((i: number, elem: cheerio.Element) => {
        let e = $(elem);
        courses.push({
          name: getCategory("Kurs", e),
          code: getCategory("Kurskod", e),
          category: getCategory("Kategori", e),
          points: Number.parseInt(getCategory("Poäng", e)),
          start: getCategory("Startdatum", e),
          end: getCategory("Slutdatum", e),
          year: Number.parseInt(getCategory("År", e)),
          teacher: getCategory("Lärare", e),
          grade: getCategory("Betyg", e),
          ur: getCategory("U/R", e),
          status: status,
          id: Number.parseInt(
            $($(e.children()[layout["Kursmatris"]]).find("input.hidden"))
              .attr("id")
              ?.substr(15) || ""
          ),
        });
      });
    return courses;
  };
  let active: ActiveCourse[] = [];
  $("#subject_menu")
    .children()
    .each((i, elem) => {
      active.push({
        name: $(elem).text(),
        id: Number.parseInt($(elem).attr("name")?.substr(12) as string),
      });
    });

  return {
    active: active,
    list: [
      ...getCourseList(
        $("#inv_couse_content > table:nth-child(6) > tbody"),

        "compleated"
      ),
      ...getCourseList($("#edit > table > tbody"), "started"),
      ...getCourseList(
        $("#inv_couse_content > table:nth-child(3) > tbody"),

        "notstarted"
      ),
    ],
  };
}
