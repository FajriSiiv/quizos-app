"use client";

import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";

export default function ResultsPage() {
  const router = useRouter();
  const { correctAnswerUser, resetCorrectAnswerUser }: any = useStore();

  return (
    <div className="flex flex-col items-center justify-center h-screen max-h-[1200px]">
      <h1 className="text-2xl font-semibold">
        Your Correct Answer : {correctAnswerUser}
      </h1>
      <Button
        size="lg"
        onClick={() => {
          router.push("/");
        }}
      >
        Go Home
      </Button>
    </div>
  );
}
