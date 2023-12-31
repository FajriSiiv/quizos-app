"use client";

import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderBoard from "./leaderBoard";

export default function ResultsPage() {
  const router = useRouter();
  const { correctAnswerUser, userName }: any = useStore();

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen max-h-[1200px] max-md:max-h-screen max-md:py-16">
      <Tabs
        defaultValue="score"
        className="w-[400px] h-[600px] p-5  border-secondary border-4 rounded-md max-md:max-w-full max-md:mx-3 max-sm:border-none"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="score">Your Score</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="score" className="h-full">
          <div className="flex flex-col justify-center h-full items-center gap-2">
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
        </TabsContent>
        <TabsContent value="leaderboard" className="">
          <LeaderBoard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
