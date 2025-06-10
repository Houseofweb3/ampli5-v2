import { getColumnWidth } from "@/src/utils/constants";
import React from "react";

interface TableCellProps {
  children: React.ReactNode;
  id?: string;
}

const TableCell: React.FC<TableCellProps> = ({ children, id }) => (
  <div
    style={{
      minWidth: getColumnWidth(id || ""),
      maxWidth: getColumnWidth(id || ""),
    }}
    className={`p-4 overflow-hidden whitespace-normal break-words line-clamp-2`}
  >
    {children}
  </div>
);

export default React.memo(TableCell);
