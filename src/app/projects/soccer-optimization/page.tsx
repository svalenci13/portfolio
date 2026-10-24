import Link from "next/link"
import Image from "next/image"

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
        <h1>Building the best<br />value soccer team.</h1>
        <p className="article-deck">How do you choose 11 players when you can’t afford everyone? We built an integer program to make those tradeoffs explicit, then tested what “best value” actually means.</p>
        <div className="article-at-a-glance"><div><span>Starting dataset</span><strong>2,500+ players</strong></div><div><span>After filtering</span><strong>~1,000 candidates</strong></div><div><span>Main budget</span><strong>€350M</strong></div></div>
        <figure className="article-banner"><Image src="/logos/wide.jpeg" alt="Soccer team optimization project" width={1200} height={420} priority /><figcaption>2022–23 player data from Europe’s five major leagues.</figcaption></figure>
      </header>
      <div className="article-layout">
        <aside className="article-contents"><span>On this page</span><a href="#question">The question</a><a href="#data">The data</a><a href="#model">The model</a><a href="#player-index">Player scores</a><a href="#lineup">The lineup</a><a href="#budgets">What money buys</a><a href="#results">The reality check</a><a href="#limitations">What we learned</a></aside>
        <main className="article-body">
          <section className="article-section" id="question">
            <h2>Two ways to mean “best value”</h2>
            <p>A team can have the best performance you can afford, or the most performance per euro. Those are different objectives. Our main model tackles the first: choose the highest-scoring feasible lineup within a €350M budget.</p>
            <p>We then vary the budget to study the second. That produces the most useful result in the project: the cheapest-looking efficiency win is not necessarily a competitive soccer team.</p>
            <div className="report-takeaway"><span>The finding</span><p>The €350M-budget lineup finished fifth in our EA FC 24 simulation. The €13.2M lineup with the highest score per euro finished bottom. Optimizing a metric is not the same as optimizing the real outcome.</p></div>
          </section>
          <section className="article-section" id="data">
            <h2>Start with players who actually played</h2>
            <p>We combined 2022–23 player statistics, Transfermarkt market values, and goalkeeper data scraped from FBRef. The initial dataset covered roughly 2,500 players in the Premier League, Bundesliga, Ligue 1, Serie A, and La Liga.</p>
            <div className="report-pipeline"><div><strong>2,500+</strong><span>Players in the source data</span></div><span aria-hidden="true">→</span><div><strong>10 games + 700 minutes</strong><span>Minimum season participation</span></div><span aria-hidden="true">→</span><div><strong>~1,000</strong><span>Players eligible for the model</span></div></div>
            <p>The filter removes small-sample outliers: a player with a few excellent appearances should not automatically outrank someone who performed over a full season.</p>
          </section>
          <section className="article-section" id="model">
            <h2>Pick players, then check the rules</h2>
            <p className="math-lead">Imagine a checkbox beside each player. The model ticks the 11 boxes with the highest combined score, while staying within the budget and filling every position.</p>
            <div className="math-key"><h3>The short version</h3><dl><div><dt>xᵢ</dt><dd>1 if player i is selected; 0 if not.</dd></div><div><dt>Iᵢ</dt><dd>The player’s performance score.</dd></div><div><dt>mᵢ</dt><dd>The player’s market value in euros.</dd></div></dl><p className="article-note">Σ means “add up.” Multiplying by xᵢ includes the selected players and contributes zero for everyone else.</p></div>
            <div className="math-objective"><span className="math-eyebrow">What to maximize</span><h3>The selected players’ total score</h3><div className="math-formula">Maximize ∑<sub>i∈S</sub> I<sub>i</sub>x<sub>i</sub></div><p>Three selected players with scores of 82, 76, and 91 contribute 249 points. The solver evaluates the combined score of a full lineup.</p></div>
            <div className="report-rule-list"><div><strong>Budget</strong><p>Total market value ≤ €350M.</p></div><div><strong>Formation</strong><p>Exactly 1 goalkeeper, 4 defenders, 3 midfielders, and 3 forwards.</p></div><div><strong>Average age</strong><p>Between 24 and 26 years.</p></div><div><strong>Age diversity</strong><p>At least 3 players aged 27+ and at least 3 aged 24 or younger.</p></div><div><strong>No double counting</strong><p>A player eligible for multiple positions can fill only one slot.</p></div></div>
            <details className="report-details"><summary>The full formulation, with position assignments</summary><div className="report-details-body"><p>The actual decision is x<sub>ip</sub>: select player i in position p. P<sub>i</sub> is that player’s eligible position set, and x<sub>i</sub> = ∑<sub>p∈Pᵢ</sub> x<sub>ip</sub>. This matters because a forward/midfielder must not be selected twice.</p><div className="report-equation-list"><div><span>One slot per player</span><code>∑<sub>p∈Pᵢ</sub> x<sub>ip</sub> ≤ 1</code></div><div><span>Position counts</span><code>∑<sub>i∈Pₚ</sub> x<sub>ip</sub> = k<sub>p</sub>, &nbsp;k = (1, 4, 3, 3)</code></div><div><span>Budget</span><code>∑<sub>i∈S</sub> m<sub>i</sub>x<sub>i</sub> ≤ B, &nbsp;B = €350M</code></div><div><span>Average age</span><code>264 ≤ ∑<sub>i∈S</sub> age<sub>i</sub>x<sub>i</sub> ≤ 286</code></div><div><span>Experience</span><code>∑<sub>i: ageᵢ≥27</sub> x<sub>i</sub> ≥ 3</code></div><div><span>Youth</span><code>∑<sub>i: ageᵢ≤24</sub> x<sub>i</sub> ≥ 3</code></div><div><span>Binary decisions</span><code>x<sub>ip</sub> ∈ &#123;0, 1&#125;</code></div></div><p className="article-note">The average-age bounds are 24 × 11 and 26 × 11. All sums over positions include only eligible player-position pairs.</p></div></details>
            <p>Gurobi solves the binary integer program. “Optimal” means the best combined index score under these constraints, not a guarantee of winning matches.</p>
          </section>
          <section className="article-section" id="player-index">
            <h2>Give the solver something to optimize</h2>
            <p>We adapted the player-performance index from McHale, Scarf, and Folker (2012). Their method estimates contributions to team performance; our version uses season-averaged statistics and drops a computationally expensive predictive component.</p>
            <p>The score combines five signals from participation, team points, goals, assists, and clean sheets. Clean-sheet contributions change with position; league-strength adjustment remains a proposed improvement.</p>
            <div className="report-table-wrap"><table className="report-table"><caption>What goes into the player index</caption><thead><tr><th>Signal</th><th>What it rewards</th><th>Coefficient</th></tr></thead><tbody><tr><td>I₁ · Team points contribution</td><td>Playing more minutes for a team earning more points.</td><td>0.375</td></tr><tr><td>I₂ · Minutes contribution</td><td>Participation, beyond the team-points component.</td><td>0.125</td></tr><tr><td>I₃ · Goals</td><td>Scoring goals.</td><td>0.125</td></tr><tr><td>I₄ · Assists</td><td>Creating goals.</td><td>0.0625</td></tr><tr><td>I₅ · Clean sheets</td><td>Keeping opponents scoreless, weighted by position.</td><td>0.0625</td></tr></tbody></table></div>
            <div className="math-objective"><span className="math-eyebrow">Combine the five signals</span><div className="math-formula report-index-formula">I<sub>player</sub> = 100 × (0.375 I₁ + 0.125 I₂ + 0.125 I₃ + 0.0625 I₄ + 0.0625 I₅)</div><p>Calculate each sub-score, apply its coefficient, add them, then multiply by 100. The coefficients are inherited from the cited index, rather than fitted in this project.</p></div>
            <details className="report-details"><summary>The five sub-score equations</summary><div className="report-details-body"><p>Let min<sub>p</sub> be average minutes played per game and points<sub>avg</sub> the team’s average points per game. The denominator 90 × 11 is the total player-minutes in a full match.</p><div className="report-equation-list"><div><span>Team points</span><code>I₁ = min<sub>p</sub> / (90 × 11) × points<sub>avg</sub></code></div><div><span>Participation</span><code>I₂ = min<sub>p</sub> / (90 × 11) × 1.34</code></div><div><span>Goals</span><code>I₃ = goals × 1.039</code></div><div><span>Assists</span><code>I₄ = assists × 1.039</code></div><div><span>Clean sheets</span><code>I₅ = clean-sheets × weight<sub>p</sub></code></div></div><p>Clean-sheet weights are 0.585 for goalkeepers, 0.365 for defenders, 0.15 for midfielders, and 0.071 for forwards. Goal-related inputs follow the report’s season-averaged adaptation.</p><p className="article-note">The retained coefficients sum to 0.75 after removing the predictive component. We preserve the report’s formula; its scale is not a normalized percentage or a score out of 100.</p></div></details>
            <p className="article-note">Reference: McHale, Scarf &amp; Folker, “On the Development of a Soccer Player Performance Rating System for the English Premier League,” Interfaces 42 (2012), 339–351. See the original report for its bibliography.</p>
          </section>
          <section className="article-section" id="lineup">
            <h2>The €350M-budget lineup</h2>
            <p>The selected players cost €347M in total. Using the ages in the report’s solver output, the average is about 25.9 years, within the allowed 24–26 range.</p>
            <figure className="report-figure"><Image src="/logos/team.png" alt="Selected players in the project's 4-3-3 formation" width={600} height={400} /><figcaption>The selected eleven, shown in a 4-3-3 formation. The model itself uses broad position groups.</figcaption></figure>
            <div className="report-table-wrap"><table className="report-table"><caption>From the report’s solver output, Appendix Figure 2</caption><thead><tr><th>Position</th><th>Player</th><th>Age</th><th>Value</th></tr></thead><tbody>{players.map(([position, name, age, value]) => <tr key={name}><td>{position}</td><td>{name}</td><td>{age}</td><td>€{value}M</td></tr>)}</tbody><tfoot><tr><td colSpan={3}>Total market value</td><td>€347M</td></tr></tfoot></table></div>
            <p className="article-note">The appendix lists Balde at €50M; one paragraph in the report says €60M. This table follows the solver output, which reconciles to the €347M total.</p>
          </section>
          <section className="article-section" id="budgets">
            <h2>What does a bigger budget buy?</h2>
            <p>Instead of testing a few arbitrary budgets, we traced the points where the optimal lineup changes. Without a budget limit, the selected team cost €710M. That team remains optimal for every budget at or above €710M.</p>
            <ol className="report-steps"><li>Solve the model and record the lineup’s cost.</li><li>Set the next budget to that cost minus €1,000.</li><li>Replace the previous budget constraint and solve again.</li><li>Repeat until no feasible lineup exists.</li></ol>
            <p>All market values were multiples of €1,000, so the decrement excludes the current spending level without skipping a possible lower one. This produced 347 budget ranges. Replacing the old budget constraint, rather than accumulating new ones, cut the reported runtime from about 60 to 20 seconds.</p>
            <figure className="report-figure report-chart"><Image src="/projects/soccer/budget-frontier.png" alt="Optimal team index increases with budget, with smaller improvements at higher budgets" width={552} height={431} /><figcaption>Report Figure 5. More money improves the model’s score, but the gains diminish.</figcaption></figure>
            <details className="report-details"><summary>Budget-sweep pseudocode</summary><pre className="report-code">{`solve without a budget limit
while the model is feasible:
    record selected team, score, and cost
    next_budget = selected_team_cost - 1,000
    replace the budget constraint with cost ≤ next_budget
    solve again`}</pre></details>
            <p>The report calls this extension “cutting planes.” Operationally, it repeatedly tightens the budget and re-solves the integer program to identify the optimal budget ranges.</p>
            <figure className="report-figure report-chart"><Image src="/projects/soccer/value-per-euro.png" alt="The ratio of optimal index to cost is highest at the low-budget end" width={786} height={616} /><figcaption>Report Figure 7. Dividing score by cost favors a much cheaper lineup.</figcaption></figure>
          </section>
          <section className="article-section" id="results">
            <h2>The reality check</h2>
            <p>We put the main lineup into Luton Town in EA FC 24 manager career mode. We controlled the starting lineup, simulated the following season, and used the existing, weaker substitutes when selected players were injured.</p>
            <div className="report-results"><div><strong>5th / 20</strong><span>Simulated Premier League finish</span></div><div><strong>13</strong><span>Clean sheets</span></div><div><strong>€347M</strong><span>Selected lineup cost</span></div></div>
            <div className="report-player-note"><Image src="/logos/take.png" alt="Takefusa Kubo" width={64} height={64} /><p>Kubo played every match and led the team in goals and assists. Lewandowski contributed 11 goals and 5 assists, below his previous season’s output.</p></div>
            <div className="report-takeaway"><span>The important counterexample</span><p>The highest index-per-euro lineup cost only €13.2M. In simulation it finished bottom, and the manager was fired. A ratio can reward low cost so strongly that it selects a team below a competitive performance threshold.</p></div>
            <p>That does not validate the model as a predictor of professional soccer. It is one simulation-based stress test, and the project did not establish a causal performance improvement or an out-of-sample prediction benchmark.</p>
          </section>
          <section className="article-section" id="limitations">
            <h2>What we would improve</h2>
            <div className="report-rule-list"><div><strong>Use actual roles, not just position groups</strong><p>A forward who is also eligible at midfield can be selected there because of scoring stats, even if their real midfield contribution is weak. Center-back, full-back, winger, and striker need more specific treatment.</p></div><div><strong>Account for league strength</strong><p>The same statistics can mean different things in different competitions. League adjustment is a proposed improvement, not part of the implemented player index.</p></div><div><strong>Model combinations, not just individuals</strong><p>Team chemistry, passing interactions, coaching, and adaptation to transfers are missing. Summing good individual scores does not guarantee a good team.</p></div><div><strong>Broaden the scouting pool</strong><p>Lower divisions and leagues outside Europe’s top five may contain undervalued players that this dataset cannot discover.</p></div></div>
            <p>The model is useful because it makes tradeoffs inspectable. The stronger next step is to improve what the score rewards and how the selected players are evaluated together.</p>
          </section>
          <section className="article-section" id="sources"><h2>Tools, team, and original work</h2><p>Python, Gurobi, Pandas, and NumPy for the model and data work. EA FC 24 for the simulation.</p><p>Built with Hadas Barabash, Misha Melnyk, David Lascu, Sebastian Valencia, and Shamar Phillips.</p><ul className="report-source-list"><li><a href="https://www.kaggle.com/datasets/vivovinco/20222023-football-player-stats" target="_blank" rel="noreferrer">2022–23 player statistics</a></li><li><a href="https://www.kaggle.com/datasets/davidcariboo/player-scores" target="_blank" rel="noreferrer">Transfermarkt market values</a></li><li><a href="https://fbref.com/en/comps/Big5/2022-2023/keepersadv/players/2022-2023-Big-5-European-Leagues-Stats" target="_blank" rel="noreferrer">FBRef goalkeeper statistics</a></li><li><a href="/soccer-team-optimization.pdf" target="_blank" rel="noreferrer">Original report, with full formulation, figures, and references</a></li></ul></section>
          <footer className="article-end"><Link href="/#projects">← Back to projects</Link><a href="/soccer-team-optimization.pdf" target="_blank" rel="noreferrer">Read the original report ↗</a></footer>
        </main>
      </div>
    </div>
  </div>
}


