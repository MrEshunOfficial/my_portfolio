import React from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, UserIcon } from "lucide-react";

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

interface ActiveProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ActiveProjectModal: React.FC<ActiveProjectModalProps> = ({
  project,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <Avatar className="w-full h-64 object-cover rounded-lg mb-6">
            <AvatarImage src={project.image} alt={project.title} />
            <AvatarFallback>
              <UserIcon size={18} />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Role</h3>
              <p className="text-gray-600">{project.role}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Challenge & Solution
              </h3>
              <p className="text-gray-600 mb-2">{project.challenge}</p>
              <p className="text-gray-600">{project.solution}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Key Features</h3>
              <ul className="list-disc list-inside text-gray-600">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Link
                href={project.github}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                <FaGithub size={20} />
                View Code
              </Link>
              <Link
                href={project.link}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <ExternalLink size={20} />
                Live Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveProjectModal;
