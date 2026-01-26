import Link from "next/link"
import Image from "next/image"

type Project = {
  title: string
  description: string
  link: string
  image: string
  tag: string
  tagColor: string
}

const projects: Project[] = [
  {
    title: "Building Best Value Soccer Team",
    description: "Integer programming to select optimal 11-player lineup within budget",
    link: "/projects/soccer-optimization",
    image: "/logos/wide.jpeg",
    tag: "OPTIMIZATION",
    tagColor: "text-green-600 border-green-200 bg-green-50",
  },
  {
    title: "Lyft Express Drive Analysis",
    description: "BI dashboard analyzing Express Drive health metrics",
    link: "/projects/lyft-express-drive-dashboard",
    image: "/logos/lyft.png",
    tag: "ANALYTICS",
    tagColor: "text-blue-600 border-blue-200 bg-blue-50",
  },
  {
    title: "Kalshi VS Polymarket Dashboard",
    description: "Prediction market comparison tool",
    link: "https://www.kalshivspolymarket.com",
    image: "/logos/kalshi.png",
    tag: "WEBSITE",
    tagColor: "text-yellow-600 border-yellow-200 bg-yellow-50",
  },
  {
    title: "Creative Portfolio",
    description: "Collection of creative work, logos, and video editing",
    link: "/creative-portfolio",
    image: "/logos/goated.jpg",
    tag: "CREATIVE",
    tagColor: "text-purple-600 border-purple-200 bg-purple-50",
  }
]

export function ProjectsCarousel() {
  return (
    <div className="mb-6" id="projects">
      <h2 className="font-mono text-xs font-semibold uppercase tracking-wide mb-3">
        PROJECTS:
      </h2>
      
      <div className="grid grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.link}
            target={project.link.startsWith('http') ? "_blank" : "_self"}
            className="block border border-gray-200 rounded p-2 hover:bg-gray-50 transition-colors flex flex-col"
          >
            <div className={`w-full h-14 border border-gray-200 rounded mb-2 overflow-hidden flex items-center justify-center ${
              project.image === "/logos/lyft.png" ? "" : "bg-white"
            }`}
            style={project.image === "/logos/lyft.png" ? { backgroundColor: "#ff00bf" } : {}}
            >
              <Image 
                src={project.image} 
                alt={project.title}
                width={100}
                height={56}
                className={`${
                  project.image === "/logos/lyft.png" 
                    ? "w-auto h-8 object-contain" 
                    : "w-full h-full object-cover"
                }`}
                unoptimized
              />
            </div>
            <h3 className="text-[11px] text-gray-700 mb-1.5 leading-tight text-center">{project.title}</h3>
            <div className="mt-auto flex justify-center">
              <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded border font-mono ${project.tagColor}`}>
                {project.tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 