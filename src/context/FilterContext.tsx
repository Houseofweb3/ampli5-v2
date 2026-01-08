"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface FilterContextType {
  filterQueries: string;
  setFilterQueries: React.Dispatch<React.SetStateAction<string>>;
  platforms: string[];
  setPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  niche: string[];
  setNiche: React.Dispatch<React.SetStateAction<string[]>>;
  er: string[];
  setER: React.Dispatch<React.SetStateAction<string[]>>;
  contentTypes: string[];
  setContentTypes: React.Dispatch<React.SetStateAction<string[]>>;
  credibility: string[];
  setCredibility: React.Dispatch<React.SetStateAction<string[]>>;
  price: string[];
  setPrice: React.Dispatch<React.SetStateAction<string[]>>;
  industry: string[];
  setIndustry: React.Dispatch<React.SetStateAction<string[]>>;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filterQueries, setFilterQueries] = useState(
    () => (typeof window !== 'undefined' ? localStorage.getItem("filterQueries") : "") || ""
  );
  const [platforms, setPlatforms] = useState<string[]>(() =>
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("platforms") || "[]") : []
  );
  const [niche, setNiche] = useState<string[]>(() =>
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("niche") || "[]") : []
  );
  const [er, setER] = useState<string[]>(() =>
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("er") || "[]") : []
  );
  const [contentTypes, setContentTypes] = useState<string[]>(() =>
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("contentTypes") || "[]") : []
  );
  const [credibility, setCredibility] = useState<string[]>(() =>
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("credibility") || "[]") : []
  );
  const [price, setPrice] = useState<string[]>(() =>
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("price") || "[]") : []
  );
  const [industry, setIndustry] = useState<string[]>(() =>
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("industry") || "[]") : []
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("filterQueries", filterQueries);
      localStorage.setItem("platforms", JSON.stringify(platforms));
      localStorage.setItem("niche", JSON.stringify(niche));
      localStorage.setItem("er", JSON.stringify(er));
      localStorage.setItem("contentTypes", JSON.stringify(contentTypes));
      localStorage.setItem("credibility", JSON.stringify(credibility));
      localStorage.setItem("price", JSON.stringify(price));
      localStorage.setItem("industry", JSON.stringify(industry));
    }
  }, [filterQueries, platforms, niche, er, contentTypes, credibility, price, industry]);

  const resetFilters = () => {
    setFilterQueries("");
    setPlatforms([]);
    setNiche([]);
    setER([]);
    setContentTypes([]);
    setCredibility([]);
    setPrice([]);
    setIndustry([]);
  };

  const value = {
    filterQueries,
    setFilterQueries,
    platforms,
    setPlatforms,
    niche,
    setNiche,
    er,
    setER,
    contentTypes,
    setContentTypes,
    credibility,
    setCredibility,
    price,
    setPrice,
    industry,
    setIndustry,
    resetFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

export default FilterContext;
