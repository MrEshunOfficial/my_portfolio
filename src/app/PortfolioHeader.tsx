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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left w-full">
            {/* Location and Availability */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-sm sm:text-base">Accra-Ghana</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="text-sm sm:text-base">Available for Work</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Full Stack Developer
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mb-6 px-4 lg:px-0">
              Passionate about building scalable web applications with modern
              technologies. Specialized in Next.js, TypeScript, and MongoDB
              development.
            </p>

            {/* Social and Download Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              {/* Social Media Links */}
              <Link
                href="https://github.com/MrEshunOfficial"
                className="social-icon-link bg-black dark:bg-gray-700"
              >
                <FaGithub size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/christopher-eshun-bb0564123/"
                className="social-icon-link bg-blue-600 dark:bg-blue-700"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://x.com/Dev_Chris0691"
                className="social-icon-link border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 hover:bg-blue-700"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="https://web.facebook.com/profile.php?id=100087615977261"
                className="social-icon-link border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 hover:bg-blue-700"
              >
                <FaFacebook size={20} />
              </Link>

              {/* Download Buttons */}
              <Button
                onClick={() => handleDownload("cv")}
                className="download-button bg-green-600 dark:bg-green-700"
              >
                <Download size={20} className="mr-2" />
                Download CV
              </Button>
              <Button
                onClick={() => handleDownload("coverLetter")}
                className="download-button bg-blue-600 dark:bg-blue-700"
              >
                <Download size={20} className="mr-2" />
                Download Cover Letter
              </Button>
            </div>
          </div>

          {/* Avatar Section */}
          <Avatar className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 border border-border dark:border-gray-700 rounded-full shadow-md">
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
