import Link from "next/link"

const projects = [
  { title: "Kalshi vs. Polymarket", description: "A comparison tool for prediction markets.", href: "https://www.kalshivspolymarket.com", label: "website" },
  { title: "Building the best value soccer team", description: "Finding the optimal 11-player lineup within a budget using integer programming.", href: "/projects/soccer-optimization", label: "optimization" },
  { title: "Lyft Express Drive", description: "A dashboard exploring the health of Lyft’s Express Drive program.", href: "/projects/lyft-express-drive-dashboard", label: "analytics" },
  { title: "Creative work", description: "Graphic design, logos, and video editing.", href: "/creative-portfolio", label: "design" },
]

// Deterministic, decorative character field. No animation or client-side work.
function AsciiBackground() {
  const rows = Array.from({ length: 64 }, (_, y) =>
    Array.from({ length: 160 }, (_, x) => {
      const wave = Math.sin(x * .065) * 10 + 31
      const distance = Math.abs(y - wave)
      const grain = (x * 73 + y * 31) % 101
      if (distance < 2.2 && grain > 25) return ":+x%#"[(x + y) % 5]
      if (distance < 6 && grain > 78) return ".:-"[(x + y) % 3]
      return grain > 98 ? "." : " "
    }).join("")
  ).join("\n")
  return <div className="ascii-background" aria-hidden="true"><pre>{rows}</pre></div>
}

export default function Home() {
  return (
    <div className="portfolio-home">
      <AsciiBackground />
      <main className="portfolio-content" id="about">
        <header className="portfolio-header">
          <h1>sebastian valencia</h1>
          <p className="portfolio-subtitle">data, products & a few other things.</p>
          <nav aria-label="Main navigation">
            <a href="#about">about</a><a href="#projects">projects</a><Link href="/creative-portfolio">creative</Link><Link href="/blog">writing</Link>
          </nav>
        </header>
        <section className="portfolio-intro" aria-label="About me">
          <p>Hey, I’m Sebastian. I work with data and build things.</p>
          <p>I want to learn and grow as much as possible. Open to product data science opportunities — <a href="https://linkedin.com/in/svalenci" target="_blank" rel="noreferrer">let’s talk</a>.</p>
        </section>
        <section className="portfolio-section" aria-labelledby="experience-heading">
          <h2 id="experience-heading">where I’ve been</h2>
          <div className="experience-list">
            <p>Data Scientist at <a href="https://www.shopify.com" target="_blank" rel="noreferrer">Shopify</a><span className="experience-note">previously, Software Developer</span></p>
            <p>Data Analyst at <a href="https://1password.com" target="_blank" rel="noreferrer">1Password</a> & <a href="https://www.thescore.com" target="_blank" rel="noreferrer">theScore</a></p>
            <p>Growth Analyst at <a href="https://www.loblawdigital.co" target="_blank" rel="noreferrer">Loblaw Digital</a></p>
            <p>Full Stack Developer at <a href="https://www.loblaw.ca" target="_blank" rel="noreferrer">Loblaw Companies</a></p>
            <p>Data Analyst at <a href="https://www.ttc.ca" target="_blank" rel="noreferrer">TTC</a></p>
          </div>
          <p className="portfolio-aside">Also: President at <a href="https://www.uwdatascience.ca" target="_blank" rel="noreferrer">UW Data Science Club</a> and Logistics Lead at <a href="https://www.techplusuw.com" target="_blank" rel="noreferrer">Tech+ UW</a>.</p>
        </section>
        <section className="portfolio-section" id="projects" aria-labelledby="projects-heading">
          <h2 id="projects-heading">selected projects</h2>
          <div className="simple-projects">
            {projects.map(project => <Link className="simple-project" key={project.href} href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined}>
              <div className="project-title"><h3>{project.title}</h3><span aria-hidden="true">↗</span></div>
              <p>{project.description}</p><span className="project-label">{project.label}</span>
            </Link>)}
          </div>
        </section>
        <footer className="portfolio-footer">
          <div><a href="https://github.com/svalenci13" target="_blank" rel="noreferrer">github</a><a href="https://linkedin.com/in/svalenci" target="_blank" rel="noreferrer">linkedin</a><a href="mailto:svalenci@uwaterloo.ca">email</a></div>
          <a className="email-address" href="mailto:svalenci@uwaterloo.ca">svalenci@uwaterloo.ca</a>
        </footer>
      </main>
    </div>
  )
}

