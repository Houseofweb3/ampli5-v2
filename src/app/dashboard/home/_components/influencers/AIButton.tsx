import React from "react";

import { TiArrowBack } from "react-icons/ti";

import Button from "@/src/components/ui/button";
import { BUTTON_TYPES } from "@/src/utils/constants";
import { Stars } from "@/public/icons";

interface AiButtonProps {
  isAI: boolean;
  setIsAi: React.Dispatch<React.SetStateAction<boolean>>;
  fetchInfluencers: () => Promise<void>;
  fetchUserInfluencers: () => Promise<void>;
}

const AiButton: React.FC<AiButtonProps> = ({
  isAI,
  setIsAi,
  fetchInfluencers,
  fetchUserInfluencers,
}) => {
  const handleAIButtonClick = async () => {
    setIsAi(true);
    await fetchUserInfluencers();
  };
  const handleBackButtonClick = async () => {
    setIsAi(false);
    await fetchInfluencers();
  };

  return !isAI ? (
    <Button
      type={BUTTON_TYPES.OUTLINE}
      className="shrink-0 flex-nowrap w-full bg-ai_button_gradient text-white border-none focus:ring-none"
      onClick={handleAIButtonClick}
    >
      <Stars />
      Try our free AI
    </Button>
  ) : (
    <Button
      type={BUTTON_TYPES.OUTLINE}
      onClick={handleBackButtonClick}
      className="shrink-0 flex-nowrap w-full bg-primary_gradient text-white border-none focus:ring-none"
    >
      <TiArrowBack className="text-lg" />
      <span className=""> Switch To Default</span>
    </Button>
  );
};

export default AiButton;
