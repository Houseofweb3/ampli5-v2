import React, { useRef, useEffect, useState } from "react";

interface TabItem {
  title: string;
  content: React.ReactNode;
  icon?: React.ComponentType<
    React.SVGProps<SVGSVGElement> & { isActive?: boolean }
  >;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
  defaultOpen?: number;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  className = "",
  defaultOpen = 0,
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(defaultOpen);
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, []);

  return (
    <div
      className={`flex flex-col h-full w-full relative ${className} font-Jakarta`}
    >
      {/* Changed the navigation container positioning */}
      <div className="w-full h-fit sticky top-0 bg-white z-10">
        <nav className="flex w-full justify-center p-2" role="tablist">
          <div className="flex w-fit rounded-xl flex-row gap-2 bg-background-color p-2">
            {items.map((item, index) => (
              <button
                key={index}
                ref={index === 0 ? firstBtnRef : null}
                onClick={() => setSelectedTab(index)}
                className={`px-6 py-3 rounded-xl transition-all tracking-wider text-sm ease-in-out font-semibold flex items-center gap-2 ${
                  selectedTab === index ? "text-white bg-black" : "text-black"
                }`}
                role="tab"
                aria-selected={selectedTab === index}
                aria-controls={`tabpanel-${index}`}
                id={`tab-${index}`}
              >
                {item.icon && <item.icon isActive={selectedTab === index} />}
                {item.title}
              </button>
            ))}
          </div>
        </nav>
      </div>
      <div className="h-full mt-8">
        {items.map((item, index) => (
          <div
            key={index}
            className={`content h-full ${
              selectedTab === index ? "" : "hidden"
            }`}
            role="tabpanel"
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
          >
            <div className="h-full w-full">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
