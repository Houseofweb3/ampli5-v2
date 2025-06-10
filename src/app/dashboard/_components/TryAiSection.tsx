import React, { useCallback } from "react";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/src/components";
import { ALLROUTES, BUTTON_TYPES } from "@/src/utils/constants";
import { Stars } from "@/public/icons";

const TryAiSection = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleTryAIClick = useCallback(() => {
    if (session?.user) {
      router.push(ALLROUTES.ONBOARDING);
    } else {
      signIn("google", {
        callbackUrl: ALLROUTES.REDIRECT_TO_ONBOARDING,
      });
    }
  }, [session?.user, router]);
  return (
    <div className="w-full px-4 md:px-12">
      <div className="bg-background-color rounded-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex flex-col md:col-span-2 gap-4">
          <span className="font-semibold text-xl md:text-3xl tracking-wide">
            Not sure where to start? Let AI do the heavy lifting.
          </span>
          <p className="text-secondary-text md:text-lg ">
            Answer few question about your business, and our AI will deliver a
            custom list of influencers that align with your brand and target
            audience.
          </p>
        </div>
        <Button
          type={BUTTON_TYPES.PRIMARY}
          className="bg-primary_gradient"
          onClick={handleTryAIClick}
        >
          <Stars />
          Try our free AI recommendations
        </Button>
      </div>
    </div>
  );
};

export default TryAiSection;
