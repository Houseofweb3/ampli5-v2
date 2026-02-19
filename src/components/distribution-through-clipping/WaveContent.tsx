import React from "react";
import SecondaryButton from "../ui/SecondaryButton";
import Image from "next/image";

const WaveContent: React.FC = (): JSX.Element => {
  return (
    <div className=" bg-[#7B46F8]  py-14 lg:py-20 px-2 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative">
        <div className="absolute top-0 left-[-30px]  md:left-8  lg:left-12 z-0 ">
          <Image
            className="md:w-[100px] md:h-[100px] w-[60px] h-[60px]"
            src={"/pattern/flower.png"}
            width={200}
            height={200}
            alt="icon"
            style={{ animationDelay: "0s" }}
          />
        </div>

        <div className="absolute  right-[-30px]  -bottom-[50px] md:right-12 z-0 ">
          <Image
            className="md:w-[100px] md:h-[100px] w-[60px] h-[60px]"
            src={"/pattern/Isolation_Mode_Green-Yellow.png"}
            width={200}
            height={200}
            alt="icon"
            style={{ animationDelay: "0s" }}
          />
        </div>
        <div className="relative z-10">
          <h2 className="h2 max-w-3xl mx-auto text-white pb-4">
            Creation doesn’t create virality Distribution does.
          </h2>

          <div className=" mt-12  flex flex-col md:flex-row gap-4  justify-center items-center">
            {/* <SecondaryButton
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/brochure/ampli5-influencer-marketing.png";
                link.download = "ampli5-influencer-marketing.png";
                document.body.appendChild(link);
                link.click();
                link.remove();
              }}
              disabled={false}
              className="w-fit"
              aria-label="Download brochure"
            >
              Download Brochure
            </SecondaryButton> */}
            <SecondaryButton
              onClick={() =>
                window.open("https://calendly.com/partnerships-houseofweb3/30min", "_blank")
              }
              disabled={false}
              className="w-fit"
            >
              Book your partnership strategy call.
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaveContent;
