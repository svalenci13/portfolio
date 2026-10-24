import Link from "next/link"
import Image from "next/image"
import { Equation } from "@/components/equation"

const players = [
  ["Goalkeeper", "Marc-André ter Stegen", 30, 35], ["Defender", "Danilo", 31, 15],
  ["Defender", "Giovanni Di Lorenzo", 29, 25], ["Defender", "Jules Koundé", 24, 60],
  ["Defender", "Alejandro Balde", 19, 50], ["Midfielder", "Vincenzo Grifo", 29, 12],
  ["Midfielder", "Mattia Zaccagni", 27, 30], ["Midfielder", "Takefusa Kubo", 21, 25],
  ["Forward", "Robert Lewandowski", 34, 30], ["Forward", "Ansu Fati", 20, 35], ["Forward", "Folarin Balogun", 21, 30],
] as const

export default function SoccerOptimization() {
  return <div className="soccer-article report-informed">
    <div className="article-shell">
      <nav className="article-top"><Link href="/#projects">← Sebastian Valencia</Link><a href="/soccer-team-optimization.pdf" target="_blank" rel="noreferrer">Original report ↗</a></nav>
      <header className="article-hero">
        <p className="article-kicker">Optimization, Operations Research · Group project</p>
        <h1>Building the best<br />value soccer team</h1>
        <p className="article-deck">We used integer programming to build a starting eleven under €350M, then tested the lineup in EA FC 24. A second, much cheaper team exposed a problem with optimizing for value alone.</p>
        <div className="article-at-a-glance"><div><span>Starting dataset</span><strong>2,500+ players</strong></div><div><span>After filtering</span><strong>~1,000 candidates</strong></div><div><span>Main budget</span><strong>€350M</strong></div></div>
        <figure className="article-banner"><Image src="/logos/wide.jpeg" alt="Soccer team optimization project" width={1200} height={420} priority /><figcaption>2022–23 player data from Europe’s five major leagues.</figcaption></figure>
      </header>
      <div className="article-layout">
        <aside className="article-contents"><span>On this page</span><a href="#question">The question</a><a href="#data">The data</a><a href="#model">The model</a><a href="#player-index">Player scores</a><a href="#lineup">The lineup</a><a href="#budgets">What money buys</a><a href="#results">Testing the lineups</a><a href="#limitations">What we learned</a></aside>
        <main className="article-body">
          <section className="article-section" id="question">
            <h2>What we set out to do</h2>
            <p>We set ourselves a €350M budget, roughly the seventh most expensive starting lineup in the Premier League at the time. The aim was to select the strongest team we could afford from Europe’s five major leagues.</p>
            <p>We also wanted to know how much each extra euro bought us. So we repeated the optimization across lower budgets and compared the resulting lineups.</p>
            <div className="report-takeaway"><span>Where it led</span><p>Our €347M lineup finished fifth in simulation. A €13.2M team had the highest score per euro, but finished bottom. That gap became the most interesting part of the project.</p></div>
          </section>
          <section className="article-section" id="data">
            <h2>The player pool</h2>
            <p>We combined 2022–23 player statistics, Transfermarkt market values, and goalkeeper data scraped from FBRef. The initial dataset covered roughly 2,500 players in the Premier League, Bundesliga, Ligue 1, Serie A, and La Liga.</p>
            <div className="report-pipeline"><div><strong>2,500+</strong><span>Players in the source data</span></div><span aria-hidden="true">→</span><div><strong>10 games + 700 minutes</strong><span>Minimum season participation</span></div><span aria-hidden="true">→</span><div><strong>~1,000</strong><span>Players eligible for the model</span></div></div>
            <p>We kept players with at least 10 appearances and 700 minutes. This reduced the pool to about 1,000 and stopped a handful of strong appearances from dominating a season-long score.</p>
          </section>
          <section className="article-section" id="model">
            <h2>Selecting the eleven</h2>
            <p>Every candidate has a performance score and a market value. We want the selected players’ scores to add up to as much as possible, without breaking the budget or leaving a position unfilled.</p>
            <div className="model-objective">
              <span className="equation-label">Maximize the team’s combined performance</span>
              <Equation tex={String.raw`\max_{x}\;\sum_{i\in S} I_i x_i`} label="Maximize the sum of the selected players' performance scores" />
              <p className="equation-notation"><span><i>Iᵢ</i> Player score</span><span><i>xᵢ</i> 1 if selected, 0 otherwise</span></p>
            </div>
            <p>The constraints make this a team-selection problem rather than a list of the highest-scoring players:</p>
            <dl className="model-constraints">
              <div><dt>Budget</dt><dd>Spend no more than €350M.</dd></div>
              <div><dt>Formation</dt><dd>1 goalkeeper, 4 defenders, 3 midfielders, 3 forwards.</dd></div>
              <div><dt>Average age</dt><dd>Between 24 and 26 years.</dd></div>
              <div><dt>Experience</dt><dd>At least 3 players aged 27+ and 3 aged 24 or younger.</dd></div>
              <div><dt>Position eligibility</dt><dd>Each player fills one eligible position, even if they can play several.</dd></div>
            </dl>
            <p>We solved this with Gurobi. The result is optimal for the score we defined and the constraints we supplied. Whether it makes a good soccer team is a separate question.</p>
            <details className="report-details"><summary>Full integer-program formulation</summary><div className="report-details-body">
              <p>The model assigns players to positions. Let x<sub>ip</sub> indicate that player i fills position p, P<sub>i</sub> be their eligible positions, and x<sub>i</sub> indicate selection. Position quotas k<sub>p</sub> are 1, 4, 3, and 3 for goalkeeper, defense, midfield, and attack.</p>
              <Equation compact tex={String.raw`\begin{aligned}
                \max\quad & \sum_{i\in S} I_i x_i \\
                \text{subject to}\quad & x_i = \sum_{p\in P_i}x_{ip} && \forall i\in S \\
                & \sum_{p\in P_i}x_{ip}\leq 1 && \forall i\in S \\
                & \sum_{i\in P_p}x_{ip}=k_p && \forall p \\
                & \sum_{i\in S}m_i x_i\leq 350{,}000{,}000 \\
                & 264\leq\sum_{i\in S}a_i x_i\leq 286 \\
                & \sum_{i:a_i\geq27}x_i\geq3,\qquad\sum_{i:a_i\leq24}x_i\geq3 \\
                & x_{ip}\in\{0,1\}
              \end{aligned}`} label="Full binary integer program for lineup selection" />
              <p className="article-note">mᵢ is market value and aᵢ is age. The total-age limits, 264 and 286, are 11 × 24 and 11 × 26. All position sums include eligible player-position pairs only.</p>
            </div></details>
          </section>
          <section className="article-section" id="player-index">
            <h2>How we scored players</h2>
            <p>We adapted the player-performance index from McHale, Scarf, and Folker (2012). We averaged statistics over a season and left out its predictive component, which would have required simulating game events for every player.</p>
            <p>The remaining score rewards playing time, team points, goals, assists, and clean sheets. Clean sheets carry more weight for goalkeepers and defenders.</p>
            <div className="report-table-wrap"><table className="report-table"><caption>What goes into the player index</caption><thead><tr><th>Signal</th><th>Contribution</th><th>Coefficient</th></tr></thead><tbody><tr><td>I₁ · Team points contribution</td><td>Minutes played × team points.</td><td>0.375</td></tr><tr><td>I₂ · Minutes contribution</td><td>Minutes played, independent of team points.</td><td>0.125</td></tr><tr><td>I₃ · Goals</td><td>Goals scored.</td><td>0.125</td></tr><tr><td>I₄ · Assists</td><td>Goals assisted.</td><td>0.0625</td></tr><tr><td>I₅ · Clean sheets</td><td>Games without conceding; weighted by position.</td><td>0.0625</td></tr></tbody></table></div>
            <div className="index-equation"><Equation compact tex={String.raw`I_{\mathrm{player}}=100\left(0.375I_1+0.125I_2+0.125I_3+0.0625I_4+0.0625I_5\right)`} label="Weighted player performance index" /><p className="article-note">We retained the coefficients from the published index. They were not fitted to our dataset.</p></div>
            <details className="report-details"><summary>The five sub-score equations</summary><div className="report-details-body"><p>Let min<sub>p</sub> be average minutes played per game and points<sub>avg</sub> the team’s average points per game. The denominator 90 × 11 is the total player-minutes in a full match.</p><div className="report-equation-list"><div><span>Team points</span><code>I₁ = min<sub>p</sub> / (90 × 11) × points<sub>avg</sub></code></div><div><span>Participation</span><code>I₂ = min<sub>p</sub> / (90 × 11) × 1.34</code></div><div><span>Goals</span><code>I₃ = goals × 1.039</code></div><div><span>Assists</span><code>I₄ = assists × 1.039</code></div><div><span>Clean sheets</span><code>I₅ = clean-sheets × weight<sub>p</sub></code></div></div><p>Clean-sheet weights are 0.585 for goalkeepers, 0.365 for defenders, 0.15 for midfielders, and 0.071 for forwards. Goal-related inputs follow the report’s season-averaged adaptation.</p><p className="article-note">The retained coefficients sum to 0.75 after removing the predictive component. We preserve the report’s formula; its scale is not a normalized percentage or a score out of 100.</p></div></details>
            <p className="article-note">Reference: McHale, Scarf &amp; Folker, “On the Development of a Soccer Player Performance Rating System for the English Premier League,” Interfaces 42 (2012), 339–351. See the original report for its bibliography.</p>
          </section>
          <section className="article-section" id="lineup">
            <h2>The selected lineup</h2>
            <p>The selected players cost €347M in total. Using the ages in the report’s solver output, the average is about 25.9 years, within the allowed 24–26 range.</p>
            <figure className="report-figure"><Image src="/logos/team.png" alt="Selected players in the project's 4-3-3 formation" width={600} height={400} /><figcaption>The selected eleven, shown in a 4-3-3 formation. The model itself uses broad position groups.</figcaption></figure>
            <div className="report-table-wrap"><table className="report-table"><caption>From the report’s solver output, Appendix Figure 2</caption><thead><tr><th>Position</th><th>Player</th><th>Age</th><th>Value</th></tr></thead><tbody>{players.map(([position, name, age, value]) => <tr key={name}><td>{position}</td><td>{name}</td><td>{age}</td><td>€{value}M</td></tr>)}</tbody><tfoot><tr><td colSpan={3}>Total market value</td><td>€347M</td></tr></tfoot></table></div>
            <p className="article-note">The appendix lists Balde at €50M; one paragraph in the report says €60M. This table follows the solver output, which reconciles to the €347M total.</p>
          </section>
          <section className="article-section" id="budgets">
            <h2>Varying the budget</h2>
            <p>With no spending limit, the model selected a €710M team. Raising the budget further would not improve its score. We worked downward from there to find the spending levels where the optimal team changes.</p>
            <ol className="report-steps"><li>Solve the model and record the lineup’s cost.</li><li>Set the next budget to that cost minus €1,000.</li><li>Replace the previous budget constraint and solve again.</li><li>Repeat until no feasible lineup exists.</li></ol>
            <p>All market values were multiples of €1,000, so the decrement excludes the current spending level without skipping a possible lower one. This produced 347 budget ranges. Replacing the old budget constraint, rather than accumulating new ones, cut the reported runtime from about 60 to 20 seconds.</p>
            <figure className="report-figure report-chart"><Image src="/projects/soccer/budget-frontier.png" alt="Optimal team index increases with budget, with smaller improvements at higher budgets" width={552} height={431} /><figcaption>Report Figure 5. More money improves the model’s score, but the gains diminish.</figcaption></figure>
            <details className="report-details"><summary>Budget-sweep pseudocode</summary><pre className="report-code">{`solve without a budget limit
while the model is feasible:
    record selected team, score, and cost
    next_budget = selected_team_cost - 1,000
    replace the budget constraint with cost ≤ next_budget
    solve again`}</pre></details>
            <p>We described this extension as “cutting planes” in the report. The procedure is a sequence of tighter budget constraints, each followed by another solve.</p>
            <figure className="report-figure report-chart"><Image src="/projects/soccer/value-per-euro.png" alt="The ratio of optimal index to cost is highest at the low-budget end" width={786} height={616} /><figcaption>Report Figure 7. Dividing score by cost favors a much cheaper lineup.</figcaption></figure>
          </section>
          <section className="article-section" id="results">
            <h2>Testing the lineups</h2>
            <p>We put the main lineup into Luton Town in EA FC 24 manager career mode. We controlled the starting lineup, simulated the following season, and used the existing, weaker substitutes when selected players were injured.</p>
            <div className="report-results"><div><strong>5th / 20</strong><span>Simulated Premier League finish</span></div><div><strong>13</strong><span>Clean sheets</span></div><div><strong>€347M</strong><span>Selected lineup cost</span></div></div>
            <div className="report-player-note"><Image src="/logos/take.png" alt="Takefusa Kubo" width={64} height={64} /><p>Kubo played every match and led the team in goals and assists. Lewandowski contributed 11 goals and 5 assists, below his previous season’s output.</p></div>
            <div className="report-takeaway"><span>The cheaper team</span><p>The highest index-per-euro lineup cost only €13.2M. In simulation it finished bottom, and the manager was fired. The score-per-euro ratio favored a low price more than the level of performance needed to compete.</p></div>
            <p>EA FC 24 gave us a way to try the teams, but one simulated season cannot tell us how they would perform in real life. We did not test the index against an independent set of actual match results.</p>
          </section>
          <section className="article-section" id="limitations">
            <h2>Where the model falls short</h2>
            <div className="report-rule-list"><div><strong>Use actual roles, not just position groups</strong><p>A forward who is also eligible at midfield can be selected there because of scoring stats, even if their real midfield contribution is weak. Center-back, full-back, winger, and striker need more specific treatment.</p></div><div><strong>Account for league strength</strong><p>The same statistics can mean different things in different competitions. League adjustment is a proposed improvement, not part of the implemented player index.</p></div><div><strong>Model combinations, not just individuals</strong><p>Team chemistry, passing interactions, coaching, and adaptation to transfers are missing. Summing good individual scores does not guarantee a good team.</p></div><div><strong>Broaden the scouting pool</strong><p>Lower divisions and leagues outside Europe’s top five may contain undervalued players that this dataset cannot discover.</p></div></div>
            <p>The first change I would make is more precise position data. The model can find the best answer to the problem we give it, but broad eligibility rules let it put the wrong kind of player in a role.</p>
          </section>
          <section className="article-section" id="sources"><h2>Project notes</h2><p>Python, Gurobi, Pandas, and NumPy for the model and data work. EA FC 24 for the simulation.</p><p>Built with Hadas Barabash, Misha Melnyk, David Lascu, Sebastian Valencia, and Shamar Phillips.</p><ul className="report-source-list"><li><a href="https://www.kaggle.com/datasets/vivovinco/20222023-football-player-stats" target="_blank" rel="noreferrer">2022–23 player statistics</a></li><li><a href="https://www.kaggle.com/datasets/davidcariboo/player-scores" target="_blank" rel="noreferrer">Transfermarkt market values</a></li><li><a href="https://fbref.com/en/comps/Big5/2022-2023/keepersadv/players/2022-2023-Big-5-European-Leagues-Stats" target="_blank" rel="noreferrer">FBRef goalkeeper statistics</a></li><li><a href="/soccer-team-optimization.pdf" target="_blank" rel="noreferrer">Original report, with full formulation, figures, and references</a></li></ul></section>
          <footer className="article-end"><Link href="/#projects">← Back to projects</Link><a href="/soccer-team-optimization.pdf" target="_blank" rel="noreferrer">Read the original report ↗</a></footer>
        </main>
      </div>
    </div>
  </div>
}


