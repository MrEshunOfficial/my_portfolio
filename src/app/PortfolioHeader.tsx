"use client";
import React from "react";
import Link from "next/link";
import { MapPin, Clock, Download, Linkedin, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaGithub, FaTwitter, FaFacebook } from "react-icons/fa";

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
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex-1 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
              <MapPin size={16} />
              <span>Accra-Ghana</span>
              <Clock size={16} className="ml-4" />
              <span>Available for Work</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Full Stack Developer
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mb-6 px-4 md:px-0">
              Passionate about building scalable web applications with modern
              technologies. Specialized in Next.js, TypeScript, and MongoDB
              development.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mb-6">
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

              {/* CV Download Button */}
              <Button
                onClick={() => handleDownload("cv")}
                className="flex items-center p-2 bg-green-600 dark:bg-green-700 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-800"
              >
                <Download size={20} className="mr-2" />
                Download CV
              </Button>

              {/* Cover Letter Download Button */}
              <Button
                onClick={() => handleDownload("coverLetter")}
                className="flex items-center p-2 bg-blue-600 dark:bg-blue-700 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-800"
              >
                <Download size={20} className="mr-2" />
                Download Cover Letter
              </Button>
            </div>
          </div>
          <Avatar className="h-36 w-36 md:h-48 md:w-48 border border-border dark:border-gray-700 rounded-full shadow-md">
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

export default PortfolioHeader;
