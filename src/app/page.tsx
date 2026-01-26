"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { BlinkingDot } from "@/components/blinking-dot"
import { WorkExperience } from "@/components/work-experience"
import { Leadership } from "@/components/leadership"

// Dynamically import components that might use localStorage to prevent SSR issues
const SpotifyNowPlaying = dynamic(
  () => import("@/components/spotify-now-playing").then((mod) => ({ default: mod.SpotifyNowPlaying })),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.959-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.361 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }
)
const ProjectsCarousel = dynamic(
  () => import("@/components/projects-carousel").then((mod) => ({ default: mod.ProjectsCarousel })),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }
)

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render the full page on the client side
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 pt-6 pb-12">
        {/* Hero Section */}
        <section className="mb-5">
          <h1 className="font-mono text-lg font-bold mb-2 leading-tight">
            HEY, I&apos;M SEBASTIAN<BlinkingDot />
          </h1>
        </section>

        {/* TL;DR */}
        <section className="mb-6">
          <div className="space-y-2.5 text-xs text-gray-700">
            <p>Open to product data science opportunities</p>
            <p>
              I want to learn/grow as much as and as quick as possible. If you have an opportunity that allows for then shoot me message on <Link href="https://linkedin.com/in/svalenci" target="_blank" className="text-blue-600 underline hover:text-blue-800">LinkedIn</Link>
            </p>
          </div>
        </section>

        {/* Expandable Sections - Hidden for minimalism but kept in codebase */}
        {/* <section className="mb-10">
          <div className="space-y-3">
            {[
              {
                title: "HOW I GOT HERE",
                content: [
                  "I had a 68% average in grade 11 thought I wasn't going to go to uni, got deferred from my dream program, failed in getting my first co-op, almost failed my third semester, didn't get a lot of co-ops I wanted",
                  "But regardless I just kept trying and I think that's all that matters"
                ]
              },
              {
                title: "MY GOAL", 
                content: [
                  "Not sure right now, but I do know that I want to be the best at what it is whether its in software, data, or something else",
                  "hopefully something consumer facing"
                ]
              },
              {
                title: "MY MOTIVATIONS",
                content: [
                  "mainly I dont want to be stuck asking what if. I think part of that motivation comes from my parents they are the most hardworking people I know and showed me resillience first hand"
                ]
              },
              {
                title: "WHERE I SEE MYSELF IN 10 YEARS",
                content: [
                  "alive and well"
                ]
              }
            ].map((section, index) => {
              const isOpen = openSections[index] || false
              return (
                <Collapsible key={index} open={isOpen} onOpenChange={() => toggleSection(index)}>
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex justify-between items-center py-3 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left transition-colors">
                      <span className="font-mono text-xs font-medium uppercase tracking-wide text-gray-700">
                        {section.title}
                      </span>
                      <span className={`font-mono text-xs font-semibold uppercase tracking-wide underline text-black ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}>
                        {isOpen ? 'CLOSE' : 'OPEN'}
                      </span>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-gray-50 border-l border-r border-b border-gray-200 p-3">
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-sm text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </div>
        </section> */}

        {/* Work Experience */}
        <WorkExperience />

        {/* Leadership */}
        <Leadership />

        {/* Featured Projects */}
        <ProjectsCarousel />

        {/* Currently Listening - Spotify */}
        <section className="mb-4">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wide mb-3">
            WHAT I&apos;M LISTENING TO:
          </h2>
          <SpotifyNowPlaying />
        </section>

        {/* Subtle Horizontal Line */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Contact Links */}
        <section className="mb-4">
          <div className="flex gap-4 md:gap-6 font-mono text-xs font-medium items-center justify-center">
            <Link href="mailto:svalenci@uwaterloo.ca" target="_blank" className="text-blue-600 underline hover:text-blue-800">
              CONTACT
            </Link>
            <Link href="https://linkedin.com/in/svalenci" target="_blank" className="text-blue-600 underline hover:text-blue-800">
              LINKEDIN
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
