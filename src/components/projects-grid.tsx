import Link from "next/link"

const projects = [
  {
    title: "Creative Portfolio",
    description: "Graphic design, video editing & visual storytelling",
    category: "Design",
    link: "https://your-creative-portfolio.com",
    image: "/logos/techplus.png",
    featured: true
  },
  {
    title: "Full-Stack App",
    description: "Modern web application built with React & Node.js",
    category: "Development", 
    link: "https://your-project.com",
    image: "/logos/uwdsc.png",
    featured: true
  },
  {
    title: "Data Dashboard",
    description: "Interactive analytics and visualization platform",
    category: "Data",
    link: "https://your-dashboard.com", 
    image: "/logos/loblaw-digital.jpg",
    featured: false
  },
  {
    title: "E-commerce Site",
    description: "Custom shopping platform with payment integration",
    category: "Development",
    link: "https://your-ecommerce.com",
    image: "/logos/thescore.png",
    featured: false
  }
]

export function ProjectsGrid() {
  return (
    <div className="mb-10">
      <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
        FEATURED PROJECTS:
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.link}
            target="_blank"
            className="group block bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors"
          >
            {/* Project Image */}
            <div className="aspect-video bg-white border-b border-gray-200">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Project Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wide text-gray-500 bg-white px-2 py-1 rounded border">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-xs font-mono uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                    Featured
                  </span>
                )}
              </div>
              
              <h3 className="font-mono text-base font-semibold mb-2 text-black group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-sm text-gray-600 leading-relaxed">
                {project.description}
              </p>
              
              <div className="mt-3 flex items-center text-xs font-mono font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                VIEW PROJECT 
                <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* View All Projects Link */}
      <div className="mt-6 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-mono font-medium text-gray-600 hover:text-black transition-colors border-b border-gray-300 hover:border-black"
        >
          VIEW ALL PROJECTS
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
} 