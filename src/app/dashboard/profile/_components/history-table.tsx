import React from "react";
import Image from "next/image";
import { VerifyIcon, TwitterIcon, PlayIcon } from "../../../../../public/icons";

// Define the types for the data structure
interface Col1 {
  name: string;
  subtitle: string;
  img: string;
  verified: boolean;
}

interface Col2 {
  platform: string;
  icon: JSX.Element[];
  followers: string;
}

interface DataRow {
  col1: Col1;
  col2: Col2;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
  col8: string;
}

const Heading: string[] = [
  "Influencers",
  "Platform",
  "Niche",
  "Date",
  "Country",
  "ER",
  "AQS",
  "Price",
];

const Data: DataRow[] = [
  {
    col1: {
      name: "TearOfSatoshi",
      subtitle: "Shitcoin Alchemist",
      img: "/profile.svg",
      verified: true,
    },
    col2: {
      platform: "Twitter",
      icon: [<TwitterIcon key="twitter" />, <PlayIcon key="play" />],
      followers: "6.43M",
    },
    col3: "NFT/P2E",
    col4: "05/02/2024",
    col5: "USA",
    col6: "0.99%",
    col7: "RTM",
    col8: "$1000",
  },
  {
    col1: {
      name: "TearOfSatoshi",
      subtitle: "Shitcoin Alchemist",
      img: "/profile.svg",
      verified: true,
    },
    col2: {
      platform: "Twitter",
      icon: [<TwitterIcon key="twitter" />, <PlayIcon key="play" />],
      followers: "6.43M",
    },
    col3: "NFT/P2E",
    col4: "05/02/2024",
    col5: "USA",
    col6: "0.99%",
    col7: "RTM",
    col8: "$1000",
  },
  // Add more data objects here
];

const TableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td className="border border-slate-200 p-2">{children}</td>
);

const TableRow: React.FC<{ data: DataRow }> = ({ data }) => (
  <tr className="font-Jakarta text-sm">
    <TableCell>
      <div className="flex items-center gap-2">
        <Image src={data.col1.img} alt="profile" width={30} height={30} />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span>{data.col1.name}</span>
            {data.col1.verified && <VerifyIcon />}
          </div>
          <span className="text-gray-500">{data.col1.subtitle}</span>
        </div>
      </div>
    </TableCell>
    <TableCell>
      <div className="flex gap-2 items-center">
        {data.col2.icon}
        {data.col2.followers}
      </div>
    </TableCell>
    <TableCell>{data.col3}</TableCell>
    <TableCell>{data.col4}</TableCell>
    <TableCell>{data.col5}</TableCell>
    <TableCell>{data.col6}</TableCell>
    <TableCell>{data.col7}</TableCell>
    <TableCell>{data.col8}</TableCell>
  </tr>
);

const Table = () => {
  return (
    <table className="border-collapse border border-slate-500 table-auto mt-4 w-full">
      <thead>
        <tr className="font-Nunito text-gray-300 w-full">
          {Heading.map((item, index) => (
            <th className="border border-slate-200 py-2" key={index}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Data.map((item, index) => (
          <TableRow key={index} data={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
