import { ReactNode } from "react";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col  bg-gray-150 min-h-screen">
      <div className="h-full w-full ">{children}</div>
    </div>
  );
};
export default layout;
