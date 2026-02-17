import React, { useRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

const cardData = [
  {
    number: "1. Your customers now ask before they search",
    description:
      "If you are missing from the answer, you are missing from the consideration set. Presence is no longer optional.",
    isHighlighted: true,
  },
  {
    number: "2. Your category is being defined without you",
    description:
      "If competitors shape the narrative, models will echo their version of the story.Silence has a cost.",
    isHighlighted: false,
  },
  {
    number: "3. Your size no longer limits your visibility",
    description:
      "LLMs treat strong signals from small brands the same way they treat signals from giants.This is the first time David can outrank Goliath through pure clarity and consistency.",
    isHighlighted: true,
  },
];

const BrandDeserves: React.FC = (): JSX.Element => {
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
    <div className="relative  bg-[#A609F0] py-14 lg:py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text_pattern text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-[#D6FFF6] mb-12 lg:mb-16">
          Why Your Brand Deserves <br /> Love From LLMs?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16 relative z-2">
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
          <div className="absolute sm:bottom-[-45px] bottom-[-22px] sm:right-[-45px] right-[-22px]  z-0">
            <Image
              className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px]"
              src={"/pattern/flower.png"}
              width={200}
              height={200}
              alt="icon"
              style={{ animationDelay: "0s" }}
            />
          </div>
        </div>
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
        "rounded-xl p-6 lg:p-8 flex flex-col gap-4 border-2 transition-all duration-500",
        isHighlighted ? "bg-white border-[#a709f0]" : "bg-transparent border-white"
      )}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={cn(
          "text-xl font-semibold mb-2",
          isHighlighted ? "text-[#7B46F8]" : "text-white"
        )}
      >
        {card.number}
      </div>

      <div className={cn("h-0.5 w-full mb-4", isHighlighted ? "bg-[#7B46F8]" : "bg-white")}></div>

      <p
        className={cn(
          "text-base lg:text-lg leading-relaxed",
          isHighlighted ? "text-black" : "text-white"
        )}
      >
        {card.description}
      </p>
    </motion.div>
  );
}

export default BrandDeserves;
