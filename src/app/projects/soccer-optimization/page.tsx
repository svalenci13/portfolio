import Link from "next/link"
import Image from "next/image"
import { Equation } from "@/components/equation"
import { AsciiBanner } from "@/components/ascii-banner"

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
        <h1>Building the best value soccer team</h1>
        <p className="article-deck">Give us a budget and a list of players. Can we use math to build a decent soccer team? That was the idea. Then we put the team in EA FC 24 to see what happened.</p>
        <div className="article-at-a-glance"><div><span>Starting dataset</span><strong>2,500+ players</strong></div><div><span>After filtering</span><strong>~1,000 candidates</strong></div><div><span>Main budget</span><strong>€350M</strong></div></div>
        <figure className="article-banner"><AsciiBanner /><figcaption>2022–23 player data from Europe’s five major leagues.</figcaption></figure>
      </header>
      <div className="article-layout">
        <aside className="article-contents"><span>On this page</span><a href="#question">The question</a><a href="#data">The data</a><a href="#model">The model</a><a href="#player-index">Player scores</a><a href="#lineup">The lineup</a><a href="#budgets">Changing the budget</a><a href="#results">Time to Let EA FC Decide</a><a href="#limitations">What we learned</a></aside>
        <main className="article-body">
          <section className="article-section" id="question">
            <h2>First, What Are We Actually Trying to Build?</h2>
            <p>If you’ve ever built a team in FIFA, you know the problem. You find a few players you want, look at the total price, and start making compromises. Maybe the cheaper defender is fine. Maybe you don’t need that third expensive forward.</p>
            <p>We wanted to do that systematically. Our budget was €350M, roughly the seventh most expensive starting eleven in the Premier League at the time. The job: pick 11 players from Europe’s top five leagues and get the highest combined performance score we could afford.</p>
            <div className="report-takeaway"><span>A small spoiler</span><p>The team we picked finished fifth in simulation. A much cheaper team looked even better on a “score per euro” metric. That team finished last. We’ll get to that.</p></div>
          </section>
          <section className="article-section" id="data">
            <h2>Before the Math, We Need Some Players</h2>
            <p>We started with 2022–23 stats for roughly 2,500 players across the Premier League, Bundesliga, Ligue 1, Serie A, and La Liga. We joined those to Transfermarkt market values and scraped goalkeeper stats from FBRef, since our main dataset didn’t have them.</p>
            <div className="report-pipeline"><div><strong>2,500+</strong><span>Players in the source data</span></div><span aria-hidden="true">→</span><div><strong>10 games + 700 minutes</strong><span>Minimum season participation</span></div><span aria-hidden="true">→</span><div><strong>~1,000</strong><span>Players eligible for the model</span></div></div>
            <p>We also needed players who actually played. Someone can look very good over three appearances. That’s less useful when you’re asking them to start for an entire season. So we kept players with at least 10 games and 700 minutes, leaving about 1,000 candidates.</p>
          </section>
          <section className="article-section" id="model">
            <h2>Okay, How Do We Pick the Team?</h2>
            <p>You could sort everyone by their performance score and take the top 11. Easy enough. Except you might end up with 11 forwards and no money left. We need the score and the rules to work together.</p>
            <p>The formula below just says: add up the scores of the players we select, and make that total as large as possible. Iᵢ is player i’s score. xᵢ is 1 if we pick them and 0 if we don’t. An unselected player contributes nothing.</p>
            <div className="model-objective">
              <span className="equation-label">Maximize the team’s combined performance</span>
              <Equation tex={String.raw`\max_{x}\;\sum_{i\in S} I_i x_i`} label="Maximize the sum of the selected players' performance scores" />
              <p className="equation-notation"><span><i>Iᵢ</i> Player score</span><span><i>xᵢ</i> 1 if selected, 0 otherwise</span></p>
            </div>
            
            <p>And here’s what a valid lineup has to look like:</p>
            <dl className="model-constraints">
              <div><dt>Budget</dt><dd>Spend no more than €350M.</dd></div>
              <div><dt>Formation</dt><dd>1 goalkeeper, 4 defenders, 3 midfielders, 3 forwards.</dd></div>
              <div><dt>Average age</dt><dd>Between 24 and 26 years.</dd></div>
              <div><dt>Experience</dt><dd>At least 3 players aged 27+ and 3 aged 24 or younger.</dd></div>
              <div><dt>Position eligibility</dt><dd>Each player fills one eligible position, even if they can play several.</dd></div>
            </dl>
            <p>Those rules are the constraints. We give the scores and constraints to Gurobi, which solves the integer program. It finds the best combination under our definition of “best.” That last part matters a lot.</p>
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
            <h2>What Makes a Player “Good” Here?</h2>
            <p>Gurobi doesn’t know who Lewandowski is. It needs a number. We adapted a player-performance index from McHale, Scarf, and Folker (2012), averaged the inputs over a season, and left out a predictive component that would have required simulating game events for every player.</p>
            <p>That left us with five sub-scores. Playing time matters, scoring and assisting matter, and keeping a clean sheet matters. But not equally for every position. A goalkeeper gets more credit for a clean sheet than a striker does, which seems fair.</p>
            <div className="report-table-wrap"><table className="report-table"><caption>What goes into the player index</caption><thead><tr><th>Signal</th><th>Contribution</th><th>Coefficient</th></tr></thead><tbody><tr><td>I₁ · Team points contribution</td><td>Minutes played × team points.</td><td>0.375</td></tr><tr><td>I₂ · Minutes contribution</td><td>Minutes played, independent of team points.</td><td>0.125</td></tr><tr><td>I₃ · Goals</td><td>Goals scored.</td><td>0.125</td></tr><tr><td>I₄ · Assists</td><td>Goals assisted.</td><td>0.0625</td></tr><tr><td>I₅ · Clean sheets</td><td>Games without conceding; weighted by position.</td><td>0.0625</td></tr></tbody></table></div>
            <div className="index-equation"><Equation compact tex={String.raw`I_{\mathrm{player}}=100\left(0.375I_1+0.125I_2+0.125I_3+0.0625I_4+0.0625I_5\right)`} label="Weighted player performance index" /><p className="article-note">We retained the coefficients from the published index. They were not fitted to our dataset.</p></div>
            <details className="report-details"><summary>The five sub-score equations</summary><div className="report-details-body"><p>Let min<sub>p</sub> be average minutes played per game and points<sub>avg</sub> the team’s average points per game. The denominator 90 × 11 is the total player-minutes in a full match.</p><div className="report-equation-list"><div><span>Team points</span><code>I₁ = min<sub>p</sub> / (90 × 11) × points<sub>avg</sub></code></div><div><span>Participation</span><code>I₂ = min<sub>p</sub> / (90 × 11) × 1.34</code></div><div><span>Goals</span><code>I₃ = goals × 1.039</code></div><div><span>Assists</span><code>I₄ = assists × 1.039</code></div><div><span>Clean sheets</span><code>I₅ = clean-sheets × weight<sub>p</sub></code></div></div><p>Clean-sheet weights are 0.585 for goalkeepers, 0.365 for defenders, 0.15 for midfielders, and 0.071 for forwards. Goal-related inputs follow the report’s season-averaged adaptation.</p><p className="article-note">The retained coefficients sum to 0.75 after removing the predictive component. We preserve the report’s formula; its scale is not a normalized percentage or a score out of 100.</p></div></details>
            <p className="article-note">Reference: McHale, Scarf &amp; Folker, “On the Development of a Soccer Player Performance Rating System for the English Premier League,” Interfaces 42 (2012), 339–351. See the original report for its bibliography.</p>
          </section>
          <section className="article-section" id="lineup">
            <h2>So, Who Did We Get?</h2>
            <p>Here’s the starting eleven. Total cost: €347M. Average age: about 25.9. Both within the limits, with €3M left over.</p>
            <figure className="report-figure"><Image src="/logos/team.png" alt="Selected players in the project's 4-3-3 formation" width={600} height={400} /><figcaption>The team, arranged in a 4-3-3. A reminder: the model knows “defender,” not “left-back.”</figcaption></figure>
            <div className="report-table-wrap"><table className="report-table"><caption>From the report’s solver output, Appendix Figure 2</caption><thead><tr><th>Position</th><th>Player</th><th>Age</th><th>Value</th></tr></thead><tbody>{players.map(([position, name, age, value]) => <tr key={name}><td>{position}</td><td>{name}</td><td>{age}</td><td>€{value}M</td></tr>)}</tbody><tfoot><tr><td colSpan={3}>Total market value</td><td>€347M</td></tr></tfoot></table></div>
            <p className="article-note">The appendix lists Balde at €50M; one paragraph in the report says €60M. This table follows the solver output, which reconciles to the €347M total.</p>
          </section>
          <figure className="report-figure report-evidence"><Image src="/projects/soccer/solver-output.png" alt="Original solver output showing selected players, assigned positions, ages, scores, and market values" width={1482} height={546} /><figcaption>The less glamorous version of the team photo. Same eleven, with the numbers attached.</figcaption></figure>
          <section className="article-section" id="budgets">
            <h2>What If We Spent Less?</h2>
            <p>€350M was our main budget, but there was no reason to stop there. What does another million buy? And how far can we cut the budget before the team gets noticeably worse?</p>
            <ol className="report-steps"><li>Solve the model and record the lineup’s cost.</li><li>Set the next budget to that cost minus €1,000.</li><li>Replace the previous budget constraint and solve again.</li><li>Repeat until no feasible lineup exists.</li></ol>
            <p>We started without a budget constraint. The best team cost €710M. Any budget above that gives the same answer. Then we lowered the cap to the selected team’s cost minus €1,000 and solved again. All market values were multiples of €1,000, so we weren’t skipping a possible spending level. Repeating this gave us 347 budget ranges.</p>
            <figure className="report-figure report-chart"><Image src="/projects/soccer/budget-frontier.png" alt="Optimal team index increases with budget, with smaller improvements at higher budgets" width={552} height={431} /><figcaption>The first few increases in budget buy a lot. By the expensive end, you’re paying more for smaller improvements.</figcaption></figure>
            <details className="report-details"><summary>Budget-sweep pseudocode</summary><pre className="report-code">{`solve without a budget limit
while the model is feasible:
    record selected team, score, and cost
    next_budget = selected_team_cost - 1,000
    replace the budget constraint with cost ≤ next_budget
    solve again`}</pre></details>
            <p>A small implementation detail helped here: replacing the old budget constraint instead of adding another one each time reduced runtime from about a minute to 20 seconds. Same problem, less unnecessary work. We called this extension “cutting planes” in the report; the loop above is the procedure we used.</p>
            <figure className="report-figure report-chart"><Image src="/projects/soccer/value-per-euro.png" alt="The ratio of optimal index to cost is highest at the low-budget end" width={786} height={616} /><figcaption>Now divide the score by the price. Suddenly the cheap teams look very appealing.</figcaption></figure>
          </section>
          <section className="article-section" id="results">
            <h2>Time to Let EA FC Decide</h2>
            <p>We put our €347M lineup into Luton Town in EA FC 24 manager career mode and simulated the next season. We only controlled the starting lineup. If someone got injured, the existing Luton substitutes had to cover. No quietly buying a better bench halfway through.</p>
            <div className="report-results"><div><strong>5th / 20</strong><span>Simulated Premier League finish</span></div><div><strong>13</strong><span>Clean sheets</span></div><div><strong>€347M</strong><span>Selected lineup cost</span></div></div>
            <figure className="report-figure report-evidence"><Image src="/projects/soccer/league-table.jpg" alt="EA FC 24 league table showing the simulated team finishing fifth" width={2354} height={1311} /><figcaption>Fifth place. We’ll take it.</figcaption></figure>
            <div className="report-player-note"><Image src="/logos/take.png" alt="Takefusa Kubo" width={64} height={64} /><p>Kubo played every match and led the team in goals and assists. Lewandowski finished with 11 goals and 5 assists, down from his previous season. So the biggest name wasn’t the biggest contributor.</p></div>
            <div className="report-takeaway"><span>About that €13.2M team</span><p>When we maximized score per euro across the budget ranges, the winner cost €13.2M. Great value, apparently. In simulation it finished bottom and got the manager fired. The ratio liked how little we spent. The league table was less impressed.</p></div>
            <p>Obviously EA FC is not real life. One simulated season doesn’t validate a model, and we didn’t test the index against an independent set of real match results. But the contrast is useful: a team can look efficient on paper and still not be good enough to compete.</p>
          </section>
          <section className="article-section" id="limitations">
            <h2>What the Model Doesn’t Know</h2>
            <div className="report-rule-list"><div><strong>Use actual roles, not just position groups</strong><p>A forward who is also eligible at midfield can be selected there because of scoring stats, even if their real midfield contribution is weak. Center-back, full-back, winger, and striker need more specific treatment.</p></div><div><strong>Account for league strength</strong><p>The same statistics can mean different things in different competitions. League adjustment is a proposed improvement, not part of the implemented player index.</p></div><div><strong>Model combinations, not just individuals</strong><p>Team chemistry, passing interactions, coaching, and adaptation to transfers are missing. Summing good individual scores does not guarantee a good team.</p></div><div><strong>Broaden the scouting pool</strong><p>Lower divisions and leagues outside Europe’s top five may contain undervalued players that this dataset cannot discover.</p></div></div>
            <p>The first thing I’d fix is the position data. If we tell the solver a player can play midfield, it will believe us. It won’t notice that we’ve put an attacker there because their goals make the score look better. Better inputs before a more complicated model.</p>
          </section>
          <section className="article-section" id="sources"><h2>Project notes</h2><p>Python, Gurobi, Pandas, and NumPy for the model and data work. EA FC 24 for the simulation.</p><p>Built with Hadas Barabash, Misha Melnyk, David Lascu, Sebastian Valencia, and Shamar Phillips.</p><ul className="report-source-list"><li><a href="https://www.kaggle.com/datasets/vivovinco/20222023-football-player-stats" target="_blank" rel="noreferrer">2022–23 player statistics</a></li><li><a href="https://www.kaggle.com/datasets/davidcariboo/player-scores" target="_blank" rel="noreferrer">Transfermarkt market values</a></li><li><a href="https://fbref.com/en/comps/Big5/2022-2023/keepersadv/players/2022-2023-Big-5-European-Leagues-Stats" target="_blank" rel="noreferrer">FBRef goalkeeper statistics</a></li><li><a href="/soccer-team-optimization.pdf" target="_blank" rel="noreferrer">Original report, with full formulation, figures, and references</a></li></ul></section>
          <footer className="article-end"><Link href="/#projects">← Back to projects</Link><a href="/soccer-team-optimization.pdf" target="_blank" rel="noreferrer">Read the original report ↗</a></footer>
        </main>
      </div>
    </div>
  </div>
}




