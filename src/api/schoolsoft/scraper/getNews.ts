import Cheerio from "cheerio";
import moment from "moment";
import {
  Attatchment,
  Message,
  MessageList,
  News,
  NewsList,
} from "../definitions";
import { fetchSchoolsoftPage } from "../fetchSchoolsoftPage";

export default async function getNews(token: string): Promise<NewsList> {
  try {
    const page = await fetchSchoolsoftPage(`/right_student_news.jsp`, token);

    const $ = Cheerio.load(page);

    const $content = $("#news_con_content");

    let instances: string[] = [];

    $content.children("div.h3_bold").each((i, elem) => {
      instances.push($(elem).text());
    });

    let skipFirst =
      $content.children("div.accordion").length > instances.length;

    let $accordion = $content.children("div.accordion");
    let news: NewsList = [];

    $accordion.each((i, elem) => {
      if (skipFirst && i == 0) return;

      let instance: string = skipFirst ? instances[i - 1] : instances[i];
      $(elem)
        .children()
        .each((i, elem) => {
          const $group = $(elem);
          const $info = $group.find("div.inner_right_info");
          let id = Number.parseInt($group.attr("id")?.substr(15) as string);

          const getField = (id: string) => {
            return $($info.find(`div[id^="${id}"]`)).text();
          };

          let attatchments: Attatchment[] = [];
          $group
            .find('div[id^="fileAttach"]')
            .find("a")
            .each((i, elem) => {
              const $a = $(elem);
              let href = $a.attr("href") || "";
              let text = $a.parent().text();
              attatchments.push({
                id: Number.parseInt(
                  href?.substr(href.lastIndexOf("=") + 1) || ""
                ),
                name: $a.attr("title") || "",
                size: text.substring(
                  text.lastIndexOf("(") + 1,
                  text.lastIndexOf(")")
                ),
                link: href,
              });
            });
          $group
            .find("div.accordion_inner_left")
            .find("img")
            .each((i, elem) => {
              $(elem).attr(
                "src",
                `http://localhost:3000/api/schoolsoft/file/${
                  $(elem).attr("src") || ""
                }`
              );
            });

          news.push({
            title: $group.find("span").text(),
            id: id,
            fromDate: moment
              .utc(
                `${getField("fromDateYear")}-${getField(
                  "fromDateMonth"
                )}-${getField("fromDateDay")} 00:00:00.000`
              )
              .toISOString(),
            untilDate: moment
              .utc(
                `${getField("toDateYear")}-${getField(
                  "toDateMonth"
                )}-${getField("toDateDay")} 00:00:00.000`
              )
              .toISOString(),
            sender: $($info.children("div")[0]).text(),
            senderInstance: instance,
            recipients: $($info.children("div")[1]).text(),
            content: $group.find("div.accordion_inner_left").html() as string,
            group: Number.parseInt(getField("groups")),
            attatchments: attatchments,
          });
        });
    });

    // $("#accordion")
    //   .children(".accordion-group")
    //   .each((i: number, element: cheerio.Element) => {
    //     let message = $(element);
    //     let messageData: Message = {
    //       title: $(message.find("span")[0]).text(),
    //       author: $(".accordion-heading-from", message).text(),
    //       date: $(
    //         $(
    //           ".accordion_inner_right > form > div:nth-child(8)",
    //           message
    //         ).children("span")
    //       ).text(),
    //       content:
    //         $(
    //           $("div.accordion_inner_left > p", message).children("span")
    //         ).html() || "",
    //       id: Number(message.attr("id")?.substr(15)),
    //     };
    //     messages.push(messageData);
    //   });

    return news;
  } catch (error) {
    throw error;
  }
}
