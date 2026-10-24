import Link from "next/link"
import Image from "next/image"

export default function SoccerOptimization() {
  return <div className="soccer-article">
    <div className="article-shell">
      <nav className="article-top"><Link href="/#projects">← Sebastian Valencia</Link><a href="/soccer-team-optimization.pdf" target="_blank" rel="noreferrer">Full report ↗</a></nav>
      <header className="article-hero">
        <p className="article-kicker">A project in optimization &amp; operations research</p>
        <h1>Building the best<br className="article-title-break" /> value soccer team.</h1>
        <p className="article-deck">An 11-player lineup. A €350M budget. More than 2,500 candidates. Finding the best combination with integer programming.</p>
        <div className="article-at-a-glance"><div><span>Candidate pool</span><strong>2,500+ players</strong></div><div><span>Budget ceiling</span><strong>€350 million</strong></div><div><span>Model</span><strong>Binary integer program</strong></div></div>
        <figure className="article-banner"><Image src="/logos/wide.jpeg" alt="Soccer team optimization project" width={1200} height={420} priority /><figcaption>From player statistics to a budget-constrained starting eleven.</figcaption></figure>
      </header>
      <div className="article-layout">
        <aside className="article-contents"><span>On this page</span><a href="#problem">The problem</a><a href="#model">The model</a><a href="#player-index">Player evaluation</a><a href="#lineup">The lineup</a><a href="#results">Results</a><a href="#limitations">Limitations</a><a href="#implementation">Tools &amp; data</a></aside>
        <main className="article-body">
<section className="article-section" id="overview">
          <h2>Overview</h2>
          <div className="article-panel">
            <p >
              The Premier League has seen 51 different teams since its start, but only 7 have won titles. 
              Why is success so rare? Building a winning team requires balancing player talent, budget constraints, 
              age diversity, and team chemistry. Our team tackled this challenge by creating an optimization algorithm that selects 
              the optimal 11-player starting lineup from Europe&apos;s top leagues.
            </p>
            <div className="article-facts">
              <div>
                <span className="article-note">Group Project:</span>
                <p >5 collaborators</p>
              </div>
              <div>
                <span className="article-note">Dataset:</span>
                <p >2,500+ players</p>
              </div>
              <div>
                <span className="article-note">Budget:</span>
                <p >€350M constraint</p>
              </div>
              <div>
                <span className="article-note">Method:</span>
                <p >Integer Programming</p>
              </div>
            </div>
          </div>
        </section>
<section className="article-section" id="problem">
          <h2>The selection problem</h2>
          <div className="article-flow">
            <p>
              Building a successful soccer team is like solving a complex puzzle. You need to:
            </p>
            <ul className="article-flow">
              <li className="article-bullet">
                <span >•</span>
                <span>Stay within your budget (we used €350M - the 7th highest in Premier League)</span>
              </li>
              <li className="article-bullet">
                <span >•</span>
                <span>Fill specific positions (1 goalkeeper, 4 defenders, 3 midfielders, 3 forwards)</span>
              </li>
              <li className="article-bullet">
                <span >•</span>
                <span>Balance experience and youth (at least 3 players over 27, at least 3 under 24)</span>
              </li>
              <li className="article-bullet">
                <span >•</span>
                <span>Maximize team performance using advanced player statistics</span>
              </li>
            </ul>
            <p>
              With 2,500+ players to choose from across Europe&apos;s top 5 leagues, manual selection 
              becomes impossible. That&apos;s where optimization algorithms come in.
            </p>
          </div>
        </section>
<section className="article-section" id="approach">
          <h2>The approach</h2>
          <div className="article-flow">
            <p>
              Rather than relying on gut instinct or traditional scouting, we approached this as a 
              data science problem. Our solution combines three key insights:
            </p>
            
            <div className="article-three">
              <div className="article-panel">
                <div >
                  <span className="article-step article-note">1</span>
                  <h3>Data-driven evaluation</h3>
                </div>
                <p >
                  Transform subjective player assessment into objective metrics using comprehensive 
                  performance data from Europe&apos;s top leagues.
                </p>
              </div>
              
              <div className="article-panel">
                <div >
                  <span className="article-step article-note">2</span>
                  <h3>Mathematical optimization</h3>
                </div>
                <p >
                  Use proven operations research techniques to find the globally optimal solution 
                  rather than settling for &quot;good enough&quot; manual selections.
                </p>
              </div>
              
              <div className="article-panel">
                <div >
                  <span className="article-step article-note">3</span>
                  <h3>Real-world testing</h3>
                </div>
                <p >
                  Validate theoretical results through simulation and compare against actual 
                  Premier League performance to prove the approach works.
                </p>
              </div>
            </div>
            
            <p >
              The following sections detail exactly how we implemented each of these components 
              and the mathematical framework that ties them together.
            </p>
          </div>
        </section>
<section className="article-section" id="model">
  <h2>The mathematical model</h2>
  <p className="math-lead">Think of every player as a checkbox. The solver decides which 11 boxes to tick. It adds up their performance scores, checks the rules below, and finds the highest-scoring lineup that passes every rule.</p>
  <div className="math-key">
    <h3>Four symbols, one decision</h3>
    <dl><div><dt>xᵢ</dt><dd>Pick player i? 1 means yes, 0 means no.</dd></div><div><dt>Iᵢ</dt><dd>That player’s performance score.</dd></div><div><dt>mᵢ</dt><dd>That player’s market value, in euros.</dd></div><div><dt>ageᵢ</dt><dd>That player’s age, in years.</dd></div></dl>
    <p className="article-note">The symbol Σ means “add this up across the players.” Multiplying by xᵢ includes selected players and contributes zero for everyone else.</p>
  </div>
  <div className="math-objective"><span className="math-eyebrow">The objective</span><h3>Get the highest combined performance score.</h3><div className="math-formula">Maximize ∑<sub>i=1</sub><sup>n</sup> I<sub>i</sub> × x<sub>i</sub></div><p>For example, selecting players with scores of 82, 76, and 91 contributes 249 points. The model does this for all 11 selected players.</p></div>
  <h3 className="math-rules-heading">The rules every lineup must pass</h3>
  <div className="math-rules">
    <div><div className="math-rule-title"><span>01</span><h4>Spend no more than €350M</h4></div><p>Add the market values of selected players. The total must fit the budget.</p><div className="math-formula">∑<sub>i=1</sub><sup>n</sup> m<sub>i</sub> × x<sub>i</sub> ≤ €350,000,000</div></div>
    <div><div className="math-rule-title"><span>02</span><h4>Fill exactly 11 positions</h4></div><p>Use a 4-3-3 formation: one goalkeeper, four defenders, three midfielders, and three forwards.</p><div className="math-formation"><div><strong>1</strong><span>Goalkeeper</span></div><div><strong>4</strong><span>Defenders</span></div><div><strong>3</strong><span>Midfielders</span></div><div><strong>3</strong><span>Forwards</span></div></div><div className="math-formula small-formula">∑<sub>GK</sub> x<sub>i</sub> = 1 &nbsp; ∑<sub>DF</sub> x<sub>i</sub> = 4<br />∑<sub>MF</sub> x<sub>i</sub> = 3 &nbsp; ∑<sub>FW</sub> x<sub>i</sub> = 3</div></div>
    <div><div className="math-rule-title"><span>03</span><h4>Keep the average age between 24 and 26</h4></div><p>Add the ages of the selected players and divide by 11. The average can be at most one year away from 25.</p><div className="math-formula">| (∑<sub>i=1</sub><sup>n</sup> age<sub>i</sub> × x<sub>i</sub>) / 11 − 25 | ≤ 1</div></div>
    <div><div className="math-rule-title"><span>04</span><h4>Include both youth and experience</h4></div><p>At least three players must be 27 or older, and at least three must be 24 or younger. This prevents a balanced average from hiding a team with little age diversity.</p><div className="math-formula small-formula">∑<sub>age≥27</sub> x<sub>i</sub> ≥ 3<br />∑<sub>age≤24</sub> x<sub>i</sub> ≥ 3</div></div>
  </div>
  <div className="math-solver"><h3>How we solve it</h3><p>Gurobi searches for the best combination of yes/no decisions using branch-and-bound and cutting planes. We supply the scores and constraints; the solver finds the highest-scoring feasible lineup.</p><p className="article-note">“Optimal” means best under this scoring system and these constraints. It does not guarantee the best real-world soccer team.</p></div>
</section>
<section className="article-section" id="player-index">
          <h2>Evaluating players</h2><p className="math-lead">The solver needs one score per player. We build it by putting several statistics on a comparable scale, applying weights, and adding them together. A larger weight makes a statistic count more toward the final score.</p>
          <div className="article-flow">
            <p>
              The performance index <strong>I<sub>player</sub></strong> is the core of our optimization. 
              We developed a weighted composite score that captures multiple dimensions of player value:
            </p>
            
            <div className="article-panel">
              <h3>Combine five normalized sub-scores</h3><p className="article-note">Read this as: multiply each sub-score by its weight, add the results, then multiply by 100.</p>
              <div className="article-panel article-mono article-equation">
                <div >
                  I<sub>player</sub> = 100 × (0.375·I₁ + 0.125·I₂ + 0.125·I₃ + 0.0625·I₄ + 0.0625·I₅)
                </div>
              </div>
              
              <div className="article-columns">
                <div>
                  <h4>Sub-Index Components</h4>
                  <ul className="article-flow">
                    <li><strong>I₁ (37.5%):</strong> Goals & Assists</li>
                    <li><strong>I₂ (12.5%):</strong> Clean Sheets (GK/DEF)</li>
                    <li><strong>I₃ (12.5%):</strong> Pass Accuracy</li>
                    <li><strong>I₄ (6.25%):</strong> Team Performance</li>
                    <li><strong>I₅ (6.25%):</strong> League Strength</li>
                  </ul>
                </div>
                
                <div>
                  <h4>Normalization Process</h4>
                  <ul className="article-flow">
                    <li>• Position-specific scaling</li>
                    <li>• Min-max normalization [0,1]</li>
                    <li>• League competition adjustment</li>
                    <li>• Age performance curves</li>
                    <li>• Market value correlation check</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3>Why this weighting?</h3>
              <p >
                Goals and assists (37.5% weight) are the strongest predictors of team success and directly 
                correlate with match outcomes. Defensive metrics like clean sheets (12.5%) are crucial but 
                position-dependent. Pass accuracy and team performance provide context, while league strength 
                ensures fair comparison across competitions.
              </p>
            </div>
            
            <div>
              <h3>Validation results</h3>
              <p >
                Our index correctly identified 8 out of 11 players who became regular starters in top 
                Premier League teams the following season. The correlation between our index and actual 
                season performance was 0.73, significantly higher than market value alone (0.41).
              </p>
            </div>
            
            <div className="article-panel">
              <p >
                <strong>Next:</strong> With our mathematical framework and player evaluation system defined, 
                let&apos;s see what the optimal team looks like when we run our algorithm on the full dataset.
              </p>
            </div>
          </div>
        </section>
<section className="article-section" id="lineup">
          <h2>The selected lineup</h2>
          
          {/* Team Formation Visual */}
          <div className="article-panel">
            <h3>4-3-3 formation</h3>
            <div className="article-formation">
              <p className="article-note">
                Optimal team selected by our algorithm (total value: €347M)
              </p>
              <div className="article-panel">
                <Image 
                  src="/logos/team.png" 
                  alt="Optimal 4-3-3 Formation - Selected players positioned on soccer field"
                  width={600}
                  height={400}
                  
                />
              </div>
              <p className="article-note">
                Our algorithm selected this optimal 11-player lineup using integer programming
              </p>
            </div>
          </div>

          {/* Team Breakdown */}
          <div className="article-columns">
            <div className="article-panel">
              <h4>Defense + goalkeeper</h4>
              <div className="article-flow">
                <div className="article-data-row">
                  <span>Marc-André ter Stegen (GK)</span>
                  <span className="article-note">€35M</span>
                </div>
                <div className="article-data-row">
                  <span>Alejandro Balde (LB)</span>
                  <span className="article-note">€50M</span>
                </div>
                <div className="article-data-row">
                  <span>Jules Koundé (CB)</span>
                  <span className="article-note">€60M</span>
                </div>
                <div className="article-data-row">
                  <span>Danilo (CB)</span>
                  <span className="article-note">€15M</span>
                </div>
                <div className="article-data-row">
                  <span>Giovanni Di Lorenzo (RB)</span>
                  <span className="article-note">€25M</span>
                </div>
              </div>
            </div>
            
            <div className="article-panel">
              <h4>Midfield + attack</h4>
              <div className="article-flow">
                <div className="article-data-row">
                  <span>Vincenzo Grifo (LM)</span>
                  <span className="article-note">€12M</span>
                </div>
                <div className="article-data-row">
                  <span>Takefusa Kubo (CAM)</span>
                  <span className="article-note">€25M</span>
                </div>
                <div className="article-data-row">
                  <span>Mattia Zaccagni (RM)</span>
                  <span className="article-note">€30M</span>
                </div>
                <div className="article-data-row">
                  <span>Ansu Fati (LW)</span>
                  <span className="article-note">€35M</span>
                </div>
                <div className="article-data-row">
                  <span>Robert Lewandowski (ST)</span>
                  <span className="article-note">€30M</span>
                </div>
                <div className="article-data-row">
                  <span>Folarin Balogun (RW)</span>
                  <span className="article-note">€30M</span>
                </div>
              </div>
            </div>
          </div>
        </section>
<section className="article-section" id="results">
          <h2>Results and validation</h2>
          
          <div className="article-panel">
            <div className="article-three">
              
              {/* Result 1 */}
              <div >
                <div className="article-result-icon">
                  <span className="article-stat">5th</span>
                </div>
                <h3>League position</h3>
                <p className="article-note">
                  EA FC 24 simulation: finished 5th in Premier League, outperforming our 7th-place budget ranking
                </p>
              </div>
              
              {/* Result 2 */}
              <div >
                <div className="article-result-icon">
                  <span className="article-stat">347</span>
                </div>
                <h3>Budget scenarios</h3>
                <p className="article-note">
                  Analyzed 347 different budget levels using cutting planes to find optimal teams for any budget
                </p>
              </div>
              
              {/* Result 3 */}
              <div >
                <div className="article-result-icon">
                  <Image 
                    src="/logos/take.png" 
                    alt="Takefusa Kubo - Star Player"
                    width={64}
                    height={64}
                    
                  />
                </div>
                <h3>Star player</h3>
                <p className="article-note">
                  Takefusa Kubo played every game and led the team in goals + assists, validating our algorithm&apos;s selection
                </p>
              </div>
              
            </div>
            
            {/* Additional Team Stats */}
            <div >
              <h4>Team composition & performance</h4>
              <div className="article-facts">
                <div className="article-panel">
                  <div className="article-mono">13</div>
                  <div className="article-note">Clean Sheets</div>
                  <div className="article-note">Defensive strength</div>
                </div>
                <div className="article-panel">
                  <div className="article-mono">€347M</div>
                  <div className="article-note">Total Investment</div>
                  <div className="article-note">Under budget limit</div>
                </div>
                <div className="article-panel">
                  <div className="article-mono">25.1</div>
                  <div className="article-note">Average Age</div>
                  <div className="article-note">Perfect balance</div>
                </div>
                <div className="article-panel">
                  <div className="article-mono">4-3-3</div>
                  <div className="article-note">Formation</div>
                  <div className="article-note">Attacking setup</div>
                </div>
              </div>
            </div>
          </div>
        </section>
<section className="article-section" id="limitations">
          <h2>What the model misses</h2>
          <div className="article-flow">
            <div>
              <h3>Position specificity</h3>
              <p >
                Our data only had broad positions (defender, midfielder, forward) instead of specific roles 
                like center-back vs full-back. This could put players slightly out of their optimal positions, 
                affecting team chemistry and tactical effectiveness.
              </p>
            </div>
            
            <div>
              <h3>League differences</h3>
              <p >
                Not all leagues are equally competitive. A player dominating in a weaker league might 
                struggle in the Premier League. Future versions should weight stats by league strength 
                and include adaptation factors for cross-league transfers.
              </p>
            </div>
            
            <div>
              <h3>Team chemistry</h3>
              <p >
                Our algorithm optimizes individual player performance but doesn&apos;t account for how well players 
                work together. Team chemistry, communication, and playing style compatibility are crucial 
                factors that pure statistics can&apos;t capture.
              </p>
            </div>
            
            <div>
              <h3>Key insights</h3>
              <p >
                Despite limitations, our algorithm successfully identified undervalued players and achieved 
                better performance than expected. The simulation results validate that data-driven approaches 
                can significantly improve team building decisions in professional sports.
              </p>
            </div>
          </div>
        </section>
<section className="article-section" id="next-steps">
          <h2>Next steps</h2>
          <ul className="article-flow">
            <li className="article-bullet">
              <span >•</span>
              <span>Include more specific player positions (center-back, left-wing, etc.)</span>
            </li>
            <li className="article-bullet">
              <span >•</span>
              <span>Add league strength multipliers to normalize performance across competitions</span>
            </li>
            <li className="article-bullet">
              <span >•</span>
              <span>Expand dataset to include lower division and non-European leagues</span>
            </li>
            <li className="article-bullet">
              <span >•</span>
              <span>Incorporate pass completion and team chemistry metrics</span>
            </li>
          </ul>
        </section>
<section className="article-section" id="collaborators">
          <h2>Collaborators</h2>
          <div className="article-panel">
            <p >
              This research was conducted as a group project with contributions from:
            </p>
            <div className="article-credits">
              <div >Hadas Barabash</div>
              <div >Misha Melnyk</div>
              <div >David Lascu</div>
              <div >Sebastian Valencia</div>
              <div >Shamar Phillips</div>
            </div>
            <p className="article-note">
              Each team member contributed to data collection, algorithm development, analysis, and validation.
            </p>
          </div>
        </section>
<section className="article-section" id="implementation">
          <h2>Tools and data</h2>
          <div className="article-panel">
            <div className="article-columns">
              <div>
                <h3>Languages & Libraries</h3>
                <ul className="article-flow">
                  <li>• Python</li>
                  <li>• Gurobi (Optimization Solver)</li>
                  <li>• Pandas & NumPy</li>
                  <li>• Matplotlib/Seaborn</li>
                </ul>
              </div>
              <div>
                <h3>Data Sources</h3>
                <ul className="article-flow">
                  <li>• <Link href="https://www.kaggle.com/datasets/vivovinco/20222023-football-player-stats" target="_blank" >Kaggle Player Stats</Link> (2,500 players)</li>
                  <li>• <Link href="https://www.kaggle.com/datasets/davidcariboo/player-scores" target="_blank" >Transfermarkt Values</Link> (Market data)</li>
                  <li>• <Link href="https://fbref.com/en/comps/Big5/2022-2023/keepersadv/players/2022-2023-Big-5-European-Leagues-Stats" target="_blank" >FBRef Goalkeeper Stats</Link></li>
                  <li>• EA FC 24 (Team simulation)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
          <footer className="article-end"><Link href="/#projects">← Back to projects</Link><a href="/soccer-team-optimization.pdf" target="_blank" rel="noreferrer">Read the full technical report ↗</a></footer>
        </main>
      </div>
    </div>
  </div>
}

