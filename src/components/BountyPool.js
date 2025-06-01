import { calculatePrizes } from '@/lib/bountyPoolCalculate';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const BountyPool = ({ Prize }) => {
  const data = calculatePrizes(Prize);

  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState('100vh');

  const cardWidth = 380;
  const marginRight = 24;

  useEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    if (!container || !horizontal) return;

    const screenPadding = (window.innerWidth - cardWidth) / 2;
    const totalCardWidth = data.length * cardWidth;
    const totalMargin = (data.length - 1) * marginRight;
    const contentWidth = totalCardWidth + totalMargin;

    const scrollLength = contentWidth;

    // Add left and right padding to center first and last cards
    horizontal.style.paddingLeft = `${screenPadding}px`;
    horizontal.style.paddingRight = `${screenPadding}px`;

    const totalScroll = contentWidth + screenPadding * 2 - window.innerWidth;
    const calculatedHeight = (totalScroll / window.innerWidth) * window.innerHeight;
    setContainerHeight(calculatedHeight + window.innerHeight + 'px');

    gsap.set(horizontal, { x: 0 });
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const tween = gsap.to(horizontal, {
      x: () => `-${totalScroll}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${totalScroll}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [data]);

  return (
    <div className="bg-cream-bg w-full pt-48px lg:pt-70px py-48px ctm_slider_block relative z-1">
      <div className="w-full lg:pb-10 lg:mb-28px">
        <h2 className="h2 text-center">Bounty Pool</h2>
      </div>
      <div
        ref={containerRef}
        className="w-full px-12 relative z-10 overflow-hidden"
        style={{ height: containerHeight }}
      >
        <div className="Bounty_Pool"></div>
        <div
          ref={horizontalRef}
          className="flex h-screen items-center"
          style={{
            width: `${data.length * cardWidth + (data.length - 1) * marginRight}px`,
          }}
        >
          {data.map((vale, index) => (
            <div
              key={index}
              className={cn(
                'flex-shrink-0 h-fit border border-solid border-black shadow-xl rounded-4xl bg-gradient-to-br from-white',
                'flex flex-col justify-between',
                index !== data.length - 1 && 'mr-6',
                index === 0 && 'to-light-gold-bg',
                index === 1 && 'to-light-silver-bg',
                index === 2 && 'to-light-orange-bg',
                index >= 3 && 'to-light-wood-bg'
              )}
              style={{ width: `${cardWidth}px` }}
            >
              <div className="flex h-full justify-between">
                <div className="relative">
                  <Image src={vale.url} width={161} height={265} alt="badges" />
                </div>
                <div className="flex w-fit pt-9 pr-9">
                  <span className="text-right">
                    <strong className="h2">{vale.amount}</strong>
                    <small className="block h3">USDT</small>
                  </span>
                </div>
              </div>
              <div className="pl-9 pb-9">
                <h2 className="h2">{vale.percentage}%</h2>
                <small className="text-16 leading-25px text-black/80">
                  of the total value of the prize Money
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BountyPool;
