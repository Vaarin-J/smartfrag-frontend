"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import gsap from "gsap";

let isAnimating = false;

type Fragrance = {
  name: string;
  main_accords: string[];
  similarity_pct?: number;
  rating_value?: number;
  rating_count?: number;
  gender_str: string;
  url: string;
};

type SearchResults = {
  men: Fragrance[];
  women: Fragrance[];
  unisex: Fragrance[];
};

const accordColors: Record<string, string> = {
  floral: "#d08aff",
  woody: "#a38b6e",
  citrus: "#f6bd60",
  sweet: "#f28482",
  fresh: "#7bdff2",
  amber: "#f4a261",
  spicy: "#ff7f51",
  vanilla: "#fcd5ce",
  fruity: "#ffb6b9",
  musk: "#cdb4db",
  green: "#80ed99",
  aromatic: "#66a5ad",
  lavender: "#cbaacb",
  leather: "#8b5e3c",
  incense: "#4b3b47",
  powdery: "#f0e6ef",
  aquatic: "#9fd3c7",
  balsamic: "#bfa5a0",
  ozonic: "#aec6cf",
  smoky: "#5e5c5c",
  earthy: "#c1a57b",
  fruity_sweet: "#ffcad4",
  gourmand: "#d291bc",
  metallic: "#8c8c8c",
  herbal: "#90be6d",
  animalic: "#7b4b4b",
  resinous: "#c47ac0",
  tropical: "#f9c74f",
  alcoholic: "#d4a373",
  milky: "#f8edeb",
  chocolate: "#7f4f24",
  tea: "#cce3dc",
  coffee: "#6f4e37",
  almond: "#e6cfc7",
  coconut: "#f1faee",
  rose: "#f4978e",
  peony: "#e5989b",
  jasmine: "#fcd5ce",
  default: "#2c2c2c",
};

export default function SearchPage() {
  const [authChecked, setAuthChecked] = useState(false);

  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const glowEl = document.querySelector(".glow-wrapper");
    glowEl?.classList.add("glow-flash");

    setLoading(true);

    const startTime = Date.now();

    try {
      const res = await fetch(
        `http://34.229.253.81:8000/search?q=${encodeURIComponent(query)}`
        );
      const data: SearchResults = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(3000 - elapsed, 0);

      setTimeout(() => {
        glowEl?.classList.remove("glow-flash");
        setLoading(false);
      }, delay);
    }
  };

  const renderSlider = (title: string, items: Fragrance[] = []) => {
    const id = title.replace(/\s+/g, "-").toLowerCase();
    return (
      <div className="slider-section" id={`slider-${id}`}>
        <div className="slider-content-row">
          <h2 className="slider-title-left">{title}</h2>
          <div className="slider">
            {items.slice(0, 5).map((item, idx) => {
              const mainAccord = item.main_accords.find(
                (a) => accordColors[a.toLowerCase()]
              );
              const cardColor =
                accordColors[mainAccord?.toLowerCase() || "default"];

              return (
                <div
                  key={idx}
                  className="card"
                  style={{ backgroundColor: cardColor }}
                >
                  <div className="copy text-left px-6 py-4 text-white">
                    <h1 className="card-title">{item.name}</h1>
                    <p className="card-text">
                      Accords: {item.main_accords.join(", ")}
                    </p>
                    {item.similarity_pct != null && (
                      <p className="card-text">
                        Similarity: {item.similarity_pct.toFixed(1)}%
                      </p>
                    )}
                    {item.rating_value !== undefined && (
                      <p className="card-text">
                        Rating: {item.rating_value} ({item.rating_count} votes)
                      </p>
                    )}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link"
                      >
                        View Details
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setAuthChecked(true);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (!results) return;

    const sliders = document.querySelectorAll(".slider");
    sliders.forEach((slider) => {
      const cards = slider.querySelectorAll(".card");
      gsap.to(cards, {
        y: (i) => -15 + 15 * i + "%",
        z: (i) => 15 * i,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: -0.1,
      });

      const spans = slider.querySelectorAll(".copy h1");
      spans.forEach((el) => {
        const text = el.textContent || "";
        el.innerHTML = text
          .split("")
          .map((ch) => `<span>${ch === " " ? "&nbsp;" : ch}</span>`)
          .join("");
      });

      gsap.set(slider.querySelectorAll("h1 span"), { y: -200 });
      gsap.set(slider.querySelector(".card:last-child h1 span"), { y: 0 });

      const handleClick = () => {
        if (isAnimating) return;
        isAnimating = true;

        const cards = Array.from(slider.querySelectorAll(".card"));
        const lastCard = cards.pop();
        const nextCard = cards[cards.length - 1];

        if (!lastCard || !nextCard) return;

        gsap.to(lastCard.querySelectorAll("h1 span"), {
          y: 50,
          duration: 0.4,
          ease: "power3.out",
        });

        gsap.to(lastCard, {
          y: "+=40%",
          opacity: 0.4,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            slider.prepend(lastCard);

            const resetCards = Array.from(slider.querySelectorAll(".card"));
            gsap.to(resetCards, {
              y: (i) => -15 + 15 * i + "%",
              z: (i) => 15 * i,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: -0.1,
            });

            gsap.set(lastCard.querySelectorAll("h1 span"), { y: -50 });
            gsap.to(nextCard.querySelectorAll("h1 span"), {
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.05,
            });

            setTimeout(() => {
              isAnimating = false;
            }, 900);
          },
        });
      };

      slider.addEventListener("click", handleClick);
    });

    return () => {
      sliders.forEach((slider) => {
        slider.removeEventListener("click", () => {});
      });
    };
  }, [results]);
  if (!authChecked) return null;

  return (
    <div className="search-page-wrapper">
      {/* Logout Button */}
      <div className="logout-container">
        <button
          className="logout-button"
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
        >
          Log Out
        </button>
      </div>
  
      <div className="about-wrapper h-screen">
        <div className="glow-wrapper">
          <div className="about-section">
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a scent, note, or fragrance name…"
                className="input-underline flex-grow"
              />
              <button
                type="submit"
                disabled={!query || loading}
                className={`btn-submit text-sm flex items-center justify-center gap-2 ${
                  !query || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    Searching...
                    <span className="dot-spinner" />
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </form>
            <div className="queryfont text-center text-base h-6">
              Enter a query to see results.
            </div>
          </div>
        </div>
      </div>
  
      {results && (
        <div className="results-section">
          {renderSlider("Top Male Matches", results.men)}
          {renderSlider("Top Female Matches", results.women)}
          {renderSlider("Top Unisex Matches", results.unisex)}
        </div>
      )}
    </div>
  );
}
