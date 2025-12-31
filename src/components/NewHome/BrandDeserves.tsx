import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";

const cardData = [
  {
    number: "You already create",
    description: [
      "Podcasts",
      "Founder interviews",
      "Product explainers",
      "Long-form content",
    ],
  },
  {
    number: "But",
    description: [
      "Feeds forget fast.",
      "Posting resets reach",
      "Discovery fragments across platforms",
      "AI has no memory of you",
    ],
    isHighlighted: true,
  },
];

const BrandDeserves: React.FC = (): JSX.Element => {
  const secondCardRef = useRef<HTMLDivElement>(null);
  const [isSecondCardInCenter, setIsSecondCardInCenter] = useState(false);
  const [hasReachedCenter, setHasReachedCenter] = useState(false);

  useEffect(() => {
    const checkCardPosition = () => {
      if (!secondCardRef.current) return;

      const rect = secondCardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const elementCenter = rect.top + rect.height / 2;

      // Check if element center is within 20% of viewport center
      const isInCenter = Math.abs(elementCenter - viewportCenter) < viewportHeight * 0.2;

      // Check if element is below the center (scrolled down past center)
      const isBelowCenter = elementCenter > viewportCenter + viewportHeight * 0.2;

      // Check if element is above the center (scrolled up past center)
      const isAboveCenter = elementCenter < viewportCenter - viewportHeight * 0.2;

      if (isInCenter) {
        // Mark that it has reached center and highlight it
        setHasReachedCenter(true);
        setIsSecondCardInCenter(true);
      } else if (hasReachedCenter) {
        if (isBelowCenter) {
          // If it goes below center, unhighlight it (highlight goes back to first card)
          setIsSecondCardInCenter(false);
        } else if (isAboveCenter) {
          // If it scrolls up past center, keep it highlighted
          setIsSecondCardInCenter(true);
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            checkCardPosition();
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    // Also check on scroll for real-time updates
    window.addEventListener("scroll", checkCardPosition);
    window.addEventListener("resize", checkCardPosition);

    if (secondCardRef.current) {
      observer.observe(secondCardRef.current);
      // Initial check
      checkCardPosition();
    }

    return () => {
      window.removeEventListener("scroll", checkCardPosition);
      window.removeEventListener("resize", checkCardPosition);
      if (secondCardRef.current) {
        observer.unobserve(secondCardRef.current);
      }
    };
  }, [hasReachedCenter]);

  return (
    <div className="relative  bg-[#A609F0] py-14 lg:py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-center text_pattern text-3xl sm:text-4xl lg:text-5xl font-semibold !text-white mb-4">
            The Current Landscape
          </h2>
          <p className="text-white">
            Your story is not the problem. Your distribution layer is.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16 relative z-2">
          {cardData.map((card, index) => {
            const isSecondCard = index === 1;
            // First card is highlighted when second card is NOT in center
            // Second card is highlighted when it IS in center
            const shouldHighlight = isSecondCard 
              ? isSecondCardInCenter 
              : !isSecondCardInCenter;
            
            return (
              <div
                key={index}
                ref={isSecondCard ? secondCardRef : null}
                className={cn(
                  "rounded-xl p-6 lg:p-8 flex flex-col gap-4  border-2 transition-all duration-500",
                  shouldHighlight
                    ? "bg-white border-[#a709f0]"
                    : "bg-transparent border-white"
                )}
              >
                <div
                  className={cn(
                    "text-xl font-semibold mb-2",
                    shouldHighlight
                      ? "text-[#7B46F8]"
                      : "text-white"
                  )}
                >
                  {card.number}
                </div>

                <div
                  className={cn(
                    "h-0.5 w-full mb-4",
                    shouldHighlight
                      ? "bg-[#7B46F8]"
                      : "bg-white"
                  )}
                ></div>

                <ul
                  className={cn(
                    "list-disc list-inside text-base lg:text-lg leading-relaxed",
                    shouldHighlight
                      ? "text-black"
                      : "text-white"
                  )}
                >
                  {card.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
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

export default BrandDeserves;
