"use client"

import Link from "next/link"
import Image from "next/image"

export default function CreativePortfolio() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6">
        <nav className="max-w-2xl mx-auto px-6 flex justify-between items-center">
          <Link 
            href="/#projects"
            className="text-black text-base font-semibold font-mono hover:text-blue-600 transition-colors"
          >
            ← back to portfolio
          </Link>
          <div className="text-black text-base font-semibold font-mono">
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
            A collection of my graphic design and video editing work spanning podcastbranding, 
            promotional materials, and content creation. Each project represents a blend 
            of creativity and strategic thinking.
          </p>
        </section>

        {/* Creative Work */}
        <section className="mb-12">
          {/* Club Graphics Section */}
          <div className="mb-10">
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
              Club Graphics & Branding
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <Image 
                  src="/logos/graphic1.JPG" 
                  alt="Club graphic design 1"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <Image 
                  src="/logos/graphic2.JPG" 
                  alt="Club graphic design 2"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <Image 
                  src="/logos/graphic3.JPG" 
                  alt="Club graphic design 3"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <Image 
                  src="/logos/graphic4.JPG" 
                  alt="Club graphic design 4"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <Image 
                  src="/logos/graphic5.png" 
                  alt="Club graphic design 5"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Club Video */}
            <div className="mb-6">
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/Jfib2vEeEqs" 
                    title="CxC III - Data Science Hackathon Promotional Video"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-3">
                  <h5 className="font-mono text-xs font-semibold text-gray-800 mb-1">CxC III Hackathon</h5>
                  <p className="text-xs text-gray-600">Data Science Competition Promotional Video</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Graphics Section */}
          <div className="mb-10">
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
              Personal Design Work
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <Image 
                  src="/logos/graphicpersonal1.png" 
                  alt="Personal graphic design 1"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <Image 
                  src="/logos/graphicpersonal2.png" 
                  alt="Personal graphic design 2"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Podcast Content Creation */}
          <div className="mb-10">
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
              Podcast Content & Framework
            </h3>
            
            {/* Framework Overview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-blue-800 mb-3">
                Content Creation Framework
              </h4>
              <p className="text-sm text-blue-700 mb-3">
                Developed a consistent visual framework for podcast episodes, including episode graphics, 
                promotional materials, and YouTube thumbnails. Each episode follows the same design system 
                while maintaining unique content.
              </p>
              <div className="text-sm text-blue-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="font-semibold">• Brand Consistency:</span><br/>
                    Unified color scheme and typography
                  </div>
                  <div>
                    <span className="font-semibold">• Template System:</span><br/>
                    Scalable design framework
                  </div>
                  <div>
                    <span className="font-semibold">• Content Strategy:</span><br/>
                    Episode-specific adaptations
                  </div>
                </div>
              </div>
            </div>

            {/* Design Framework Examples */}
            <div className="mb-6">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">
                Design Framework Examples
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Rather than showing all 10+ graphics, here are key examples that demonstrate 
                the consistent framework and design system used across all podcast content.
              </p>
              
              {/* Framework Template */}
              <div className="mb-6">
                <h5 className="font-mono text-xs font-semibold text-gray-700 mb-2">Master Template Framework</h5>
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <Image 
                    src="/logos/datedenframework.jpg" 
                    alt="The Data Den podcast design framework template"
                    width={600}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Core template system used across all episodes, maintaining consistent branding while allowing for guest-specific customization.
                </p>
              </div>

              {/* Applied Examples */}
              <div className="mb-6">
                <h5 className="font-mono text-xs font-semibold text-gray-700 mb-2">Framework in Action</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                    <Image 
                      src="/logos/dataden1.jpg" 
                      alt="Data Den episode graphic example 1"
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                    <Image 
                      src="/logos/dataden2.jpg" 
                      alt="Data Den episode graphic example 2"
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Examples showing how the framework adapts for different guests while maintaining visual consistency 
                  and brand recognition across the entire podcast series.
                </p>
              </div>
            </div>

            {/* YouTube Content */}
            <div>
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">
                &ldquo;The Data Den&rdquo; Podcast Snippets
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Created promotional snippets and content for &ldquo;The Data Den&rdquo; podcast featuring industry professionals 
                in data science and engineering. Each snippet showcases key insights from full episodes.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="200" 
                    src="https://www.youtube.com/embed/wAgJ2v8kY0U" 
                    title="Amy Tai - Applied Scientist Snippet"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="w-full"
                  ></iframe>
                  <div className="p-3">
                    <h5 className="font-mono text-xs font-semibold text-gray-800 mb-1">Amy Tai</h5>
                    <p className="text-xs text-gray-600">Applied Scientist</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="200" 
                    src="https://www.youtube.com/embed/3EXRBsWQY_o" 
                    title="Adi Ravichandran - SR SWE Snippet"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="w-full"
                  ></iframe>
                  <div className="p-3">
                    <h5 className="font-mono text-xs font-semibold text-gray-800 mb-1">Adi Ravichandran</h5>
                    <p className="text-xs text-gray-600">Senior Software Engineer</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="200" 
                    src="https://www.youtube.com/embed/ruYr_Uooa8k" 
                    title="Navya Mehta - Founding Engineer Snippet"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="w-full"
                  ></iframe>
                  <div className="p-3">
                    <h5 className="font-mono text-xs font-semibold text-gray-800 mb-1">Navya Mehta</h5>
                    <p className="text-xs text-gray-600">Founding Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 