"use client";
import { useStore } from "@/store/store";
import { Bell, Menu, Search } from "lucide-react";
import React, { useRef } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Navbar = () => {
  const {
    sidebarState,
    onChangeSidebar,
    setSearchValue,
    search,
    loadingPage,
  }: any = useStore();

  const inputRef = useRef<any>(null);

  const handleSearch = (e: any) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    if (inputValue === "") return setSearchValue("");

    setSearchValue(inputValue);
    loadingPage();
    search();
  };

  return (
    <div className="p-2 flex">
      <div className="flex flex-[1] gap-x-2 items-center px-2">
        <Button
          variant={sidebarState ? "secondary" : "default"}
          size="icon"
          onClick={onChangeSidebar}
        >
          <Menu />
        </Button>
        <h1 className="text-2xl italic font-bold max-md:hidden">Dutube</h1>
      </div>
      <div className="flex items-center flex-[5] justify-between px-5 max-md:flex-[7] max-md:px-1 max-sm:gap-1">
        <form
          onSubmit={handleSearch}
          className=" flex items-center w-4/6 gap-2 max-md:w-5/6 max-sm:gap-0"
        >
          <Input
            placeholder="Telusuri"
            className="focus-visible:ring-transparent rounded-tl-full rounded-bl-full"
            ref={inputRef}
          />
          <Button variant="secondary" type="submit" className="max-sm:p-2">
            <Search />
          </Button>
        </form>
        <div className="flex gap-x-2 max-md:w-1/6 justify-end">
          <Button
            size="icon"
            className="rounded-full max-md:hidden"
            variant="ghost"
          >
            <Bell />
          </Button>

          <Avatar>
            <AvatarFallback>HL</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
