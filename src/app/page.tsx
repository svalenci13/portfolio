"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { useState } from "react"
import { BlinkingDot } from "@/components/blinking-dot"
import { WorkExperience } from "@/components/work-experience"
import { Leadership } from "@/components/leadership"
import { SpotifyNowPlaying } from "@/components/spotify-now-playing"

export default function Home() {
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({})

  const toggleSection = (index: number) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - No border, bigger text, no blue box */}
      <header className="py-6">
        <nav className="max-w-2xl mx-auto px-6 flex justify-between items-center">
          <div className="text-black text-base font-semibold font-serif">
            sebo
          </div>
          <div className="flex gap-4 md:gap-8 font-mono text-sm font-medium items-center">
            <Link href="mailto:svalenci@uwaterloo.ca" target="_blank" className="text-blue-600 underline hover:text-blue-800">
              CONTACT
            </Link>
            <Link href="https://linkedin.com/in/svalenci" target="_blank" className="text-blue-600 underline hover:text-blue-800">
              LINKEDIN
            </Link>
            <Link href="https://twitter.com/sebo1738" target="_blank" className="text-blue-600 underline hover:text-blue-800">
              TWITTER
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 pt-16 pb-16">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="font-mono text-2xl font-bold mb-4 leading-tight">
            HEY, I&apos;M SEBASTIAN<BlinkingDot />
          </h1>
          <p className="text-base mb-2"><br />i&apos;m 23, from <Link href="https://www.youtube.com/watch?v=ATK4v-hxJX8" target="_blank" className="text-blue-600 underline hover:text-blue-800">toronto</Link>.</p>
          <p className="text-base mb-6">I&apos;ve been failing and getting back up for {Math.floor((new Date().getTime() - new Date('2002-01-13').getTime()) / (1000 * 60 * 60 * 24)).toLocaleString()} days.</p>
        </section>

        {/* Achievements */}
        <section className="mb-10">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            A FEW ACHIEVEMENTS:
          </h2>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">went from a 68% grade 11 average to a 97% grade 12 average</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">led <Link href="https://www.techplusuw.com/" target="_blank" className="text-blue-600 underline hover:text-blue-800">mentorship program</Link> for 200+ students in tech</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">top 1% in valorant & marvel rivals</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">did uber eats walking in downtown toronto during covid</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">saw messi in person</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">resold everything from candy to <Link href="https://www.instagram.com/heat.ca/?hl=en" target="_blank" className="text-blue-600 underline hover:text-blue-800">shoes</Link> to <Link href="https://www.kijiji.ca/o-profile/1004568164/reviews" target="_blank" className="text-blue-600 underline hover:text-blue-800">electronics</Link> to <Link href="https://www.ebay.ca/usr/sebavale99" target="_blank" className="text-blue-600 underline hover:text-blue-800">collectibles</Link></span>
            </li>
          </ul>
        </section>

        {/* Current Projects */}
        <section className="mb-10">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            WHAT I&apos;M WORKING ON RIGHT NOW:
          </h2>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">training for a triathlon</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">learning how to be a swe</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1"><Link href="https://www.sebo.fyi/" target="_blank" className="text-blue-600 underline hover:text-blue-800">this website</Link></span>
            </li>
          </ul>
          <p className="text-sm text-gray-600 italic mt-4">
            more to come
          </p>
        </section>

        {/* TL;DR */}
        <section className="mb-10">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            TL;DR:
          </h2>
          <div className="space-y-3 text-sm">
            <p>i have a strong background in data</p>
            <p>
              everywhere i go I try and do, learn grow as much as possible and I want to keep doing that.
            </p>
            <p>
              i&apos;m a big believer in myself 
            </p>
          </div>
        </section>

        {/* Expandable Sections - Better spacing and readability */}
        <section className="mb-10">
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
        </section>

        {/* Work Experience */}
        <WorkExperience />

        {/* Leadership */}
        <Leadership />

        {/* Currently Listening - Spotify */}
        <section className="mb-10">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            CURRENTLY LISTENING:
          </h2>
          <SpotifyNowPlaying />
        </section>

        {/* Directory - Last */}
        <section className="mb-10">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            DIRECTORY:
          </h2>
          <ul className="space-y-2 ml-4">
            {[
              { name: "contact", href: "mailto:svalenci@uwaterloo.ca" },
              { name: "gallery", href: "/gallery" },
              { name: "blog", href: "/blog" }
            ].map((item, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="text-black font-bold mr-3 mt-0.5">•</span>
                <Link 
                  href={item.href} 
                  target={item.href.startsWith('mailto:') ? "_blank" : "_self"}
                  className="text-blue-600 underline hover:text-blue-800 flex-1"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer - Smaller */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Sebastian Valencia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
