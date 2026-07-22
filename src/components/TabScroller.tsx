import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  categories: string[];
  activeCategory: string;
  onSelect: (cat: string) => void;
}

export const TabScroller = ({ categories, activeCategory, onSelect }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 5);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      <button
        onClick={() => scroll("left")}
        className={`flex-shrink-0 w-9 h-9 rounded-full glass flex items-center justify-center transition-all ${
          showLeft ? "opacity-100" : "opacity-30 pointer-events-none"
        } md:hidden`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide md:flex-wrap md:overflow-visible flex-1 md:flex-none pb-2 md:pb-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-orange-500 text-white"
                : "glass text-white/70 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className={`flex-shrink-0 w-9 h-9 rounded-full glass flex items-center justify-center transition-all ${
          showRight ? "opacity-100" : "opacity-30 pointer-events-none"
        } md:hidden`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
