import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Details() {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8 overflow-hidden relative">
        <Image
          src="/pattern/Isolation_Mode_big-1.png"
          alt="details"
          width={1000}
          height={1000}
          className="absolute top-[-100px] left-[-100px] w-[200px] h-[200px] md:w-[300px] md:h-[300px] md:top-[-150px] md:left-[-150px] z-10"
        />
        <div className="flex md:flex-row flex-col gap-4 justify-between items-center">
          <div className="mb-12 w-full mt-24 md:mt-0 px-4 ">
            <h2 className="text-xl font-extrabold !text-[#7B46F8]">Step 1:</h2>
            <h3 className="text-3xl font-extrabold ">Storytelling*</h3>
            <p className="text-base font-normal">We start where trust forms.</p>
          </div>
          <div className="w-full">
            <AnimatedSection className="bg-[#E9E7E7] py-12 px-4 md:px-12 space-y-8 w-full">
              <p className="text-base font-normal max-w-96 mr-auto">
                We start with long-form conversations.
              </p>
              <p className="text-base font-semibold max-w-96 mr-auto !text-[#A609F0] ">
                This is not content for virality.It is content created for extraction.
              </p>
              <p className="text-base font-normal max-w-96 mr-auto">
                Podcasts meets personal branding.
              </p>
            </AnimatedSection>
            <AnimatedSection className="bg-[#7847FA] w-full h-full py-12 px-4 md:px-12" delay={0.2}>
              <h4 className="!text-white">Cost: </h4>
              <h3 className="!text-white font-normal">$10,000 for 3 podcasts *</h3>
            </AnimatedSection>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8 overflow-hidden relative">
        <Image
          src="/pattern/Isolation_Mode_big-1.png"
          alt="details"
          width={1000}
          height={1000}
          className="absolute top-[-100px] left-[-100px] w-[200px] h-[200px] md:w-[300px] md:h-[300px] md:top-[-150px] md:left-[-150px] z-10"
        />
        <div className="flex md:flex-row flex-col gap-4 justify-between items-center">
          <div className="mb-12 w-full mt-24 md:mt-0 px-4 ">
            <h2 className="text-xl font-extrabold !text-[#7B46F8]">Step 2:</h2>
            <h3 className="text-3xl font-extrabold ">Clipping</h3>
            <p className="text-base font-normal">Clipping turns depth into frequency.</p>
          </div>
          <div className="w-full">
            <AnimatedSection className="bg-[#E9E7E7] py-12 px-4 md:px-12 space-y-12 w-full">
              <p className="text-base font-normal max-w-96 mr-auto">
                The internet rewards moments, not length. We extract what already earns attention.
              </p>
              <div className="space-y-4">
                <p className="text-base ">
                  <i> This is how depth becomes frequency.</i>
                </p>
                <div className="flex gap-8 justify-evenly max-w-80">
                  <Image
                    src="/socials/1.png"
                    alt="icon"
                    width={100}
                    height={100}
                    className="h-[40px] w-auto"
                  />
                  <Image
                    src="/socials/2.png"
                    alt="icon"
                    width={100}
                    height={100}
                    className="h-[40px] w-auto"
                  />
                  <Image
                    src="/socials/3.png"
                    alt="icon"
                    width={100}
                    height={100}
                    className="h-[40px] w-auto"
                  />
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection className="bg-[#7847FA] w-full h-full py-12 px-4 md:px-12" delay={0.2}>
              <h4 className="!text-white">Cost: </h4>
              <h3 className="!text-white font-normal">$2,000 for 5 high-impact clips</h3>
            </AnimatedSection>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8 overflow-hidden relative">
        <Image
          src="/pattern/Isolation_Mode_big-1.png"
          alt="details"
          width={1000}
          height={1000}
          className="absolute top-[-100px] left-[-100px] w-[200px] h-[200px] md:w-[300px] md:h-[300px] md:top-[-150px] md:left-[-150px] z-10"
        />
        <div className="flex md:flex-row flex-col gap-4 justify-between items-center">
          <div className="mb-12 w-full mt-24 md:mt-0 px-4 ">
            <h2 className="text-xl font-extrabold !text-[#7B46F8]">Step 3:</h2>
            <h3 className="text-3xl font-extrabold ">Distribution</h3>
            <p className="text-base font-normal">Distribution decides outcomes.</p>
          </div>
          <div className="w-full">
            <AnimatedSection className="bg-[#E9E7E7] py-12 px-4 md:px-12 space-y-6 w-full">
              <p className="text-base font-normal max-w-96 mr-auto">
                We distribute to build repetition, not reach.
              </p>
              <p className="text-base font-semibold max-w-96 mr-auto">
                Clips are deployed through 25+ clipping channels.
              </p>
              <div>
                <p className="text-base  max-w-96 mr-auto">Channels already have attention.</p>
                <p className="text-base  max-w-96 mr-auto">Attention compounds.</p>
              </div>
              <div className="space-y-2">
                <p className="text-base font-semibold max-w-96 mr-auto">Monthly Outcomes </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4  ">
                  <div className="border-r-2 border-gray-400 px-4 py-2 my-auto text-center">
                    <h4 className="font-semibold text-[#7B46F8]">10M+</h4>
                    <h5 className="text-black">impressions</h5>
                  </div>
                  <div className="sm:border-r-2 border-gray-400 px-4 py-2 my-auto text-center">
                    <h4 className="font-semibold text-[#7B46F8]">1M+</h4>
                    <h5 className="text-black">views</h5>
                  </div>
                  <div className=" border-r-2 sm:border-r-0 border-gray-400  px-4 py-2 my-auto text-center">
                    <h4 className="font-semibold text-[#7B46F8]">50,000</h4>
                    <h5 className="text-black">Average View </h5>
                    <p className="text-black/45 text-[10px]">per short form content</p>
                  </div>
                  <div className="sm:border-r-2 border-gray-400 px-4 py-2 my-auto text-center">
                    <h4 className="font-semibold text-[#7B46F8]">1%</h4>
                    <h5 className="text-black">CTR</h5>
                  </div>
                  {/* <div className="border-r-2 border-gray-400  px-4 py-2 my-auto text-center">
                    <h4 className="font-semibold text-[#7B46F8] ">0.015</h4>
                    <h5 className="text-black">CPV</h5>
                  </div> */}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection className="bg-[#7847FA] w-full h-full py-12 px-4 md:px-12" delay={0.2}>
              <h4 className="!text-white">Cost: </h4>
              <h3 className="!text-white font-normal">
                $15,000 for 2 clips each across 25 channels
              </h3>
            </AnimatedSection>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8 overflow-hidden relative">
        <Image
          src="/pattern/Isolation_Mode_big-1.png"
          alt="details"
          width={1000}
          height={1000}
          className="absolute top-[-100px] left-[-100px] w-[200px] h-[200px] md:w-[300px] md:h-[300px] md:top-[-150px] md:left-[-150px] z-10"
        />
        <div className="flex md:flex-row flex-col gap-4 justify-between items-center">
          <div className="mb-12 w-full mt-24 md:mt-0 px-4 ">
            <h2 className="text-xl font-extrabold !text-[#7B46F8]">Step 4:</h2>
            <h3 className="text-3xl font-extrabold ">
              Context Seeding <br />( AI + Search )
            </h3>
            <p className="text-base font-normal">Visibility doesn&apos;t end with feeds. </p>
          </div>
          <div className="w-full">
            <AnimatedSection className="bg-[#E9E7E7] py-12 px-4 md:px-12 space-y-4 w-full">
              <div className="space-y-3">
                <div>
                  <p className="text-base  mr-auto">
                    We extend stories beyond the feed. AI search is the new discovery layer. This is
                    where visibility lasts.
                  </p>
                  {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4">
                    <div className="border-r-2 border-gray-400  px-2 sm:px-4 py-2 my-auto text-center flex items-center gap-2">
                      <Image
                        src="/icons/search.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <h5 className="text-black">They search</h5>
                    </div>
                    <div className="sm:border-r-2 border-gray-400  px-2 sm:px-4 py-2 my-auto text-center flex items-center gap-2">
                      <Image
                        src="/icons/git-compare.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <h5 className="text-black">They compare</h5>
                    </div>
                    <div className="border-r-2 sm:border-r-0 border-gray-400  px-2 sm:px-4 py-2 my-auto text-center flex items-center gap-2">
                      <Image
                        src="/icons/brain-circuit.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <h5 className="text-black">They ask AI</h5>
                    </div>
                  </div> */}
                </div>

                <div>
                  <h4>We seed the same story across:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center ">
                    <div className="px-2 sm:px-4 py-2">
                      <Image src="/icons/substack.png" alt="icon" width={100} height={40} />
                    </div>
                    <div className=" px-2 sm:px-4 py-2">
                      <Image src="/icons/medium.png" alt="icon" width={100} height={40} />
                    </div>
                    <div className=" px-2 sm:px-4 py-2">
                      <Image src="/icons/quora.png" alt="icon" width={100} height={40} />
                    </div>
                    <div className=" px-2 sm:px-4 py-2">
                      <Image src="/icons/wikipedia.png" alt="icon" width={100} height={40} />
                    </div>
                    <div className=" px-2 sm:px-4 py-2">
                      <Image src="/icons/Rectangle.png" alt="icon" width={100} height={40} />
                    </div>
                  </div>
                </div>
                {/* <div>
                  <h4>Written as answers. Not backlinks.</h4>
                  <p className="text-base font-normal max-w-96 mr-auto">
                    This builds context memory. So your name belongs in the
                    answer.
                  </p>
                </div>
                <div>
                  <p className="text-base font-semibold max-w-96 mr-auto">
                    Monthly Outcomes
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4  ">
                    <div className="border-r-2 border-gray-400 px-2 sm:px-4 py-2 my-auto text-center">
                      <h4 className="font-semibold text-[#7B46F8]">0.5M+</h4>
                      <h5 className="text-black">impressions</h5>
                    </div>
                    <div className="lg:border-r-2 border-gray-400  px-2 sm:px-4 py-2 my-auto text-center">
                      <h4 className="font-semibold text-[#7B46F8]">150,000+</h4>
                      <h5 className="text-black">views</h5>
                    </div>
                    <div className="border-r-2  border-gray-400 px-2 sm:px-4 py-2 my-auto text-center">
                      <h4 className="font-semibold text-[#7B46F8]">15,000</h4>
                      <h5 className="text-black">Engagement</h5>
                    </div>
                    <div className="  px-2 sm:px-4 py-2 my-auto text-center">
                      <h4 className="font-semibold text-[#7B46F8]">~2%</h4>
                      <h5 className="text-black">CTR </h5>
                    </div>
                  </div>
                </div> */}
              </div>
            </AnimatedSection>
            <AnimatedSection className="bg-[#7847FA] w-full h-full py-12 px-4 md:px-12" delay={0.2}>
              <h4 className="!text-white">Cost: </h4>
              <h3 className="!text-white font-normal">$5,000 for 20 content pieces</h3>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated Section Component using Framer Motion
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -50px 0px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
