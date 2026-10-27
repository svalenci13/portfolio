import Link from "next/link"
import { HomeViewport } from "@/components/home-viewport"
import Image from "next/image"
import { SpotifyNowPlaying } from "@/components/spotify-now-playing"

import { AsciiEvolution } from "@/components/ascii-evolution"
import { AimTrainer } from "@/components/aim-trainer"
import { ShopifyLink } from "@/components/shopify-link"
import { SoccerGame } from "@/components/soccer-game"

export default function Home() {
  return (
    <HomeViewport>
      <AsciiEvolution key="content-anchored-digivolution" />
      <AimTrainer />
      <SoccerGame />
      <main className="portfolio-content">
        <header><h1>Sebastian Valencia</h1><p className="nickname">/seb / sebo/</p></header>
        <section className="intro" aria-label="About">
          <p>I work at <a className="ramp-link" href="https://ramp.com" target="_blank" rel="noreferrer"><Image src="/logos/ramp.png" alt="" width={15} height={15} className="company-logo full-color-logo" />Ramp<span className="ramp-hover-icons" aria-hidden="true">{[0, 1, 2].map(index => <span key={index} className="ramp-icon-pair"><svg style={{ animationDelay: `${0.65 + index * 0.54}s` }} className="ramp-dollar" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M8 1.5v13M11.5 4.5C10.6 2.8 4.5 2.7 4.5 6c0 3 7 1 7 4.2 0 3.2-6 3.2-7 1.3" /></svg><svg style={{ animationDelay: `${0.92 + index * 0.54}s` }} className="ramp-clock" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="5.5" /><path d="M8 4.5V8l2.5 1.5" /></svg></span>)}</span></a>.</p>
          <p>Previously Data Scientist @ <ShopifyLink />.</p>
          <p className="muted earlier">Earlier @ <a href="https://1password.com" target="_blank" rel="noreferrer"><Image src="/logos/1password.png" alt="" width={12} height={12} className="company-logo small-logo" />1Password</a>, <a href="https://www.thescore.com" target="_blank" rel="noreferrer"><Image src="/logos/thescore.jpg" alt="" width={12} height={12} className="company-logo small-logo" />theScore</a>, <a href="https://www.loblawdigital.co" target="_blank" rel="noreferrer"><Image src="/logos/loblaw-digital.jpg" alt="" width={12} height={12} className="company-logo small-logo" />Loblaw Digital</a>.</p>
          <p>Studied Math at <a className="waterloo-link" href="https://uwaterloo.ca" target="_blank" rel="noreferrer"><Image src="/logos/uwaterloo.svg" alt="" width={15} height={15} className="company-logo full-color-logo" />University of Waterloo<span className="waterloo-hover-symbols" aria-hidden="true">{["\u03b5", "\u2200", "\u03b4", "\u2211", "\u2203", "\u222b"].map((symbol, index) => <span key={symbol} style={{ animationDelay: `${0.65 + index * 0.27}s` }}>{symbol}</span>)}</span></a>.</p>
          <p>I like shaping products, with and without data.</p>
        </section>
        <section className="portfolio-section" id="projects" aria-labelledby="projects-heading">
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
        <div className="spotify-slot"><SpotifyNowPlaying /></div>
        <footer className="portfolio-footer">
          <a href="https://linkedin.com/in/svalenci" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/svalenci13" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://x.com/internetsebo" target="_blank" rel="noreferrer">X</a>

          <p className="email-address">Email: <a href="mailto:svalenci@uwaterloo.ca">svalenci [at] uwaterloo [dot] ca</a></p>
        </footer>
      </main>
    </HomeViewport>
  )
}
