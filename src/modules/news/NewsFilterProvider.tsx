import { News } from "api/schoolsoft/definitions";
import { data } from "cheerio/lib/api/attributes";
import { selectConfigHidden } from "modules/config/config.selector";
import React, { useCallback, useContext } from "react";
import { useState } from "react";
import { useAppSelector } from "store";
import { selectNews } from "./news.slice";

export interface NewsFilterData {
  senders: string[];
  showHidden: boolean;
}

export interface NewsFilter {
  data: NewsFilterData;
  toggleSender: (senders: string[]) => void;
  toggleHidden: (show: boolean) => void;
}

const NewsFilterContext = React.createContext<NewsFilter>({
  data: { senders: [], showHidden: false },
  toggleSender: () => undefined,
  toggleHidden: () => undefined,
});

export function useNewsFilter() {
  return useContext(NewsFilterContext);
}

export default function NewsFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<NewsFilterData>({
    senders: [],
    showHidden: false,
  });

  const toggleSender = (senders: string[]) => {
    setData({ ...data, senders: senders });
  };
  const toggleHidden = (show: boolean) => {
    setData({ ...data, showHidden: show });
  };
  return (
    <NewsFilterContext.Provider value={{ data, toggleHidden, toggleSender }}>
      {children}
    </NewsFilterContext.Provider>
  );
}

export interface FilterdNews extends News {
  hidden: boolean;
}

export function useFilterdNewsList() {
  const news = useAppSelector(selectNews).newsList;
  const hiddenNews = useAppSelector(selectConfigHidden);
  const { data: filter } = useNewsFilter();

  const callback = useCallback(() => {
    let ret: { [instance: string]: FilterdNews[] } = {};

    news.forEach((elem) => {
      const hidden = hiddenNews.includes(elem.id);

      //If teacher selected always show hidden messages
      const showHiddenMatches =
        filter.showHidden || filter.senders.length > 0 || !hidden;

      const teachersMatches =
        filter.senders.length == 0 || filter.senders.includes(elem.sender);

      if (showHiddenMatches && teachersMatches) {
        let news = { ...elem, hidden: hidden };
        let key = elem.senderInstance || "Okänd";
        if (ret.hasOwnProperty(key)) ret[key].push(news);
        else ret[key] = [news];
      }
    });
    return Object.entries(ret);
  }, [news, hiddenNews, filter.senders, filter.showHidden]);

  return callback();
}
