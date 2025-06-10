// app/survey/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


const questions = [
  {
    id: 1,
    text: "Which scent families do you like? (Check all that apply)",
    options: ["Citrus", "Woody", "Floral", "Oriental", "Fresh"],
  },
  {
    id: 2,
    text: "Do you prefer light or strong fragrances?",
    options: ["Light", "Moderate", "Strong"],
  },
  {
    id: 3,
    text: "What’s your budget range?",
    options: ["$-$$", "$$-$$$", "$$$+"],
  },
  // Add more questions here if needed
];

export default function SurveyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleOptionClick = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // TODO: send `answers` to /api/survey/submit
      router.push("/search");
    }
  };

  const question = questions[currentStep];
  const selectedAnswer = answers[question.id] || "";

  return (
    
    <div className="container flex items-center justify-center py-16">
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
      <div className="form-card w-full max-w-md">
        <h2 className="heading-md text-center mb-4">
          Step {currentStep + 1} of {questions.length}
        </h2>
        <div className="mb-6">
          <p className="text-base mb-2">{question.text}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleOptionClick(question.id, opt)}
                className={
                  selectedAnswer === opt
                    ? "btn btn-primary w-full text-sm"
                    : "btn w-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
                }
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="btn btn-disabled text-sm px-4 py-2"
            >
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            disabled={!selectedAnswer}
            className={
              !selectedAnswer
                ? "btn btn-disabled text-sm px-4 py-2"
                : "btn btn-secondary text-sm px-4 py-2"
            }
          >
            {currentStep < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}