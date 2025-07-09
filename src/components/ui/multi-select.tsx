"use client";
import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { BsSquare, BsCheckSquareFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

type MultiSelectProps = {
  options: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedOptions: string[];
  placeholder: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  setSelectedOptions,
  selectedOptions,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(
        selectedOptions.filter((optionValue) => optionValue !== value)
      );
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleResetFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOptions([]);
  };

  return (
    <div
      className="w-full mx-auto relative font-Jakarta"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      // onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between p-2 text-gray-600 cursor-pointer border border-gray-300 rounded-xl h-12 font-Jakarta text-sm ">
        <div
          className={`${
            selectedOptions?.length > 0
              ? "text-dark-gray font-semibold"
              : "text-gray-400"
          } flex-grow text-sm flex w-full truncate`}
        >
          {selectedOptions?.length > 0
            ? placeholder + ":" + " " + selectedOptions
            : placeholder}
        </div>
        {isOpen ? (
          <FaChevronUp className="text-sm" />
        ) : (
          <FaChevronDown className="text-sm" />
        )}
      </div>
      {isOpen && (
        <div className="absolute max-h-sm overflow-y-auto w-full bg-white shadow-md rounded-xl z-10  flex flex-col p-2 gap-2">
          {options?.map((option) => (
            <div
              key={option}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50"
              onClick={() => handleOptionClick(option)}
            >
              <div className="">
                {selectedOptions.includes(option) ? (
                  <BsCheckSquareFill className="w-4 h-4 text-purple-600" />
                ) : (
                  <BsSquare className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <span className="ml-2 text-sm">{option}</span>
            </div>
          ))}
          <button
            onClick={handleResetFilter}
            className="mt-1 flex gap-2 items-center px-3 py-2 text-sm text-purple-600 hover:bg-gray-50 text-left"
          >
            <GrPowerReset /> reset filter
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
