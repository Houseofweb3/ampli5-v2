"use client";

import React from "react";

import Button from "@/src/components/ui/button";
import { BUTTON_TYPES } from "@/src/utils/constants";
import { Stars } from "@/public/icons";

const AiButton: React.FC = () => {
  const handleAIButtonClick = async () => {
    console.log("AI button clicked");
  };

  return (
    <Button
      type={BUTTON_TYPES.OUTLINE}
      className="shrink-0 flex-nowrap w-full bg-ai_button_gradient text-white border-none focus:ring-none"
      onClick={handleAIButtonClick}
    >
      <Stars />
      Build Your Audience Atlas
    </Button>
  );
};

export default AiButton;
