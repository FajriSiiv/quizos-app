"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [themeNow, setThemeNow] = useState("");

  const toggleTheme = () => {
    if (themeNow === "dark") {
      setThemeNow("light");
      setTheme(themeNow);
    } else {
      setThemeNow("dark");
      setTheme(themeNow);
    }
  };

  useEffect(() => {
    toggleTheme();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
