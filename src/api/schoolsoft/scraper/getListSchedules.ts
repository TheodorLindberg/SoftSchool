import Cheerio from "cheerio";
import { Message, MessageList, SchedulesList } from "../definitions";
import { fetchSchoolsoftPage } from "../fetchSchoolsoftPage";

export default async function getListSchedules(
  token: string
): Promise<SchedulesList> {
  try {
    const page = await fetchSchoolsoftPage(
      `/right_student_schedule.jsp`,
      token
    );
    const teacherPage = await fetchSchoolsoftPage(
      `/right_student_schedule.jsp`,
      token,
      "POST",
      "action=select&term=32&type=1&button=Visa"
    );

    const $teacher = Cheerio.load(teacherPage);
    const $ = Cheerio.load(page);

    const getList = (root: cheerio.Root) => {
      const $list = root("ul.dropdown-menu");
      let list: { [id: number]: string } = {};
      $list.children().each((i: number, element: cheerio.Element) => {
        let href = $(element).find("a").attr("href") as string;
        list[
          Number.parseInt(
            href?.substring(href.lastIndexOf("=") + 1, href.length)
          )
        ] = $(element).text();
      });
      return list;
    };

    let idString = $(
      "#schedule_cont > div.h2_box > div:nth-child(3) > div > table > tbody > tr > td:nth-child(2) > a"
    )
      .attr("onclick")
      ?.match(/student=(\d{4,5})/);

    return {
      teachers: getList($teacher),
      classes: getList($),
      studentId: idString ? Number.parseInt(idString[1] as string) : -1,
      name: $("#top_content > span:nth-child(1)").text().trim().substr(5),
    };
  } catch (error) {
    throw error;
  }
}
