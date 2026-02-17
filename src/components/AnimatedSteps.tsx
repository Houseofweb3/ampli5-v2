"use client";

import React from "react";
import { motion } from "framer-motion";

import { STEPS } from "../utils/constants";

interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  STEPS: Step[];
}

const ProcessSteps = ({ STEPS }: ProcessStepsProps) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="relative ">
        {STEPS.map((step, index) => (
          <StepRow key={index} step={step} />
        ))}
      </div>
    </div>
  );
};

const StepRow = ({ step }: { step: Step }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: 0.1,
        ease: [0.17, 0.55, 0.55, 1],
      }}
      className="flex items-start md:items-center gap-8 md:gap-12 bg-white py-4"
    >
      <div className="text-6xl md:text-xxl font-light text-gray-200 w-10">{step.number}</div>

      <div className="flex gap-4">
        <div className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center text-purple-600">
          {step.icon}
        </div>
        <div className="flex mb-2 flex-col gap-2">
          <h3 className="text-xl font-semibold">{step.title}</h3>
          <p className="text-gray-400 max-w-md">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Data = () => {
  return <ProcessSteps STEPS={STEPS} />;
};

export default Data;
