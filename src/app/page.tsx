"use client";
import React, { useState, useEffect } from "react";
import {
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  Download,
  MapPin,
  Calendar,
  Clock,
  UserIcon,
  Sun,
  Moon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import ContactForm from "./ContactForm";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioFooter from "./PortfolioFooter";
import ActiveProjectModal from "./ActiveProjectModal";

interface Project {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  image: string;
  link: string;
  github: string;
  role: string;
  challenge: string;
  solution: string;
}

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects = [
    {
      title: "Debt Tracker",
      description:
        "A comprehensive debt management application helping users track and manage their debts efficiently.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Redux"],
      features: [
        "Debt visualization",
        "Payment tracking",
        "Financial analytics",
      ],
      image:
        "https://images.pexels.com/photos/7680743/pexels-photo-7680743.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "#",
      github: "https://github.com/MrEshunOfficial/debt_tracker",
      role: "Lead Developer",
      challenge: "Creating an intuitive interface for complex financial data.",
      solution: "Implemented interactive charts and clear visual hierarchies.",
    },
    {
      title: "PlanZen",
      description:
        "Smart schedule management platform for organizing and optimizing daily tasks and appointments.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Redux"],
      features: [
        "Calendar integration",
        "Task prioritization",
        "Schedule optimization",
      ],
      image:
        "https://images.pexels.com/photos/5408684/pexels-photo-5408684.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "https://planzen-jog3yco3p-christopher-eshuns-projects.vercel.app/",
      github: "https://github.com/MrEshunOfficial/planzen",
      role: "Lead Developer",
      challenge: "Handling complex scheduling logic and conflicts.",
      solution: "Developed an efficient algorithm for schedule optimization.",
    },
    {
      title: "MyStore",
      description:
        "Household shopping list management system for efficient grocery and supplies tracking.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      features: [
        "Shopping list creation",
        "Item categorization",
        "Budget tracking",
      ],
      image:
        "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "#",
      github: "https://github.com/MrEshunOfficial/my_store",
      role: "Lead Developer",
      challenge: "Creating an intuitive interface for complex financial data.",
      solution: "Implemented interactive charts and clear visual hierarchies.",
    },
    {
      title: "Harvest Bridge",
      description:
        "E-commerce platform connecting farmers directly with consumers, minimizing intermediaries.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Redux"],
      features: ["Direct marketplace", "Farmer profiles", "Order management"],
      image:
        "https://images.pexels.com/photos/14022952/pexels-photo-14022952.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "https://harvest-bridge-1sl7xwauc-christopher-eshuns-projects.vercel.app/",
      github: "https://github.com/MrEshunOfficial/harvest_bridge",
      role: "Lead Developer",
      challenge: "Handling complex scheduling logic and conflicts.",
      solution: "Developed an efficient algorithm for schedule optimization.",
    },
  ];

  const experiences = [
    {
      title: "Freelance Developer",
      company: "Self-employed",
      period: "2023 - Present",
      description: "Developed full-stack web applications for various clients",
      achievements: [
        "Deployed 4 successful projects",
        "Actively Maintaining and Updating deployed applications",
        "Implemented modern web technologies",
      ],
    },
    {
      title: "Software Engineer",
      company: "Self-employed",
      period: "2024-present",
      description:
        "Lead developer for a team of 10 developers, responsible for maintaining and updating a complex e-commerce platform",
      achievements: [
        "Lead development of a complex web application using Next.js, TypeScript, and MongoDB",
        "Designed and implemented new features and improvements",
        "Optimized and scaled the application to handle high traffic and user load",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor's in Agricultural Engineering",
      institution: "University of Energy and Natural Resources",
      year: "2019",
      relevantCourses: [
        "Product Development",
        "Database Systems",
        "Algorithms",
      ],
    },
  ];

  return (
    <div
      className={`w-full min-h-full dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900`}
    >
      {/* Hero Section - Enhanced */}
      <PortfolioHeader />

      {/* About Section - New */}
      <section className="py-16 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Professional Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A passionate full-stack developer with expertise in building
                modern web applications. Focused on creating efficient,
                scalable, and user-friendly solutions.
              </p>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Work Philosophy
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                <li>Clean, maintainable code</li>
                <li>User-centric design approach</li>
                <li>Agile development methodology</li>
                <li>Continuous learning and improvement</li>
              </ul>
            </div>
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Key Skills & Competence
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  <li>
                    Proficient in Responsive design and development best
                    practices
                  </li>
                  <li>Strong problem-solving and debugging skills</li>
                  <li>Effective communication and teamwork</li>
                  <li>Strong attention to detail and organizational skills</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Quick Facts
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <MapPin className="text-gray-600 dark:text-gray-400" />
                    <span>Based in [Accra-Ghana]</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Calendar className="text-gray-600 dark:text-gray-400" />
                    <span>2+ years of coding experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Clock className="text-gray-600 dark:text-gray-400" />
                    <span>
                      Available for freelance projects, remote or on-field
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Enhanced */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Projects
        </h2>
        <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border dark:border-gray-700"
              onClick={() => setActiveProject(project)}
            >
              <Avatar className="w-full h-48 object-contain rounded-md">
                <AvatarImage src={project.image} alt={project.title} />
                <AvatarFallback>
                  <UserIcon size={18} />
                </AvatarFallback>
              </Avatar>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.link}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      Role:
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.role}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      Challenge & Solution:
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.challenge}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.solution}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-gray-700 dark:text-gray-200 rounded-full text-sm bg-gray-100 dark:bg-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Experience Section - Enhanced */}
      <section className="py-16 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-600 pl-4 dark:border-blue-400"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {exp.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {exp.company} | {exp.period}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {exp.description}
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section - Enhanced */}
      <section className="py-16 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Education
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="rounded-lg shadow-md p-6 dark:bg-gray-800 dark:border dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {edu.degree}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {edu.institution} | {edu.year}
                </p>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Relevant Courses:
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {edu.relevantCourses.map((course, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced */}
      <section className="py-10 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Mail className="text-gray-600 dark:text-gray-400" />
                  <span>christophereshun91@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="text-gray-600 dark:text-gray-400" />
                  <span>Accra-Ghana</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Clock className="text-gray-600 dark:text-gray-400" />
                  <span>Response Time: Within 24 hours</span>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer - New */}
      <PortfolioFooter />

      {activeProject && (
        <ActiveProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;
