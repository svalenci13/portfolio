import Link from "next/link"

const evolutions = [String.raw`
                   __
                __/  \__
              /   o     \
             /       ___/
             \  ___  /
          ___/      /
         /   \    /\
        /  /  \__/  \
       /__/          \__
      /  /    __      __\
     /__/    /  \    /
        \___/    \__/
        /  /      \ \
       /__/        \_\
      /_/_/        \_\_\
`, String.raw`
                      /\    /\
                  ___/  \__/  \
                _/   /\        \___
               /    /  \   o       \
              /____/    \      ____/
                  /      \____/
             ____/   /\      \
            /  /    /  \      \___
           /__/    /    \      ___/>
          /  /    /      \    /
     ____/  /    /        \__/\
    /      /    /             \
   /______/    /   ___         \
          \___/   /   \    ___/
            /    /     \   \
          _/____/       \___\
         /_/_/_/        \_\_\
`, String.raw`
             /|                              |\
            / |           /\  /\             | \
           /  |       ___/  \/  \__          |  \
          / / |      /  /\  __     \___      | \ \
         / /| |     /__/  \[__] o      \     | |\ \
        / / | |         /  \      ____/      | | \ \
       /_/  | |     ___/ /\  \____/          | |  \_\
            | |   _/###\/  \     \___        | |
            | | _/####/    /      /==\___    | |
            | |/####/    _/      /========\__| |
            | /###/    _/   ___  \=========/  |
            |/###/   _/    /   \  \______/|   |
           /####/___/     /     \       / |___|
          /####/  /     _/       \     /
         /____/__/   __/     /\   \___/\
         /==/       /      /  \        \
        /==/       /      /    \        \____
       /==/    ___/      /      \           _\
      /__/    /   \____/        \____   __/
             /____/                 /___\
            /_/_/_/                /_/_/_/
`]

function AsciiEvolution() {
  return <div className="ascii-evolution" aria-hidden="true">{evolutions.map((art, i) => <pre key={i} className={`evolution-stage evolution-${i}`}>{art}</pre>)}</div>
}

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
            <li><a href="https://www.kalshivspolymarket.com" target="_blank" rel="noreferrer">Kalshi vs. Polymarket</a><span className="muted"> — comparing prediction markets</span></li>
            <li><Link href="/projects/soccer-optimization">Best value soccer team</Link><span className="muted"> — lineup optimization</span></li>
            <li><Link href="/creative-portfolio">Creative work</Link><span className="muted"> — design &amp; video</span></li>
          </ul>
        </section>
        <section className="portfolio-section" aria-labelledby="writing-heading">
          <h2 id="writing-heading">writing</h2>
          <ul><li><a href="https://1sebstack.substack.com/p/how-linearization-fixes-the-ratio" target="_blank" rel="noreferrer">How linearization fixes the ratio</a></li></ul>
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

