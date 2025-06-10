"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import FragranceCarousel from "../carouselwheel/page";
import { User } from "@supabase/supabase-js";


const questions = [
  {
    id: "scent_families",
    text: "Which scent families do you like?",
    options: ["Citrus", "Woody", "Floral", "Oriental", "Fresh"],
    multi: true,
  },
  {
    id: "strength",
    text: "Do you prefer light or strong fragrances?",
    options: ["Light", "Moderate", "Strong"],
    multi: false,
  },
  {
    id: "occasion",
    text: "What occasion will you wear this fragrance for?",
    options: ["Everyday", "Date Night", "Work", "Special Events"],
    multi: false,
  },
  {
    id: "season",
    text: "What season are you looking for?",
    options: ["Spring", "Summer", "Fall", "Winter"],
    multi: false,
  },
];

type SurveyAnswers = {
  scent_families: string[];
  strength: string;
  budget: string;
  occasion: string;
  season: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [answers, setAnswers] = useState<SurveyAnswers>({
    scent_families: [],
    strength: "",
    budget: "",
    occasion: "",
    season: "",
  });

  const [surveyDone, setSurveyDone] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [step, setStep] = useState(0);

  const current = questions[step];
  const selected = answers[current.id as keyof SurveyAnswers];

  const isSelected = (opt: string) =>
  current.multi ? (selected as string[]).includes(opt) : selected === opt;

  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const originalBg = document.body.style.background;
    document.body.style.background = "#f9fafb"; // or rgba/white to match .about-wrapper
  
    return () => {
      document.body.style.background = originalBg;
    };
  }, []);
  
  // ✅ Single clean useEffect
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        setAuthChecked(true);
      }
    };
    getUser();
  }, [router]);

  if (!authChecked) return null;

  const handleOptionClick = (option: string, multi: boolean) => {
    const key = current.id as keyof SurveyAnswers;

    setAnswers((prev) => {
      if (multi) {
        const list = prev[key] as string[];
        return {
          ...prev,
          [key]: list.includes(option)
            ? list.filter((item) => item !== option)
            : [...list, option],
        };
      } else {
        return { ...prev, [key]: option };
      }
    });
  };

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setLoadingResults(true);
      if (!user) return;

      const payload = { user_id: user.id, ...answers };
      const res = await fetch("http://localhost:8000/submit-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSurveyDone(true);
        setTimeout(() => {
          setLoadingResults(false);
          router.push("/search");
        }, 6000);
      } else {
        setLoadingResults(false);
        alert("Failed to submit survey.");
      }
    }
  };

  return (
    <>
    <div className="about-wrapper fade-in">
      <div className="about-section">
        <h1 className="about-title">
          Welcome, {user?.user_metadata?.name || "User"}!
        </h1>

        {!surveyDone && !loadingResults ? (
          <>
            <p
              className="about-paragraph"
              style={{ fontWeight: "bold", fontSize: "1.25rem", marginBottom: "1rem" }}
            >
              Step {step + 1} of {questions.length}: {current.text}
            </p>

            <div className="survey-options">
              {current.options.map((opt) => (
                <div
                  key={opt}
                  className={`survey-card ${isSelected(opt) ? "selected" : ""}`}
                  onClick={() => handleOptionClick(opt, current.multi)}
                >
                  {opt}
                </div>
              ))}
            </div>

            <div className="survey-nav-buttons">
              {step > 0 && (
                <button className="btn-back" onClick={() => setStep((prev) => prev - 1)}>
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="btn-submit"
                disabled={current.multi ? !(selected as string[]).length : !selected}
              >
                {step < questions.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
          </>
        ) : loadingResults || surveyDone ? (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "1.5rem" }}>
              Fine tuning our models to your taste...
            </p>
            <FragranceCarousel />
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/login");
              }}
              className="btn-social"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
