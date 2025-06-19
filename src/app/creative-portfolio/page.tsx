"use client"

import Link from "next/link"

export default function CreativePortfolio() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6">
        <nav className="max-w-2xl mx-auto px-6 flex justify-between items-center">
          <Link 
            href="/#projects"
            className="text-black text-base font-semibold font-serif hover:text-blue-600 transition-colors"
          >
            ← back to portfolio
          </Link>
          <div className="text-black text-base font-semibold font-serif">
            creative work
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 pt-8 pb-16">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="font-mono text-2xl font-bold mb-4 leading-tight">
            CREATIVE PORTFOLIO
          </h1>
          <p className="text-base mb-6 leading-relaxed">
            A collection of my graphic design and video editing work spanning branding, 
            promotional materials, and content creation. Each project represents a blend 
            of creativity and strategic thinking.
          </p>
        </section>

        {/* Coming Soon Notice */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide text-yellow-800 mb-3">
            PORTFOLIO UNDER CONSTRUCTION
          </h2>
          <p className="text-sm text-yellow-700 mb-4">
            I&apos;m currently curating and organizing my best creative work for this portfolio. 
            This page will feature my graphic design projects, video editing work, and brand development.
          </p>
          <div className="text-sm text-yellow-700">
            <p className="mb-2">Coming soon:</p>
            <ul className="ml-4 space-y-1">
              <li>• Brand identity projects</li>
              <li>• Video editing and motion graphics</li>
              <li>• Print and digital design work</li>
              <li>• Client case studies</li>
            </ul>
          </div>
        </section>

        {/* Creative Experience */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            CREATIVE EXPERIENCE:
          </h2>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">3+ years of graphic design experience</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">designed branding for <Link href="https://www.techplusuw.com/" target="_blank" className="text-blue-600 underline hover:text-blue-800">TechPlus UW</Link> (200+ members)</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">video content creation and editing</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span className="flex-1">proficient in Adobe Creative Suite</span>
            </li>
          </ul>
        </section>

        {/* Tools & Software */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            TOOLS & SOFTWARE:
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">
                  Design Software
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Adobe Photoshop</li>
                  <li>• Adobe Illustrator</li>
                  <li>• Figma</li>
                  <li>• Canva Pro</li>
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">
                  Video Editing
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Adobe Premiere Pro</li>
                  <li>• Adobe After Effects</li>
                  <li>• DaVinci Resolve</li>
                  <li>• CapCut</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact for Creative Work */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-blue-800 mb-3">
            INTERESTED IN WORKING TOGETHER?
          </h3>
          <p className="text-sm text-blue-700 mb-4">
            I&apos;m available for graphic design projects, video editing work, and creative consulting. 
            Let&apos;s discuss how I can help bring your vision to life.
          </p>
          <Link 
            href="mailto:svalenci@uwaterloo.ca?subject=Creative Project Inquiry"
            className="inline-flex items-center text-sm font-mono font-medium text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            GET IN TOUCH →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Sebastian Valencia. Creative portfolio coming soon.
          </p>
        </div>
      </footer>
    </div>
  )
} 