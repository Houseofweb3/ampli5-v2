import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-full w-full pt-16 md:pt-20">{children}</div>
    </div>
  );
};
export default layout;
