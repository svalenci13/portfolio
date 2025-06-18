"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { useState } from "react"

const projects = [
  {
    title: "CREATIVE PORTFOLIO",
    description: "A comprehensive collection of my graphic design and video editing work",
    details: [
      "Logo design and brand identity projects",
      "Video editing and motion graphics",
      "Social media content and promotional materials",
      "Typography and print design work"
    ],
    technologies: ["Adobe Creative Suite", "After Effects", "Figma", "Premiere Pro"],
    link: "https://your-creative-portfolio.com",
    status: "Live"
  },
  {
    title: "FULL-STACK WEB APPLICATION", 
    description: "A modern web app built from scratch with user authentication and real-time features",
    details: [
      "Built with React and TypeScript for the frontend",
      "Node.js and Express backend with PostgreSQL database",
      "Real-time messaging with Socket.io",
      "Deployed on Vercel with CI/CD pipeline"
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
    link: "https://your-project.com",
    status: "In Development"
  },
  {
    title: "DATA VISUALIZATION DASHBOARD",
    description: "Interactive analytics platform for complex dataset analysis", 
    details: [
      "Built custom data processing pipeline",
      "Interactive charts and real-time updates", 
      "Export functionality for reports",
      "Mobile-responsive design"
    ],
    technologies: ["Python", "D3.js", "FastAPI", "React", "PostgreSQL"],
    link: "https://your-dashboard.com",
    status: "Live"
  },
  {
    title: "E-COMMERCE PLATFORM",
    description: "Custom shopping platform with payment processing and inventory management",
    details: [
      "Full shopping cart and checkout flow",
      "Stripe payment integration",
      "Admin dashboard for inventory management",
      "Order tracking and customer notifications"
    ],
    technologies: ["Next.js", "Stripe", "Prisma", "TailwindCSS"],
    link: "https://your-ecommerce.com", 
    status: "Live"
  }
]

export function ProjectsExpandable() {
  const [openProjects, setOpenProjects] = useState<{ [key: number]: boolean }>({})

  const toggleProject = (index: number) => {
    setOpenProjects(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="mb-10">
      <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
        FEATURED PROJECTS:
      </h2>
      
      <div className="space-y-3">
        {projects.map((project, index) => {
          const isOpen = openProjects[index] || false
          return (
            <Collapsible key={index} open={isOpen} onOpenChange={() => toggleProject(index)}>
              <CollapsibleTrigger asChild>
                <button className="w-full flex justify-between items-center py-3 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs font-medium uppercase tracking-wide text-gray-700">
                        {project.title}
                      </span>
                      <span className={`text-xs font-mono uppercase tracking-wide px-2 py-0.5 rounded ${
                        project.status === 'Live' 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <span className={`font-mono text-xs font-semibold uppercase tracking-wide underline text-black ml-4 ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}>
                    {isOpen ? 'CLOSE' : 'OPEN'}
                  </span>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-gray-50 border-l border-r border-b border-gray-200 p-4">
                <div className="space-y-4">
                  {/* Project Details */}
                  <div>
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">
                      Project Details:
                    </h4>
                    <ul className="space-y-1 ml-4">
                      {project.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start text-sm">
                          <span className="text-black font-bold mr-3 mt-0.5">•</span>
                          <span className="flex-1 text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div>
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs font-mono text-gray-600 bg-white px-2 py-1 rounded border border-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Link */}
                  <div className="pt-2 border-t border-gray-200">
                    <Link
                      href={project.link}
                      target="_blank"
                      className="inline-flex items-center text-sm font-mono font-medium text-blue-600 underline hover:text-blue-800 transition-colors"
                    >
                      VIEW PROJECT 
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </div>
      
      {/* Additional Projects Link */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 italic">
          + more projects on my{" "}
          <Link href="https://github.com/yourusername" target="_blank" className="text-blue-600 underline hover:text-blue-800">
            GitHub
          </Link>
        </p>
      </div>
    </div>
  )
} 