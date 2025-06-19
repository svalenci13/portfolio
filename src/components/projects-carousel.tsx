"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

type Project = {
  title: string
  description: string
  category: string
  link: string
  emoji?: string
  image?: string
  tags: string[]
}

const projects: Project[] = [
  {
    title: "Building Best Value Soccer Team",
    description: "Using integer programming and operations research to select the optimal 11-player lineup from Europe's top leagues within budget constraints",
    category: "Data Science", 
    link: "/projects/soccer-optimization",
    image: "/logos/wide.jpeg",
    tags: ["Python", "Gurobi", "Operations Research"]
  },
  {
    title: "Lyft Express Drive Analytics",
    description: "Business intelligence dashboard analyzing Lyft's Express Drive health metrics across various facets of the business ",
    category: "Business Analytics",
    link: "/projects/lyft-express-drive-dashboard",
    image: "/logos/lyft.png",
    tags: ["SQL", "Mode Analytics", "Business Intelligence"]
  },
  {
    title: "Graphic Design & Video Portfolio",
    description: "Collection of my creative work including logos, promotional graphics, branding, and video editing",
    category: "Creative",
    link: "/creative-portfolio",
    image: "/logos/goated.jpg",
    tags: ["Design", "Video", "Branding"]
  }
]

export function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false) // Stop auto-play when user manually navigates
  }

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextProject()
    }, 4000) // Change project every 4 seconds

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying])

  // Pause auto-play on hover, resume on mouse leave
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const isExternalLink = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://')
  }

  return (
    <div className="mb-10" id="projects">
      <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
        FEATURED PROJECTS:
      </h2>
      
      {/* Carousel Container with external arrows on desktop */}
      <div className="relative">
        {/* Navigation Buttons - Outside on desktop, inside on mobile */}
        <button
          onClick={() => {
            prevProject()
            setIsAutoPlaying(false)
          }}
          className="absolute left-0 md:-left-12 top-1/2 md:top-1/2 top-auto bottom-4 md:bottom-auto transform md:-translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Previous project"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => {
            nextProject()
            setIsAutoPlaying(false)
          }}
          className="absolute right-0 md:-right-12 top-1/2 md:top-1/2 top-auto bottom-4 md:bottom-auto transform md:-translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Next project"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      
      {/* Main Carousel */}
      <div 
        className="relative overflow-hidden bg-gray-50 border border-gray-200 rounded-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project, index) => (
              <div key={index} className="w-full flex-shrink-0 p-6 pb-16 md:pb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Project Visual */}
                <div className="md:w-1/3">
                    <div className={`aspect-video border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center ${
                      project.image === "/logos/lyft.png" ? "" : "bg-white"
                    }`}
                    style={project.image === "/logos/lyft.png" ? { backgroundColor: "#ff00bf" } : {}}
                    >
                    {project.image ? (
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        width={400}
                        height={225}
                          className={`${
                            project.image === "/logos/lyft.png" 
                              ? "w-full h-auto object-contain p-4" 
                              : "w-full h-full object-cover"
                          }`}
                      />
                    ) : (
                      <span className="text-6xl">
                        {project.emoji}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono uppercase tracking-wide text-gray-500 bg-white px-2 py-1 rounded border">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-mono text-lg font-semibold mb-3 text-black">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="text-xs font-mono text-gray-600 bg-white px-2 py-1 rounded border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Link
                      href={project.link}
                        {...(isExternalLink(project.link) ? { target: "_blank" } : {})}
                      className="inline-flex items-center text-sm font-mono font-medium text-blue-600 underline hover:text-blue-800 transition-colors"
                    >
                      VIEW PROJECT →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      
      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToProject(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-black' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 