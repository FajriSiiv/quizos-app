import { Loader } from "lucide-react";
import React from "react";

export default function LoadingComponent() {
  return (
    <div className="flex items-center gap-2 flex-col justify-center h-screen max-h-[1200px]">
      <Loader className="w-20 h-20 animate-spin" />
      <span className="text-xl">Loading....</span>
    </div>
  );
}
