/* eslint-disable no-unused-vars */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { HoverCard, HoverCardTrigger } from "@/src/components/ui/hover-card";

export const columnsPackages: ColumnDef<any>[] = [
  {
    accessorKey: "media",
    header: ({ column }) => <div>Media</div>,
    cell: ({ row }) => (
      <HoverCard>
        <HoverCardTrigger asChild>
          <span>{row.getValue("media")}</span>
        </HoverCardTrigger>
      </HoverCard>
    ),
  },
  {
    accessorKey: "format",
    header: ({ column }) => <div>Format</div>,
    cell: ({ row }) => <span>{row.getValue("format")}</span>,
    filterFn: (row, id, value) => {
      if (Array.isArray(value) && value.includes(row.getValue(id))) {
        return true;
      }
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: "monthlyTraffic",
    header: ({ column }) => <div>Monthly Traffic</div>,
    cell: ({ row }) => <span>{row.getValue("monthlyTraffic")}</span>,
    filterFn: (row, id, value) => {
      if (Array.isArray(value) && value.includes(row.getValue(id))) {
        return true;
      }
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: "turnAroundTime",
    header: ({ column }) => <div>Turn Around Time</div>,
    cell: ({ row }) => {
      return (
        <>
          <span>{row.getValue("turnAroundTime")}</span>
        </>
      );
    },
  },
];
