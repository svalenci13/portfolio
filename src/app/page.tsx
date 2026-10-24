import Link from "next/link"

import { AsciiEvolution } from "@/components/ascii-evolution"

export default function Home() {
  return (
    <div className="portfolio-home">
      <AsciiEvolution />
      <main className="portfolio-content">
        <header><h1>Sebastian Valencia</h1><p className="nickname">/sebo/</p></header>
        <section className="intro" aria-label="About">
          <p>I work at <a href="https://ramp.com" target="_blank" rel="noreferrer">Ramp</a>.</p>
          <p>Previously Data Scientist @ <a href="https://www.shopify.com" target="_blank" rel="noreferrer">Shopify</a>.</p>
          <p className="muted earlier">Before that: software @ Shopify; data @ 1Password &amp; theScore; growth @ Loblaw Digital; dev @ Loblaw; data @ TTC.</p>
          <p>I like working with data and building things.</p>
        </section>
        <section className="portfolio-section" aria-labelledby="projects-heading">
          <h2 id="projects-heading">projects</h2>
          <ul>
            <li><a href="https://www.kalshivspolymarket.com" target="_blank" rel="noreferrer">Comparing prediction markets: Kalshi vs. Polymarket</a></li>
            <li><Link href="/projects/soccer-optimization">Using optimization and integer programming to pick the best soccer lineup</Link></li>
          </ul>
        </section>
        <section className="portfolio-section" aria-labelledby="writing-heading">
          <h2 id="writing-heading">writing</h2>
          <ul><li><a href="https://1sebstack.substack.com/p/how-linearization-fixes-the-ratio" target="_blank" rel="noreferrer">Why Ratio Metrics Break A/B Tests and How Linearization Fixes It</a></li></ul>
        </section>
        <footer className="portfolio-footer">
          <a href="https://github.com/svalenci13" target="_blank" rel="noreferrer">github</a>
          <a href="https://linkedin.com/in/svalenci" target="_blank" rel="noreferrer">linkedin</a>
          <a href="mailto:svalenci@uwaterloo.ca">email</a>
        </footer>
      </main>
    </div>
  )
}


