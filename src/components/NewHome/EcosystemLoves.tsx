import { cn } from "@/src/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const EcosystemLoves: React.FC = (): JSX.Element => {
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

  const cardData = [
    {
      number: "Your best content is invisible by default.",
      description: [
        "Not because it's bad. Because the internet only rewards what it sees again.",
        "One appearance is noise. Repetition is proof.",
        "If your story isn't repeating, the algorithm assumes it doesn't matter.",
        "Ampli5 exists to make repetition deliberate.",
      ],
      isHighlighted: false,
    },
    {
      number: "Distribution is the only MOAT ",
      description: [
        "Content can be copied. Creativity can be matched. Budgets can be outspent.",
        "Distribution cannot.",
        "Once your story is everywhere, it becomes the default.",
        "Ampli5 doesn't make you louder. It makes you unavoidable.",
      ],
      isHighlighted: true,
    },
    {
      number: "AI is already deciding without you.",
      description: [
        'People don\'t "discover" brands anymore. They ask questions.',
        "AI answers using existing public context. If your story isn't already there, the gap gets filled for you.",
        "Ampli5 places your narrative where AI learns from, so your brand shows up as the answer.",
      ],
      isHighlighted: false,
    },
  ];

  return (
    <div className="relative bg-[#7847FA]  overflow-hidden min-h-[450px] py-14">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white">
            Why Does Your Brand Deserve
            <br /> Ampli5-ed Distribution?
          </h2>
        </div>
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
    </div>
  );
};

// Animated Card Component for mobile viewport highlighting
interface AnimatedCardProps {
  card: {
    number: string;
    description: string[];
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
        "rounded-xl p-6 lg:p-8 flex flex-col gap-4 border-[2px] border-white transition-all duration-500",
        isHighlighted ? "bg-white" : "bg-[#7B46F8]"
      )}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={cn(
          "text-lg font-semibold mb-2",
          isHighlighted ? "text-[#7B46F8]" : "text-white"
        )}
      >
        {card.number}
      </div>
      <div className={cn("h-0.5 w-full mb-4", isHighlighted ? "bg-[#7B46F8]" : "bg-white")}></div>
      <ul
        className={cn(
          "text-base lg:text-lg leading-relaxed space-y-8",
          isHighlighted ? "text-black" : "text-white"
        )}
      >
        {card.description.map((description) => {
          return <li key={description}>{description}</li>;
        })}
      </ul>
    </motion.div>
  );
}

export default EcosystemLoves;
