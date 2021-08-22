import HomeLayout from "layouts/home/HomeLayout";
import { fetchNews, selectNews } from "modules/news/news.slice";
import NewsFilter from "modules/news/NewsFilter";
import NewsFilterProvider from "modules/news/NewsFilterProvider";
import NewsList from "modules/news/NewsList";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";

function News() {
  const news = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (news.status === "idle") {
      dispatch(fetchNews());
    }
  }, [news.status, dispatch]);

  return (
    <HomeLayout>
      <NewsFilterProvider>
        <NewsFilter />
        <NewsList />
      </NewsFilterProvider>
    </HomeLayout>
  );
}

export default News;
