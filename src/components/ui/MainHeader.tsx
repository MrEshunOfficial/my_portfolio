"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Download,
  Linkedin,
  UserIcon,
  Sun,
  Moon,
  Laptop,
  BellIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaGithub, FaTwitter, FaFacebook } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";
import ContactList from "@/app/ContactList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchContacts } from "@/store/contactSlice";

// Portfolio Header Component
const PortfolioHeader = () => {
  const handleDownload = (type: "cv" | "coverLetter") => {
    const fileUrls = {
      cv: "/Christopher-Eshun-CV.pdf",
      coverLetter: "/Christopher-Eshun-Cover-Letter.pdf",
    };

    const fileName = {
      cv: "Christopher-Eshun-CV.pdf",
      coverLetter: "Christopher-Eshun-Cover-Letter.pdf",
    };

    const link = document.createElement("a");
    link.href = fileUrls[type];
    link.download = fileName[type];
    link.click();
  };

  return (
    <header className="shadow-sm bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left w-full">
            {/* Location and Availability */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>Accra-Ghana</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>Available for Work</span>
              </div>
            </div>

            {/* Title and Description */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Full Stack Developer
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mb-6">
              Passionate about building scalable web applications with modern
              technologies. Specialized in Next.js, TypeScript, and MongoDB
              development.
            </p>

            {/* Social Links and Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              {/* Social Media Links */}
              <div className="flex gap-2">
                <Link
                  href="https://github.com/MrEshunOfficial"
                  className="flex items-center p-2 bg-black dark:bg-gray-700 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <FaGithub size={20} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/christopher-eshun-bb0564123/"
                  className="flex items-center p-2 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href="https://x.com/Dev_Chris0691"
                  className="flex items-center p-2 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 hover:text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  <FaTwitter size={20} />
                </Link>
                <Link
                  href="https://web.facebook.com/profile.php?id=100087615977261"
                  className="flex items-center p-2 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 hover:text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  <FaFacebook size={20} />
                </Link>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => handleDownload("cv")}
                  className="flex items-center p-2 bg-green-600 dark:bg-green-700 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-800"
                >
                  <Download size={20} className="mr-2" />
                  <span className="hidden sm:inline">Download CV</span>
                  <span className="sm:hidden">CV</span>
                </Button>

                <Button
                  onClick={() => handleDownload("coverLetter")}
                  className="flex items-center p-2 bg-blue-600 dark:bg-blue-700 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Download size={20} className="mr-2" />
                  <span className="hidden sm:inline">
                    Download Cover Letter
                  </span>
                  <span className="sm:hidden">Cover Letter</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Avatar */}
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 border border-border dark:border-gray-700 rounded-full shadow-md shrink-0">
            <AvatarImage src="/myPic.jpg" alt="Christopher" />
            <AvatarFallback>
              <UserIcon size={18} />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

// Main Header Component
const MainHeader = () => {
  const { setTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContacts(1));
  }, [dispatch]);

  const { contacts } = useSelector((state: RootState) => state.contacts);

  const ThemeToggleButton = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full p-0"
        >
          <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-36">
        <div className="flex flex-col gap-1">
          <Button
            onClick={() => setTheme("light")}
            className="flex w-full items-center justify-start gap-3 rounded-md p-2"
            variant="ghost"
          >
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </Button>
          <Button
            onClick={() => setTheme("dark")}
            className="flex w-full items-center justify-start gap-3 rounded-md p-2"
            variant="ghost"
          >
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </Button>
          <Button
            onClick={() => setTheme("system")}
            className="flex w-full items-center justify-start gap-3 rounded-md p-2"
            variant="ghost"
          >
            <Laptop className="h-4 w-4" />
            <span>System</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="w-full px-4 py-3 sm:px-6 flex items-center justify-between">
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight truncate">
        {`Christopher's Portfolio`}
      </h3>

      <div className="flex items-center gap-2 sm:gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative inline-flex items-center justify-center rounded-full w-8 h-8 sm:w-10 sm:h-10 hover:bg-secondary cursor-pointer">
              <BellIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              {contacts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {contacts.length}
                </span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] sm:w-[350px] md:w-[400px] lg:w-[30vw] rounded-2xl p-1 mr-1 mt-3">
            <ContactList />
          </PopoverContent>
        </Popover>
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export { PortfolioHeader, MainHeader };
