"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import Container from "../ui/container";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { cn } from "../../lib/utils";

interface EffectItem {
  link?: string;
  url: string;
}

interface EffectSliderProps {
  data: EffectItem[];
  direction?: "left" | "right";
  type?: string;
  children?: ReactNode;
}

const Effect: React.FC<EffectSliderProps> = ({
  data,
  children,
}) => {
  return (
    <div className=" w-full pt-48px lg:pt-70px py-48px ctm_effect_slider">
      <Container>
        {children}
        <div className="flex gap-2 flex-col lg:flex-row items-center lg:items-start justify-center">
          {data.map((value, index) => (
            <Link
              key={index}
              href={value.link || ""}
              target="_blank"
              className={cn(
                "block overflow-hidden w-full h-full p-9px border border-solid border-black rounded-3xl  bg-slider-bg mx-2 max-w-[350px] lg:max-w-[300px] xl:max-w-[390px]"
              )}
            >
              <Image
                className="rounded-18 h-full w-full object-cover"
                src={value.url}
                width={367}
                height={215}
                alt="image "
              />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Effect;
