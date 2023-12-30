"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQuestAPI } from "@/api/questApi";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useStore } from "@/store/store";
import { ProgressQuestBar } from "@/components/progressQuest";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/error/ErrorPage";
import { toast } from "@/components/ui/use-toast";

const QuestPart = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    numberQuest,
    categoryName,
    userName,
    correctAnswerUser,
    incCorrectAnswer,
    setNumberQuest,
    setCategoryName,
    setUserName,
  }: any = useStore();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSeed, setAnswerSeed] = useState<any[]>([]);
  const [indicatorAnswer, setIndicatorAnswer] = useState(false);
  const [progressBar, setProgressBar] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["quest", { numberQuest, categoryName }],
    queryFn: () => getQuestAPI(numberQuest, categoryName),
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
      queryClient.invalidateQueries([
        "quest",
        { numberQuest, categoryName },
      ] as any);

      setNumberQuest(null);
      setCategoryName(null);
      setUserName(null);
      setIndicatorAnswer(false);
      setProgressBar(0);

      toast({
        title: "Quiz Completed",
        description: `Thank you. ${userName}`,
      });

      router.push("/quest/results");
    }

    setAnswerSeed((prevState) => [...prevState, selectedAnswer]);

    isCorrect ? incCorrectAnswer() : null;

    setIndicatorAnswer(false);

    updateProgress(100 / numberQuest);
    console.log(correctAnswerUser);
    // alert(
    //   `Question ${currentQuestion + 1}: ${isCorrect ? "Correct" : "Incorrect"}`
    // );
  };

  const handleOptionSelect = (option: any) => {
    setSelectedAnswer(option);
    setIndicatorAnswer(true);
    console.log(option);
  };

  const updateProgress = (increment: any) => {
    setProgressBar((prevProgress) => Math.min(prevProgress + increment, 100));
  };
  console.log(data);

  if (data.length === 0) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col  justify-center items-center h-screen gap-5 ">
      <h2 className="text-2xl font-semibold py-2 px-5 bg-emerald-500 text-white rounded-md">
        Name: {userName}
      </h2>
      <ProgressQuestBar progress={progressBar} />

      <form
        onSubmit={handleAnswerSubmit}
        className="border p-5 rounded-sm flex flex-col gap-2 max-w-[50%]"
      >
        <h2 className="text-base font-semibold  ">
          Question #{currentQuestion + 1}
        </h2>
        <p className="text-3xl font-bold mb-3">
          {data[currentQuestion].question}
        </p>
        <div className="flex flex-col gap-2">
          {data[currentQuestion].options.map((option: any, index: any) => (
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
                  selectedAnswer === option
                    ? "bg-emerald-500 text-white "
                    : "bg-white "
                } text-lg cursor-pointer px-2 py-1 rounded-md w-full font-semibold  dark:text-primary-foreground shadow-md `}
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
