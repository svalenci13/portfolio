import Link from "next/link"

const projects = [
  { name: "project1.com", description: "description of what it does", href: "#" },
  { name: "project2.app", description: "another cool project", href: "#" },
  { name: "project3.dev", description: "open source tool", href: "#" },
  { name: "project4.io", description: "saas platform", href: "#" }
]

export function ProjectList() {
  return (
    <ul className="space-y-2 ml-4">
      {projects.map((project, index) => (
        <li key={index} className="flex items-start text-sm">
          <span className="text-black font-bold mr-3 mt-0.5">•</span>
          <span className="flex-1">
            <Link 
              href={project.href} 
              target="_blank" 
              className="font-medium text-blue-600 underline hover:text-blue-800"
            >
              {project.name}
            </Link>
            {" - "}
            {project.description}
          </span>
        </li>
      ))}
    </ul>
  )
} 