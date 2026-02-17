import React, { useRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

const cardData = [
  {
    number: "Narrative Extraction",
    description:
      "We decode your worldview, your principles and your category insights. This becomes a narrative playbook that you can use across platforms and formats.",
    list: null,
    summary: null,
    isHighlighted: true,
  },

  {
    number: "Multi Platform Distribution",
    description: "We activate your voice across",
    list: [
      "Podcasts",
      "YouTube",
      "YouTube interviews",
      "X and LinkedIn thought pieces",
      "Panel appearances and community shows",
    ],
    summary: " The goal is simple. Show up where the market already pays attention.",
    isHighlighted: false,
  },
  {
    number: "The Amplification Loop",
    description: "Creators pick up your ideas. Communities repeat them.",
    list: null,
    summary: null,
    isHighlighted: true,
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
    if (!isMobile) return;

    const checkCenterCard = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex: number | null = null;
      let closestDistance = Infinity;

      cardRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        // Check if card is visible and in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setHighlightedIndex(closestIndex);
    };

    window.addEventListener("scroll", checkCenterCard);
    window.addEventListener("resize", checkCenterCard);
    checkCenterCard(); // Initial check

    return () => {
      window.removeEventListener("scroll", checkCenterCard);
      window.removeEventListener("resize", checkCenterCard);
    };
  }, [isMobile]);

  return (
    <div className=" py-14 lg:py-20 relative ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 lg:mb-16">
          How Influencer Marketing <br /> Works on Ampli5?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 lg:mb-16 ">
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
    list: string[] | null;
    summary: string | null;
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
      {card.list && (
        <ul className={cn("list-disc list-inside", isHighlighted ? "text-white" : "text-black")}>
          {card.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {card.summary && (
        <p
          className={cn(
            "text-base lg:text-lg leading-relaxed",
            isHighlighted ? "text-white" : "text-black"
          )}
        >
          {card.summary}
        </p>
      )}
    </motion.div>
  );
}

export default HowWork;
