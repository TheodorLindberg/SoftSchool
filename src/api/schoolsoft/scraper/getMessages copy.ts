import Cheerio from "cheerio";
import { Message, MessageList } from "../definitions";
import { fetchSchoolsoftPage } from "../fetchSchoolsoftPage";

export default async function getMessages(
  token: string,
  offset: number,
  limit: number
): Promise<MessageList> {
  const page = await fetchSchoolsoftPage(
    `/right_student_message.jsp?offset=${offset || 0}`,
    token
  );

  const $ = Cheerio.load(page);
  let messages: Message[] = [];

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
}
