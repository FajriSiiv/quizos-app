"use client";
import { useStore } from "@/store/store";
import { useQueryClient } from "@tanstack/react-query";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const ErrorPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    numberQuest,
    categoryName,
    resetCorrectAnswerUser,
    setNumberQuest,
    setCategoryName,
    setUserName,
  }: any = useStore();

  return (
    <div className="flex items-center justify-center h-screen max-h-[1200px] flex-col gap-5">
      <h2 className="text-5xl font-bold">Something Wrong!</h2>
      <ShieldAlert className="fill-white h-40 w-40 text-rose-500" />
      <Button
        className="text-xl font-bold bg-emerald-500"
        size="lg"
        onClick={() => {
          queryClient.invalidateQueries([
            "quest",
            { numberQuest, categoryName },
          ] as any);

          setNumberQuest(null);
          setCategoryName(null);
          setUserName(null);
          resetCorrectAnswerUser();

          router.push("/");
        }}
      >
        Get back
      </Button>
    </div>
  );
};

export default ErrorPage;
