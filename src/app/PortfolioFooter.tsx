"use client";
import React from "react";
import Link from "next/link";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { Linkedin } from "lucide-react";

const PortfolioFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Christopher Eshun</h3>
            <p className="text-gray-400">Full Stack Developer</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>About</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <Link href={"https://github.com/MrEshunOfficial"}>
                <FaGithub
                  className="text-gray-400 hover:text-white cursor-pointer"
                  size={18}
                />
              </Link>
              <Link href={"https://x.com/Dev_Chris0691"}>
                <Linkedin
                  className="text-gray-400 hover:text-white cursor-pointer"
                  size={18}
                />
              </Link>
              <Link
                href={"https://web.facebook.com/profile.php?id=100087615977261"}
              >
                <FaFacebook
                  className="text-gray-400 hover:text-white cursor-pointer"
                  size={18}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Christopher Eshun. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
