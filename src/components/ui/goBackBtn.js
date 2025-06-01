// components/GoBackButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';

const GoBackButton = ({ label, className = '' }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="border border-dark-purple1-bg hover:bg-dark-purple1-bg rounded-4xl  p-2 sm:p-3 group bg-purple-bg text-white  transition duration-300 ease-in-out cursor-pointer"
    >
      <FaArrowLeft className=" text-lg sm:text-xl font-extrabold group-hover:pr-1 transition-all duration-300 ease-in-out" />
      {label}
    </button>
  );
};

export default GoBackButton;
