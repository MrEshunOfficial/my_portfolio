"use client";
import React, { useState } from "react";
import { Sun, Moon, Laptop, BellIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useTheme } from "next-themes";
import { Button } from "./button";
import Link from "next/link";

export default function MainHeader() {
  const { setTheme } = useTheme();

  const ThemeToggleButton = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="relative w-10 h-10 rounded-full">
          <Sun className="rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0 " />
          <Moon className="absolute rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-36">
        <Button
          onClick={() => setTheme("light")}
          className="flex w-full items-center justify-start gap-3 rounded-md p-2"
          variant="ghost"
        >
          <Sun className="h-5 w-5" />
          <span>Light</span>
        </Button>
        <Button
          onClick={() => setTheme("dark")}
          className="flex w-full items-center justify-start gap-3 rounded-md p-2 my-1"
          variant="ghost"
        >
          <Moon className="h-5 w-5" />
          <span>Dark</span>
        </Button>
        <Button
          onClick={() => setTheme("system")}
          className="flex w-full items-center justify-start gap-3 rounded-md p-2"
          variant="ghost"
        >
          <Laptop className="h-5 w-5" />
          <span>System</span>
        </Button>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="w-full flex items-center justify-between">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {`Christopher's Portfolio`}
      </h3>

      <div className="flex items-center justify-end gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <div className="inline-flex items-center justify-center rounded-full w-10 h-10 hover:bg-secondary cursor-pointer">
              <BellIcon size={20} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="min-w-60 rounded-2xl p-1 mr-1 mt-3">
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>
                Your just contacted christopher, he will receive your email
              </li>
            </ul>
          </PopoverContent>
        </Popover>
        <ThemeToggleButton />
      </div>
    </div>
  );
}
