import Link from "next/link"

const lineup = [
  ["GK", "Marc-André ter Stegen", "35"], ["LB", "Alejandro Balde", "50"],
  ["CB", "Jules Koundé", "60"], ["CB", "Danilo", "15"], ["RB", "Giovanni Di Lorenzo", "25"],
  ["LM", "Vincenzo Grifo", "12"], ["CAM", "Takefusa Kubo", "25"], ["RM", "Mattia Zaccagni", "30"],
  ["LW", "Ansu Fati", "35"], ["ST", "Robert Lewandowski", "30"], ["RW", "Folarin Balogun", "30"],
]

export default function SoccerOptimization() {
  return <div className="project-writeup">
    <main className="writeup-content">
      <Link href="/#projects" className="writeup-back">← Back to portfolio</Link>
      <article>
        <header>
          <p className="writeup-theme">Optimization, Operations Research</p>
          <h1>Building the Best Value Soccer Team</h1>
          <p>Choosing an 11-player lineup from more than 2,500 players across Europe’s top five leagues, subject to a €350M budget.</p>
          <a href="/soccer-team-optimization.pdf" target="_blank" rel="noreferrer">Read the full technical report ↗</a>
        </header>
        <section>
          <h2>The problem</h2>
          <p>A strong lineup needs more than the highest-rated players. We wanted to maximize player performance while satisfying a budget, a formation, and a balance of younger and experienced players.</p>
          <p>We modeled team selection as a binary integer program. Each player is either selected or excluded, and the solver searches for the highest-scoring feasible combination.</p>
        </section>
        <section>
          <h2>Data and player evaluation</h2>
          <p>We combined 2022–23 player statistics with Transfermarkt market values and goalkeeper statistics from FBRef. The candidate pool covered more than 2,500 players from Europe’s top five leagues.</p>
          <p>Our player index combined goals and assists, clean sheets, pass accuracy, team performance, and league strength. Goals and assists received the largest weight. Position-specific scaling and min-max normalization made the statistics more comparable across players.</p>
          <p>The full report includes the index definitions, weights, and mathematical derivations.</p>
        </section>
        <section>
          <h2>The optimization model</h2>
          <p>For each player <em>i</em>, let <em>xᵢ</em> be 1 if selected and 0 otherwise. Let <em>Iᵢ</em> be their performance index, <em>mᵢ</em> their market value, and <em>aᵢ</em> their age.</p>
          <pre className="writeup-equation">{`maximize   Σ Iᵢ xᵢ
subject to Σ mᵢ xᵢ ≤ €350,000,000
           Σ xᵢ = 11
           xᵢ ∈ {0, 1}`}</pre>
          <p>The remaining constraints enforce:</p>
          <ul>
            <li>A 4-3-3 formation: one goalkeeper, four defenders, three midfielders, and three forwards.</li>
            <li>An average age between 24 and 26.</li>
            <li>At least three players aged 27 or older and at least three aged 24 or younger.</li>
          </ul>
          <p>We solved the model in Python using Gurobi, with Pandas and NumPy for data preparation. The integer formulation lets the solver use branch-and-bound and cutting planes rather than relying on a greedy player-by-player selection.</p>
        </section>
        <section>
          <h2>The selected lineup</h2>
          <p>The model selected a 4-3-3 lineup valued at €347M, below the €350M limit, with an average age of 25.1.</p>
          <div className="writeup-table-wrap"><table>
            <caption>Selected players and market values</caption>
            <thead><tr><th scope="col">Position</th><th scope="col">Player</th><th scope="col">Value</th></tr></thead>
            <tbody>{lineup.map(([position, player, value]) => <tr key={player}><td>{position}</td><td>{player}</td><td>€{value}M</td></tr>)}</tbody>
          </table></div>
        </section>
        <section>
          <h2>Testing the result</h2>
          <p>We tested the selected team in an EA FC 24 Premier League simulation. It finished fifth despite a budget corresponding to seventh in the league, recorded 13 clean sheets, and had Takefusa Kubo lead the team in goals and assists.</p>
          <p>We also explored 347 budget scenarios to examine how the optimal lineup changes as the spending limit moves.</p>
          <p>These are simulation results, rather than evidence that the same lineup would produce those outcomes in professional soccer.</p>
        </section>
        <section>
          <h2>Limitations and next steps</h2>
          <p>The model optimizes a player index, so its output depends on how well that index represents performance. The data also uses broad position groups, which can miss distinctions such as center-back versus full-back.</p>
          <p>Team chemistry, tactical fit, communication, and adaptation to a new league are difficult to capture through individual statistics. More detailed positional data, stronger league adjustments, and measures of how players combine would make the model more useful.</p>
          <p>The interesting part is the tradeoff: a budget-constrained model makes it possible to compare thousands of candidates systematically and see which compromises the constraints force.</p>
        </section>
        <section>
          <h2>Tools and sources</h2>
          <p>Python, Gurobi, Pandas, NumPy, Matplotlib, and Seaborn. EA FC 24 for the team simulation.</p>
          <ul>
            <li><a href="https://www.kaggle.com/datasets/vivovinco/20222023-football-player-stats" target="_blank" rel="noreferrer">2022–23 football player statistics</a></li>
            <li><a href="https://www.kaggle.com/datasets/davidcariboo/player-scores" target="_blank" rel="noreferrer">Transfermarkt player values</a></li>
            <li><a href="https://fbref.com/en/comps/Big5/2022-2023/keepersadv/players/2022-2023-Big-5-European-Leagues-Stats" target="_blank" rel="noreferrer">FBRef goalkeeper statistics</a></li>
          </ul>
        </section>
        <section>
          <h2>Collaborators</h2>
          <p>Hadas Barabash, Misha Melnyk, David Lascu, Sebastian Valencia, and Shamar Phillips. A group project spanning data collection, model development, analysis, and validation.</p>
        </section>
      </article>
      <footer><Link href="/#projects">← Back to projects</Link><a href="/soccer-team-optimization.pdf" target="_blank" rel="noreferrer">Technical report ↗</a></footer>
    </main>
  </div>
}

