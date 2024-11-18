"use client";
import React, { useEffect } from "react";
import { Sun, Moon, Laptop, BellIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useTheme } from "next-themes";
import { Button } from "./button";
import ContactList from "@/app/ContactList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchContacts } from "@/store/contactSlice";

export default function MainHeader() {
  const { setTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContacts(1));
  }, [dispatch]);

  const { contacts } = useSelector((state: RootState) => state.contacts);

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
            <div className="relative inline-flex items-center justify-center rounded-full w-10 h-10 hover:bg-secondary cursor-pointer">
              <BellIcon size={20} />
              {contacts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {contacts.length}
                </span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="min-w-[30vw] rounded-2xl p-1 mr-1 mt-3">
            <ContactList />
          </PopoverContent>
        </Popover>
        <ThemeToggleButton />
      </div>
    </div>
  );
}
