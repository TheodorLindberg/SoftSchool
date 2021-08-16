import Cheerio from "cheerio";
import { Message, MessageList, NewsList } from "../definitions";
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
    if (instances.length > $accordion.length) $accordion.slice(0, 1);

    let news: NewsList = [];

    $accordion.each((i, elem) => {
      let instance = instances[i];
      $(elem)
        .children()
        .each((i, elem) => {
          const $group = $(elem);
          let id = Number.parseInt($group.attr("id")?.substr(15) as string);
        });
    });

    $("#accordion")
      .children(".accordion-group")
      .each((i: number, element: cheerio.Element) => {
        let message = $(element);
        let messageData: Message = {
          title: $(message.find("span")[0]).text(),
          author: $(".accordion-heading-from", message).text(),
          date: $(
            $(
              ".accordion_inner_right > form > div:nth-child(8)",
              message
            ).children("span")
          ).text(),
          content:
            $(
              $("div.accordion_inner_left > p", message).children("span")
            ).html() || "",
          id: Number(message.attr("id")?.substr(15)),
        };
        messages.push(messageData);
      });

    const paginationHeader = $("#content > div.pagination-header").text();

    const totalMessages = paginationHeader.substr(
      paginationHeader.lastIndexOf(" ")
    );

    return {
      messages: messages,
      offset: offset + messages.length,
      total: Number(totalMessages),
    };
  } catch (error) {
    throw error;
  }
}
