import React, { useRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
// import Marquee from "react-fast-marquee";

const cardData = [
  {
    number: "The Insight Extraction",
    description:
      "We decode your category, your audience behavior and your emotional triggers. This becomes the base layer for every angle and hook.",
    isHighlighted: false,
  },
  {
    number: "The Creative Flood",
    description:
      "Midjourney for mood. Runway for motion. ElevenLabs for voice. Veo3 and HeyGen for cinematic articulation. The output is not one video. The output is a library you can deploy.",
    isHighlighted: true,
  },
  {
    number: "The Performance Loop",
    description:
      "The winners become templates. The losers feed our learning model. Every cycle increases your probability of viral lift.",
    isHighlighted: false,
  },
];

const HowWork: React.FC = (): JSX.Element => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check which card is closest to viewport center
  useEffect(() => {
    if (!isMobile) {
      setHighlightedIndex(null);
      return;
    }

    const checkCenterCard = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex: number | null = null;
      let closestDistance = Infinity;

      cardRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        // Check if card is visible and in viewport (with some margin)
        const isVisible = rect.top < window.innerHeight + 100 && rect.bottom > -100;

        if (isVisible && distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== null) {
        setHighlightedIndex(closestIndex);
      }
    };

    // Use requestAnimationFrame for smoother updates
    let rafId: number;
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(checkCenterCard);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkCenterCard);

    // Initial check with a small delay to ensure refs are set
    setTimeout(checkCenterCard, 100);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkCenterCard);
    };
  }, [isMobile]);

  return (
    <div className=" py-14 lg:py-20 relative ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 lg:mb-16">
          How AI Ad Generation Works?{" "}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16 ">
          {cardData.map((card, index) => (
            <AnimatedCard
              key={index}
              card={card}
              index={index}
              highlightedIndex={highlightedIndex}
              isMobile={isMobile}
              cardRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
      {/* <Marquee>
        <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 lg:mb-16 px-16">
          Clarity is the new discoverability. If models decide attention, make
          them choose you.{"         "}
        </h2>
      </Marquee> */}
      <div className="absolute sm:bottom-[-50px] bottom-[-25px] sm:right-[50px] right-[25px]  z-10">
        <Image
          className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px]"
          src={"/pattern/Isolation_Mode_big-blue.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>
    </div>
  );
};

// Animated Card Component for mobile viewport highlighting
interface AnimatedCardProps {
  card: {
    number: string;
    description: string;
    isHighlighted: boolean;
  };
  index: number;
  highlightedIndex: number | null;
  isMobile: boolean;
  // eslint-disable-next-line no-unused-vars
  cardRef: (el: HTMLDivElement | null) => void;
}

function AnimatedCard({ card, index, highlightedIndex, isMobile, cardRef }: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Set the ref for parent component to track
  useEffect(() => {
    if (ref.current) {
      cardRef(ref.current);
    }
    return () => {
      cardRef(null);
    };
  }, [cardRef]);

  // On mobile, use viewport center-based highlighting; on desktop, use card.isHighlighted
  const isHighlighted = isMobile ? highlightedIndex === index : card.isHighlighted;

  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-xl p-6 lg:p-8 flex flex-col gap-4 border-[3px] border-black transition-all duration-500",
        isHighlighted ? "bg-[#7B46F8]" : "bg-white"
      )}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={cn(
          "text-sm font-semibold rounded-full px-3 py-0.5 w-fit",
          isHighlighted ? "text-[#7B46F8] bg-white" : "text-white bg-[#7B46F8]"
        )}
      >
        Step {index + 1}
      </div>
      <div
        className={cn(
          "sm:text-3xl text-2xl font-semibold mb-2",
          isHighlighted ? "text-white" : "text-[#7B46F8]"
        )}
      >
        {card.number}
      </div>

      <div className={cn("h-0.5 w-full mb-4", isHighlighted ? "bg-white" : "bg-[#7B46F8]")}></div>

      <p
        className={cn(
          "text-base lg:text-lg leading-relaxed",
          isHighlighted ? "text-white" : "text-black"
        )}
      >
        {card.description}
      </p>
    </motion.div>
  );
}

export default HowWork;
