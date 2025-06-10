"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import { cn } from "../lib/utils";

interface AccordionProps {
  isOpen?: boolean;
  Heading: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ isOpen, Heading, children }) => {
  const [open, setOpen] = useState(isOpen || false);

  const toggleAccordion = () => setOpen((prev) => !prev);

  return (
    <div className="w-full mx-auto bg-white border-y border-[#00000016] px-7 py-7">
      <button
        className="w-full flex items-center justify-between  text-lg font-semibold"
        onClick={toggleAccordion}
      >
        <span className="text-start">{Heading}</span>
        <span className={cn("rotate-180 transition-all", { "rotate-0": open })}>
          <FaChevronDown />
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 text-text_secondary font-normal text-start  ",
          {
            "max-h-0 opacity-0": !open,
            "max-h-screen opacity-100 mt-3": open,
          }
        )}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
