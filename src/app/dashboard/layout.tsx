import { ReactNode } from "react";
import { FilterProvider } from "../../context/FilterContext";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <FilterProvider>
      <div className="h-full w-full flex flex-col bg-gray-150 min-h-screen bg-white">
        <div className="h-full w-full pt-4">{children}</div>
      </div>
    </FilterProvider>
  );
};
export default layout;
