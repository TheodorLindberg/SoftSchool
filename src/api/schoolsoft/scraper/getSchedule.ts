import Cheerio from "cheerio";
import { LessonEvent, Event, WeekSchedule, eventType } from "../definitions";
import { fetchSchoolsoftPage } from "../fetchSchoolsoftPage";

import moment from "moment";

export type scheduleType = "student" | "class" | "teacher";

function getScheduleImpl($: cheerio.Root, week: number) {
  let objects: any[] = [];
  const columns = 4 * 5;
  const rows = 108;
  let grid = Array(columns)
    .fill(null)
    .map(() =>
      Array(rows)
        .fill(null)
        .map(() => {
          return -2;
        })
    );
  let events: any[] = [];

  $("table.print > tbody > tr").each((index, elem) => {
    $(elem)
      .children("td:not([width='5%'],[width='1px'])")
      .each((i, elem) => {
        objects.push({
          row: index,
          colspan: (elem as any).attribs["colspan"],
          rowspan: (elem as any).attribs["rowspan"],
          ...($(elem).find("table").length > 0 && { elem: $(elem) }),
        });
      });
  });

  function getWidth(row: number) {
    for (let col = 0; col < columns; col++) {
      if (grid[col][row] == -2) return col;
    }
    return 12;
  }

  objects.forEach((object, i) => {
    const width = getWidth(object.row);
    if (!object.colspan || !object.rowspan) return;

    const id = object.elem ? events.push(object.elem) - 1 : -1;

    for (let col = 0; col < object.colspan; col++) {
      for (let row = 0; row < object.rowspan; row++) {
        grid[width + col][object.row + row] = id;
      }
    }
  });

  function getDay(i: any) {
    let all = [...grid[i++], ...grid[i++], ...grid[i++], ...grid[i++]];
    return [...Array.from(new Set(all))].filter((val: any) => {
      return val >= 0;
    });
  }

  let mon = getDay(0);
  let tue = getDay(4);
  let wed = getDay(8);
  let thu = getDay(12);
  let fri = getDay(16);

  function getEvents(eventIds: any, day: any, week: any) {
    let parsedEvents: any = [];
    eventIds.forEach((id: any) => {
      const $event = events[id];
      let firstType =
        $event.find("tr:nth-child(1) > td:not(.schedulecell)").text().length ==
        0;

      let data;
      if (firstType)
        data = {
          name: $event.find("tr:nth-child(1)").text().trim(),
          start: $event.find("tr:nth-child(2)").text().trim(),
          end: $event.find("tr:nth-child(3)").text().trim().slice(1),
          location: $event.find("tr:nth-child(4)").text().trim(),
          code: $event.find("tr:nth-child(5)").text().trim(),
          teacher: $event.find("tr:nth-child(6)").text().trim(),
          period: $event.find("tr:nth-child(7)").text().trim(),
        };
      else
        data = {
          name: $event.find("tr:nth-child(1) > td:nth-child(1)").text().trim(),
          start: $event.find("tr:nth-child(1) > td:nth-child(2)").text().trim(),
          end: $event
            .find("tr:nth-child(2) > td:nth-child(2)")
            .text()
            .trim()
            .slice(1),
          location: $event
            .find("tr:nth-child(2) > td:nth-child(1)")
            .text()
            .trim(),
          code: $event.find("tr:nth-child(3)").text().trim(),
          teacher: $event.find("tr:nth-child(4)").text().trim(),
          period: $event.find("tr:nth-child(5)").text().trim(),
        };
      let yearAdd = week < 27 ? 1 : 0;
      let event = {
        startDate: moment()
          .startOf("year")
          .add(yearAdd, "y")
          .add(week, "weeks")
          .add(day - (4 + yearAdd), "days")
          .add(moment.duration(data.start))
          .utcOffset(120, true)
          .toISOString(),
        endDate: moment()
          .startOf("year")
          .add(yearAdd, "y")
          .add(week, "weeks")
          .add(day - (4 + yearAdd), "days")
          .add(moment.duration(data.end))
          .utcOffset(120, true)
          .toISOString(),
        location: data.location,
        type: "lesson",
        lessonEvent: {
          courseCode: data.code,
          courseName: data.name,
          courseId: -1,
          period: `${data.period.includes("P1") ? "1" : ""}${
            data.period.includes("P2") ? "2" : ""
          }${data.period.includes("P3") ? "3" : ""}`,
          teacherName: data.teacher,
        },
      };
      parsedEvents.push(event);
    });

    return parsedEvents;
  }

  let allEvents = [
    ...getEvents(mon, 0, week),
    ...getEvents(tue, 1, week),
    ...getEvents(wed, 2, week),
    ...getEvents(thu, 3, week),
    ...getEvents(fri, 4, week),
  ];
  return allEvents;
}

const COLUMNS_PER_DAY = 4;
export default async function getSchedule(
  token: string,
  week: number,
  type: scheduleType,
  id: number
): Promise<WeekSchedule> {
  let path = "";
  if (type == "student")
    path = `/right_student_schedule_print.jsp?action=print&student=${id}&term=${week}`;
  else if (type == "teacher")
    path = `/right_student_schedule_print.jsp?action=print&teacher=${id}&term=${week}`;
  else if (type == "class")
    path = `/right_student_schedule_print.jsp?action=print&class=${id}&term=${week}`;

  const page = await fetchSchoolsoftPage(path, token);

  const $ = Cheerio.load(page);

  return {
    events: getScheduleImpl($, week),
    week: week,
  };
}
