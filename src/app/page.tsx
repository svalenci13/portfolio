import Link from "next/link"
import Image from "next/image"
import { SpotifyNowPlaying } from "@/components/spotify-now-playing"

import { AsciiEvolution } from "@/components/ascii-evolution"

export default function Home() {
  return (
    <div className="portfolio-home">
      <AsciiEvolution key="content-anchored-digivolution" />
      <main className="portfolio-content">
        <header><h1>Sebastian Valencia</h1><p className="nickname">/sebo / seb/</p></header>
        <section className="intro" aria-label="About">
          <p>I work at <a href="https://ramp.com" target="_blank" rel="noreferrer"><Image src="/logos/ramp.png" alt="" width={15} height={15} className="company-logo full-color-logo" />Ramp</a>.</p>
          <p>Previously Data Scientist @ <a href="https://www.shopify.com" target="_blank" rel="noreferrer"><Image src="/logos/shopify.JPG" alt="" width={15} height={15} className="company-logo" />Shopify</a>.</p>
          <p className="muted earlier">Earlier @ <a href="https://1password.com" target="_blank" rel="noreferrer"><Image src="/logos/1password.png" alt="" width={12} height={12} className="company-logo small-logo" />1Password</a>, <a href="https://www.thescore.com" target="_blank" rel="noreferrer"><Image src="/logos/thescore.jpg" alt="" width={12} height={12} className="company-logo small-logo" />theScore</a>, <a href="https://www.loblawdigital.co" target="_blank" rel="noreferrer"><Image src="/logos/loblaw-digital.jpg" alt="" width={12} height={12} className="company-logo small-logo" />Loblaw Digital</a>.</p>
          <p>Studied Math at <a href="https://uwaterloo.ca" target="_blank" rel="noreferrer"><Image src="/logos/uwaterloo.svg" alt="" width={15} height={15} className="company-logo full-color-logo" />UWaterloo</a>.</p>
          <p>I like shaping products, with and without data.</p>
        </section>
        <section className="portfolio-section" aria-labelledby="projects-heading">
          <h2 id="projects-heading">Projects</h2>
          <ul className="project-entries">
            <li><Link href="/projects/soccer-optimization">Building the Best Value Soccer Team</Link><span className="project-theme">Optimization, Operations Research</span></li>
            <li><a href="https://www.kalshivspolymarket.com" target="_blank" rel="noreferrer">Kalshi vs. Polymarket</a><span className="project-theme">Dashboard</span></li>
          </ul>
        </section>
        <section className="portfolio-section" aria-labelledby="writing-heading">
          <h2 id="writing-heading">Writing</h2>
          <ul><li><a href="https://1sebstack.substack.com/p/how-linearization-fixes-the-ratio" target="_blank" rel="noreferrer">Why Ratio Metrics Break A/B Tests and How Linearization Fixes It</a><span className="project-theme">Experimentation, Statistics</span></li></ul>
        </section>
        <SpotifyNowPlaying />
        <footer className="portfolio-footer">
          <a href="https://github.com/svalenci13" target="_blank" rel="noreferrer">github</a>
          <a href="https://linkedin.com/in/svalenci" target="_blank" rel="noreferrer">linkedin</a>
          <a href="mailto:svalenci@uwaterloo.ca">email</a>
        </footer>
      </main>
    </div>
  )
}












