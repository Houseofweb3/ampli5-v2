import React from "react";
import Image from "next/image";

const rows = [
  {
    label: "Goal",
    traditional: "Rank on page 1 of Google",
    aeo: "Be cited in the AI-generated answer",
  },
  {
    label: "Output",
    traditional: "Blue links",
    aeo: "Direct brand mention",
  },
  {
    label: "Signal source",
    traditional: "Keywords + backlinks",
    aeo: "Narrative consistency across surfaces",
  },
  {
    label: "Content style",
    traditional: "Keyword-optimised articles",
    aeo: "Natural language that mirrors how humans ask questions",
  },
  {
    label: "Measurement",
    traditional: "SERP position",
    aeo: "Citation frequency across ChatGPT, Claude, Perplexity",
  },
  {
    label: "Timeline",
    traditional: "3–6 months for ranking",
    aeo: "60–90 days for first citations",
  },
];

const AeoVsSeo: React.FC = (): JSX.Element => {
  return (
    <div className="relative bg-[#FA51A2] overflow-hidden min-h-[450px]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 lg:py-20">
        <h2 className="text-center text_pattern text-2xl sm:text-3xl lg:text-4xl mb-10 lg:mb-14">
          AEO vs Traditional SEO
        </h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[640px] text-left text-white border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b-2 border-white/40">
                <th className="py-3 pr-4 font-semibold w-[28%]"></th>
                <th className="py-3 px-3 font-semibold border-l border-white/30">
                  Traditional SEO
                </th>
                <th className="py-3 pl-3 font-semibold border-l border-white/30">
                  Answer Engine Optimization
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-white/25">
                  <td className="py-3 pr-4 font-medium align-top">{row.label}</td>
                  <td className="py-3 px-3 border-l border-white/20 align-top">{row.traditional}</td>
                  <td className="py-3 pl-3 border-l border-white/20 align-top">{row.aeo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-10 max-w-3xl mx-auto text-center text-white text-base sm:text-lg leading-relaxed">
          SEO is not dead. But it is no longer the only game. If you are only optimising for Google,
          you are invisible to the fastest-growing discovery channel on the internet.
        </p>
      </div>
      <div className="nt-12">
        <Image
          src="/pattern/black-line-bottom.png"
          alt=""
          width={1000}
          height={300}
          className="w-full h-full max-h-[200px] md:max-h-[300px] aspect-square"
        />
      </div>
    </div>
  );
};

export default AeoVsSeo;
