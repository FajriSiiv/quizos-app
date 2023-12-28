"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuestAPI } from "@/api/questApi";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const shuffleArray = (array: any) => {
  return array.sort((a: string, b: string) => {
    const firstLetterA = a.charAt(0).toLowerCase();
    const firstLetterB = b.charAt(0).toLowerCase();

    if (firstLetterA < firstLetterB) {
      return -1;
    }
    if (firstLetterA > firstLetterB) {
      return 1;
    }
    return 0;
  });
};

const QuestPart = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSeed, setAnswerSeed] = useState<any[]>([]);
  const [indicatorAnswer, setIndicatorAnswer] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["quest"],
    queryFn: getQuestAPI,
    staleTime: 3600000,
  });

  if (isLoading) {
    return <p>Loading..</p>;
  }

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = selectedAnswer === data[currentQuestion].correct_answer;

    if (currentQuestion < data.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      console.log("Quiz completed!");
    }

    setAnswerSeed((prevState) => [...prevState, selectedAnswer]);
    setIndicatorAnswer(false);

    alert(
      `Question ${currentQuestion + 1}: ${isCorrect ? "Correct" : "Incorrect"}`
    );
  };

  const handleOptionSelect = (option: any) => {
    setSelectedAnswer(option);
    setIndicatorAnswer(true);
    console.log(option);
  };

  const options = shuffleArray([
    data[currentQuestion].correct_answer,
    ...data[currentQuestion].incorrect_answers,
  ]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-2 ">
      <form
        onSubmit={handleAnswerSubmit}
        className="border p-5 rounded-sm flex flex-col gap-2 max-w-[85%]"
      >
        <h2 className="text-base font-semibold  ">
          Question #{currentQuestion + 1}
        </h2>
        <p className="text-3xl font-bold">{data[currentQuestion].question}</p>
        <div className="flex flex-col gap-2">
          {options.map((option: any, index: any) => (
            <div className="flex items-center space-x-2" key={index}>
              <input
                type="radio"
                value={option}
                id={option}
                checked={selectedAnswer === option}
                onClick={() => handleOptionSelect(option)}
                className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Label
                htmlFor={option}
                className={`${
                  selectedAnswer === option ? "bg-emerald-500" : "bg-primary"
                } text-lg cursor-pointer px-2 py-1  text-white rounded-md w-full font-semibold dark:text-black`}
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
        <Button
          type="submit"
          className="mt-2 bg-emerald-500"
          size="lg"
          disabled={!indicatorAnswer}
        >
          Submit Answer
        </Button>
      </form>
    </div>
  );
};

export default QuestPart;
