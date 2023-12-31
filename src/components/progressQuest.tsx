"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function ProgressQuestBar(props: any) {
  return (
    <Progress
      value={props.progress}
      className={`max-w-[50%] max-md:max-w-5/6`}
    />
  );
}
