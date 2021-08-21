import React, { useContext } from "react";
import { useState } from "react";

export interface NewsFilterData {}

const NewsFilterContext = React.createContext<NewsFilterData>({});

export function useNewsFilter() {
  return useContext(NewsFilterContext);
}

export default function NewsFilterProvider() {
  const [value, setValue] = useState<NewsFilterData>({});

  return (
    <NewsFilterContext.Provider value={value}></NewsFilterContext.Provider>
  );
}
