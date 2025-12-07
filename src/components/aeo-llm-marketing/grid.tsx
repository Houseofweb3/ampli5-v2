// components/AIEcosystemGrid.tsx
import Image from "next/image";

const cards = [
  {
    id: 1,
    title: "SUPERHUMAN AI",
    subtitle: "AI INNOVATORS SERIES\nPOPULAR AI NEWSLETTER",
    img: "/cards/superhuman.png",
  },
  {
    id: 2,
    title: "AI IN BUSINESS",
    subtitle: "with Daniel Faggella | Sentient",
    img: "/cards/ai-in-business.png",
  },
  {
    id: 3,
    title: "Futurepedia",
    subtitle: "Get Smarter About The Future\nJoin 280,000+ professionals...",
    img: "/cards/futurepedia.png",
  },
  { id: 4, title: "A1", img: "/cards/a1.png", wide: true },
  { id: 5, title: "MORNING BREW INC.", img: "/cards/morning-brew.png" },
  { id: 6, title: "PRACTICAL AI", img: "/cards/practical-ai.png" },
  { id: 7, title: "GPT", img: "/cards/gpt.png" },
  { id: 8, title: "MARKETING AGAINST THE GRAIN", img: "/cards/marketing.png" },
  { id: 9, title: "startup junkie", img: "/cards/startup-junkie.png" },
  {
    id: 10,
    title: "HOW TO TAKE OVER THE WORLD",
    img: "/cards/take-over.png",
    wide: true,
  },
];

export default function AIEcosystemGrid() {
  return (
    <div className="min-h-screen bg-orange-500 py-16 px-8">
      <h1 className="text-6xl md:text-8xl font-black text-white mb-16 tracking-tighter leading-none">
        The
        <br />
        Ecosystem
        <br />
        That
        <br />
        Amplifies
        <br />
        You
      </h1>

      {/* Manual Row-Based Layout Matching Your Image */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">

        <Card {...cards[0]} />
        <Card {...cards[1]} />
        <Card {...cards[2]} />
        <Card {...cards[3]} className="md:col-span-2 row-span-2" />


        <Card {...cards[4]} />
        <Card {...cards[5]} />
        <Card {...cards[6]} />


        {/* <Card {...cards[7]} /> */}
        {/* <Card {...cards[8]} /> */}
        <Card {...cards[9]} className="md:col-span-2" />
      
      </div>
    </div>
  );
}

// Reusable Card Component
function Card({ title, subtitle, img, className = "" }: any) {
  return (
    <div
      className={`group cursor-pointer transition-all duration-300 hover:-translate-y-3 ${className}`}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover rounded-t-3xl"
          />
        </div>
        {(title || subtitle) && (
          <div className="p-6 flex-1 flex flex-col justify-end">
            {title && (
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            )}
            {subtitle && (
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
