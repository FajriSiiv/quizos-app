"use client";
import { useStore } from "@/store/store";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Film,
  Disc,
  Gamepad2,
  Newspaper,
  Trophy,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const ButtonSidebar = ({ state, onClickBtn, iconBtn, text }: any) => {
  return (
    <Button
      className="flex justify-start gap-x-5 bg-white text-black fill-black hover:text-white"
      onClick={onClickBtn}
    >
      {iconBtn}
      {!state ? <span className="font-semibold">{text}</span> : null}
    </Button>
  );
};

const Sidebar = () => {
  const { sidebarState }: any = useStore();

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div
      className={`w-1/6 transition-all ${
        sidebarState ? "w-[75px]" : "max-lg:-translate-x-0 max-md:w-fit "
      } max-lg:absolute bg-white h-fit z-10 max-lg:-translate-x-full`}
    >
      <div className="flex flex-col px-2 gap-1">
        <ButtonSidebar
          iconBtn={<LayoutGrid />}
          text="Beranda"
          state={sidebarState}
        />
        <ButtonSidebar iconBtn={<Film />} text="Short" state={sidebarState} />
        <ButtonSidebar iconBtn={<Disc />} text="Musik" state={sidebarState} />

        <Separator className="my-3" />

        {/* {!sidebarState ? <p className="ml-2">Lainnya dari Dutube</p> : null} */}

        <ButtonSidebar
          iconBtn={<Gamepad2 />}
          text="Gaming"
          state={sidebarState}
        />
        <ButtonSidebar
          iconBtn={<Newspaper />}
          text="Berita"
          state={sidebarState}
        />
        <ButtonSidebar
          iconBtn={<Trophy />}
          text="Olahraga"
          state={sidebarState}
        />

        {/* <Button className="flex justify-start gap-x-5 bg-white text-black fill-black hover:text-white">
          <Film />
          {!sidebarState ? <span className="font-semibold">Short</span> : null}
        </Button> */}
      </div>
    </div>
  );
};

export default Sidebar;
