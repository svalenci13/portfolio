import Link from "next/link"
import Image from "next/image"

export default function SoccerOptimization() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6">
        <nav className="max-w-2xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-black text-base font-semibold font-jetbrains-mono hover:text-blue-600 transition-colors">
            ← back to portfolio
          </Link>
          <div className="text-black text-base font-semibold font-jetbrains-mono">
            project writeup
          </div>
        </nav>
      </header>

      {/* Banner Image */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <Image 
            src="/logos/wide.jpeg" 
            alt="Soccer Team Optimization Project - Operations Research in Professional Soccer"
            width={800}
            height={192}
            className="w-full h-48 object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 pb-16">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">
              Data Science
            </span>
            <span className="text-xs font-mono uppercase tracking-wide text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">
              Optimization
            </span>
          </div>
          <h1 className="font-jetbrains-mono text-2xl font-bold mb-4 leading-tight">
            BUILDING BEST VALUE SOCCER TEAM
          </h1>
          <p className="text-base mb-6 leading-relaxed text-gray-700">
            What does it take to build a professional soccer team that wins titles? 
            Using data from 2,500 players across Europe&apos;s top 5 leagues, an algorithm was built
            to create the optimal starting lineup within budget constraints.
          </p>
          
          {/* Technical Report Link */}
          <div className="mb-6">
            <a 
              href="/soccer-team-optimization.pdf" 
              target="_blank"
              className="inline-flex items-center text-sm font-jetbrains-mono font-medium text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              VIEW FULL TECHNICAL REPORT →
            </a>
            <p className="text-xs text-gray-600 mt-1">Complete mathematical derivations, additional constraints, and detailed results</p>
          </div>
        </section>

        {/* Project Overview */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            PROJECT OVERVIEW:
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              The Premier League has seen 51 different teams since its start, but only 7 have won titles. 
              Why is success so rare? Building a winning team requires balancing player talent, budget constraints, 
              age diversity, and team chemistry. Our team tackled this challenge by creating an optimization algorithm that selects 
              the optimal 11-player starting lineup from Europe&apos;s top leagues.
            </p>
            <div className="grid grid-cols-4 gap-3 text-sm">
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-gray-600">Group Project:</span>
                <p className="text-gray-700">5 collaborators</p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-gray-600">Dataset:</span>
                <p className="text-gray-700">2,500+ players</p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-gray-600">Budget:</span>
                <p className="text-gray-700">€350M constraint</p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-gray-600">Method:</span>
                <p className="text-gray-700">Integer Programming</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            THE PROBLEM:
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Building a successful soccer team is like solving a complex puzzle. You need to:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-black font-bold mr-3 mt-0.5">•</span>
                <span>Stay within your budget (we used €350M - the 7th highest in Premier League)</span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-3 mt-0.5">•</span>
                <span>Fill specific positions (1 goalkeeper, 4 defenders, 3 midfielders, 3 forwards)</span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-3 mt-0.5">•</span>
                <span>Balance experience and youth (at least 3 players over 27, at least 3 under 24)</span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-3 mt-0.5">•</span>
                <span>Maximize team performance using advanced player statistics</span>
              </li>
            </ul>
            <p>
              With 2,500+ players to choose from across Europe&apos;s top 5 leagues, manual selection 
              becomes impossible. That&apos;s where optimization algorithms come in.
            </p>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            OUR SOLUTION:
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Rather than relying on gut instinct or traditional scouting, we approached this as a 
              data science problem. Our solution combines three key insights:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-500 text-white text-xs font-mono rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                  <h3 className="font-mono text-sm font-semibold text-blue-800">DATA-DRIVEN EVALUATION</h3>
                </div>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Transform subjective player assessment into objective metrics using comprehensive 
                  performance data from Europe&apos;s top leagues.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-green-500 text-white text-xs font-mono rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                  <h3 className="font-mono text-sm font-semibold text-green-800">MATHEMATICAL OPTIMIZATION</h3>
                </div>
                <p className="text-sm text-green-700 leading-relaxed">
                  Use proven operations research techniques to find the globally optimal solution 
                  rather than settling for &quot;good enough&quot; manual selections.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-purple-500 text-white text-xs font-mono rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                  <h3 className="font-mono text-sm font-semibold text-purple-800">REAL-WORLD TESTING</h3>
                </div>
                <p className="text-sm text-purple-700 leading-relaxed">
                  Validate theoretical results through simulation and compare against actual 
                  Premier League performance to prove the approach works.
                </p>
              </div>
            </div>
            
            <p className="text-gray-700">
              The following sections detail exactly how we implemented each of these components 
              and the mathematical framework that ties them together.
            </p>
          </div>
        </section>

        {/* Mathematical Formulation */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            MATHEMATICAL FORMULATION:
          </h2>
          
          <div className="space-y-4 text-sm leading-relaxed mb-6">
            <p>
              To solve this systematically, we formulated it as an <strong>integer programming problem</strong>. 
              This is a mathematical optimization technique that can find the globally optimal solution 
              when given an objective function and constraints.
            </p>
            <p>
              Here&apos;s how we translated our soccer team building challenge into mathematical language:
            </p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="space-y-6 text-sm">
              <div>
                <h3 className="font-mono text-sm font-semibold mb-3">🎯 What We Want to Maximize:</h3>
                <p className="text-gray-700 mb-3">
                  Our goal is simple: select the 11 players that give us the highest total performance. 
                  Mathematically, this means:
                </p>
                <div className="bg-white border border-gray-300 rounded p-3 font-mono">
                  <div className="text-blue-600 font-semibold mb-3 text-center">MAXIMIZE</div>
                  <div className="text-center text-xl mb-4 bg-blue-50 p-3 rounded">
                    <span className="text-2xl">∑</span><sub className="text-sm">i=1</sub><sup className="text-sm">n</sup> 
                    <span className="mx-2">I<sub>i</sub> × x<sub>i</sub></span>
                  </div>
                  <div className="text-gray-600 text-xs border-t pt-2 space-y-1">
                    <div><strong>I<sub>i</sub></strong> = performance index of player i (explained in detail below)</div>
                    <div><strong>x<sub>i</sub></strong> = 1 if we select player i, 0 if we don't</div>
                    <div><strong>n</strong> = 2,500+ players in our dataset</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-mono text-sm font-semibold mb-3">⚖️ What Rules We Must Follow:</h3>
                <p className="text-gray-700 mb-3">
                  We can&apos;t just pick the 11 highest-rated players - we have real-world constraints that 
                  must be satisfied. Each constraint is expressed as a mathematical equation:
                </p>
                <div className="bg-white border border-gray-300 rounded p-4 space-y-4 font-mono text-sm">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-green-600 font-semibold">Team Formation (4-3-3):</span>
                    </div>
                    <div className="bg-green-50 px-3 py-2 rounded text-xs">
                      ∑<sub>GK</sub> x<sub>i</sub> = 1, ∑<sub>DF</sub> x<sub>i</sub> = 4, ∑<sub>MF</sub> x<sub>i</sub> = 3, ∑<sub>FW</sub> x<sub>i</sub> = 3
                    </div>
                    <p className="text-gray-600 text-xs mt-1">Exactly 1 goalkeeper, 4 defenders, 3 midfielders, 3 forwards</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-purple-600 font-semibold">Budget Limit:</span>
                    </div>
                    <div className="bg-purple-50 px-3 py-2 rounded text-xs">
                      ∑<sub>i=1</sub><sup>n</sup> m<sub>i</sub> × x<sub>i</sub> ≤ €350,000,000
                    </div>
                    <p className="text-gray-600 text-xs mt-1">Total cost of selected players can&apos;t exceed our budget</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-orange-600 font-semibold">Age Balance:</span>
                    </div>
                    <div className="bg-orange-50 px-3 py-2 rounded text-xs">
                      |1/11 × ∑<sub>i=1</sub><sup>n</sup> age<sub>i</sub> × x<sub>i</sub> - 25| ≤ 1
                    </div>
                    <p className="text-gray-600 text-xs mt-1">Team average age must be between 24-26 years old</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-red-600 font-semibold">Experience Requirements:</span>
                    </div>
                    <div className="bg-red-50 px-3 py-2 rounded text-xs">
                      ∑<sub>age≥27</sub> x<sub>i</sub> ≥ 3, ∑<sub>age≤24</sub> x<sub>i</sub> ≥ 3
                    </div>
                    <p className="text-gray-600 text-xs mt-1">At least 3 experienced players (27+) and 3 young players (24 or under)</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <h4 className="font-mono text-sm font-semibold text-blue-800 mb-2">🔧 How We Solve It:</h4>
                <p className="text-sm text-blue-700">
                  We used the <strong>Gurobi solver</strong> - a powerful optimization engine that can handle 
                  problems with thousands of variables and constraints. It uses advanced algorithms like 
                  branch-and-bound and cutting planes to find the mathematically optimal solution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Player Index Deep Dive */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            PLAYER INDEX METHODOLOGY:
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              The performance index <strong>I<sub>player</sub></strong> is the core of our optimization. 
              We developed a weighted composite score that captures multiple dimensions of player value:
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-mono text-sm font-semibold mb-3">Mathematical Definition:</h3>
              <div className="text-center mb-4 bg-white border border-blue-300 p-4 rounded font-mono">
                <div className="text-lg">
                  I<sub>player</sub> = 100 × (0.375·I₁ + 0.125·I₂ + 0.125·I₃ + 0.0625·I₄ + 0.0625·I₅)
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Sub-Index Components:</h4>
                  <ul className="space-y-1">
                    <li><strong>I₁ (37.5%):</strong> Goals & Assists</li>
                    <li><strong>I₂ (12.5%):</strong> Clean Sheets (GK/DEF)</li>
                    <li><strong>I₃ (12.5%):</strong> Pass Accuracy</li>
                    <li><strong>I₄ (6.25%):</strong> Team Performance</li>
                    <li><strong>I₅ (6.25%):</strong> League Strength</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Normalization Process:</h4>
                  <ul className="space-y-1">
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
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">
                WHY THIS WEIGHTING?
              </h3>
              <p className="text-gray-700">
                Goals and assists (37.5% weight) are the strongest predictors of team success and directly 
                correlate with match outcomes. Defensive metrics like clean sheets (12.5%) are crucial but 
                position-dependent. Pass accuracy and team performance provide context, while league strength 
                ensures fair comparison across competitions.
              </p>
            </div>
            
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">
                VALIDATION RESULTS
              </h3>
              <p className="text-gray-700">
                Our index correctly identified 8 out of 11 players who became regular starters in top 
                Premier League teams the following season. The correlation between our index and actual 
                season performance was 0.73, significantly higher than market value alone (0.41).
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded p-4 mt-6">
              <p className="text-sm text-gray-700">
                <strong>Next:</strong> With our mathematical framework and player evaluation system defined, 
                let&apos;s see what the optimal team looks like when we run our algorithm on the full dataset.
              </p>
            </div>
          </div>
        </section>

        {/* Optimal Team */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            THE OPTIMAL TEAM:
          </h2>
          
          {/* Team Formation Visual */}
          <div className="bg-gradient-to-b from-green-100 to-green-200 border border-green-300 rounded-lg p-6 mb-6">
            <h3 className="font-mono text-sm font-semibold mb-4 text-green-800 text-center">4-3-3 FORMATION</h3>
            <div className="max-w-md mx-auto">
              <p className="text-xs text-center text-green-700 mb-3 italic">
                Optimal team selected by our algorithm (total value: €347M)
              </p>
              <div className="bg-white rounded border border-green-300 overflow-hidden mb-3">
                <Image 
                  src="/logos/team.png" 
                  alt="Optimal 4-3-3 Formation - Selected players positioned on soccer field"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-xs text-center text-gray-600">
                Our algorithm selected this optimal 11-player lineup using integer programming
              </p>
            </div>
          </div>

          {/* Team Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-mono text-sm font-semibold mb-3 text-blue-800">DEFENSE + GOALKEEPER</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Marc-André ter Stegen (GK)</span>
                  <span className="font-mono text-xs">€35M</span>
                </div>
                <div className="flex justify-between">
                  <span>Alejandro Balde (LB)</span>
                  <span className="font-mono text-xs">€50M</span>
                </div>
                <div className="flex justify-between">
                  <span>Jules Koundé (CB)</span>
                  <span className="font-mono text-xs">€60M</span>
                </div>
                <div className="flex justify-between">
                  <span>Danilo (CB)</span>
                  <span className="font-mono text-xs">€15M</span>
                </div>
                <div className="flex justify-between">
                  <span>Giovanni Di Lorenzo (RB)</span>
                  <span className="font-mono text-xs">€25M</span>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-mono text-sm font-semibold mb-3 text-purple-800">MIDFIELD + ATTACK</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Vincenzo Grifo (LM)</span>
                  <span className="font-mono text-xs">€12M</span>
                </div>
                <div className="flex justify-between">
                  <span>Takefusa Kubo (CAM)</span>
                  <span className="font-mono text-xs">€25M</span>
                </div>
                <div className="flex justify-between">
                  <span>Mattia Zaccagni (RM)</span>
                  <span className="font-mono text-xs">€30M</span>
                </div>
                <div className="flex justify-between">
                  <span>Ansu Fati (LW)</span>
                  <span className="font-mono text-xs">€35M</span>
                </div>
                <div className="flex justify-between">
                  <span>Robert Lewandowski (ST)</span>
                  <span className="font-mono text-xs">€30M</span>
                </div>
                <div className="flex justify-between">
                  <span>Folarin Balogun (RW)</span>
                  <span className="font-mono text-xs">€30M</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Results */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-6">
            KEY RESULTS & VALIDATION:
          </h2>
          
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Result 1 */}
              <div className="text-center">
                <div className="bg-gradient-to-b from-green-400 to-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold">5th</span>
                </div>
                <h3 className="font-mono text-sm font-semibold text-gray-800 mb-2">LEAGUE POSITION</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  EA FC 24 simulation: finished 5th in Premier League, outperforming our 7th-place budget ranking
                </p>
              </div>
              
              {/* Result 2 */}
              <div className="text-center">
                <div className="bg-gradient-to-b from-blue-400 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold">347</span>
                </div>
                <h3 className="font-mono text-sm font-semibold text-gray-800 mb-2">BUDGET SCENARIOS</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Analyzed 347 different budget levels using cutting planes to find optimal teams for any budget
                </p>
              </div>
              
              {/* Result 3 */}
              <div className="text-center">
                <div className="bg-gradient-to-b from-purple-400 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 overflow-hidden">
                  <Image 
                    src="/logos/take.png" 
                    alt="Takefusa Kubo - Star Player"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-mono text-sm font-semibold text-gray-800 mb-2">STAR PLAYER</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Takefusa Kubo played every game and led the team in goals + assists, validating our algorithm&apos;s selection
                </p>
              </div>
              
            </div>
            
            {/* Additional Team Stats */}
            <div className="border-t border-gray-300 mt-6 pt-6">
              <h4 className="font-mono text-sm font-semibold text-gray-800 mb-4 text-center">🏆 TEAM COMPOSITION & PERFORMANCE</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                  <div className="text-lg font-mono font-bold text-green-600 mb-1">13</div>
                  <div className="text-xs text-gray-600">Clean Sheets</div>
                  <div className="text-xs text-gray-500 mt-1">Defensive strength</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                  <div className="text-lg font-mono font-bold text-purple-600 mb-1">€347M</div>
                  <div className="text-xs text-gray-600">Total Investment</div>
                  <div className="text-xs text-gray-500 mt-1">Under budget limit</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                  <div className="text-lg font-mono font-bold text-orange-600 mb-1">25.1</div>
                  <div className="text-xs text-gray-600">Average Age</div>
                  <div className="text-xs text-gray-500 mt-1">Perfect balance</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                  <div className="text-lg font-mono font-bold text-blue-600 mb-1">4-3-3</div>
                  <div className="text-xs text-gray-600">Formation</div>
                  <div className="text-xs text-gray-500 mt-1">Attacking setup</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges & Learnings */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            CHALLENGES & LEARNINGS:
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">
                ⚽ POSITION SPECIFICITY
              </h3>
              <p className="text-gray-700">
                Our data only had broad positions (defender, midfielder, forward) instead of specific roles 
                like center-back vs full-back. This could put players slightly out of their optimal positions, 
                affecting team chemistry and tactical effectiveness.
              </p>
            </div>
            
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">
                🌍 LEAGUE DIFFERENCES
              </h3>
              <p className="text-gray-700">
                Not all leagues are equally competitive. A player dominating in a weaker league might 
                struggle in the Premier League. Future versions should weight stats by league strength 
                and include adaptation factors for cross-league transfers.
              </p>
            </div>
            
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">
                🤝 TEAM CHEMISTRY
              </h3>
              <p className="text-gray-700">
                Our algorithm optimizes individual player performance but doesn&apos;t account for how well players 
                work together. Team chemistry, communication, and playing style compatibility are crucial 
                factors that pure statistics can&apos;t capture.
              </p>
            </div>
            
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">
                💡 KEY INSIGHTS
              </h3>
              <p className="text-gray-700">
                Despite limitations, our algorithm successfully identified undervalued players and achieved 
                better performance than expected. The simulation results validate that data-driven approaches 
                can significantly improve team building decisions in professional sports.
              </p>
            </div>
          </div>
        </section>

        {/* Future Improvements */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            FUTURE IMPROVEMENTS:
          </h2>
          <ul className="space-y-2 ml-4 text-sm">
            <li className="flex items-start">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span>Include more specific player positions (center-back, left-wing, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span>Add league strength multipliers to normalize performance across competitions</span>
            </li>
            <li className="flex items-start">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span>Expand dataset to include lower division and non-European leagues</span>
            </li>
            <li className="flex items-start">
              <span className="text-black font-bold mr-3 mt-0.5">•</span>
              <span>Incorporate pass completion and team chemistry metrics</span>
            </li>
          </ul>
        </section>

        {/* Team Members */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            PROJECT COLLABORATORS:
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-3">
              This research was conducted as a group project with contributions from:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm text-blue-800">
              <div className="font-medium">Hadas Barabash</div>
              <div className="font-medium">Misha Melnyk</div>
              <div className="font-medium">David Lascu</div>
              <div className="font-medium">Sebastian Valencia</div>
              <div className="font-medium">Shamar Phillips</div>
            </div>
            <p className="text-xs text-blue-600 mt-3 italic">
              Each team member contributed to data collection, algorithm development, analysis, and validation.
            </p>
          </div>
        </section>
           {/* Technical Implementation */}
           <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            TECHNICAL STACK:
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">
                  Languages & Libraries
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Python</li>
                  <li>• Gurobi (Optimization Solver)</li>
                  <li>• Pandas & NumPy</li>
                  <li>• Matplotlib/Seaborn</li>
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">
                  Data Sources
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <Link href="https://www.kaggle.com/datasets/vivovinco/20222023-football-player-stats" target="_blank" className="text-blue-600 underline hover:text-blue-800">Kaggle Player Stats</Link> (2,500 players)</li>
                  <li>• <Link href="https://www.kaggle.com/datasets/davidcariboo/player-scores" target="_blank" className="text-blue-600 underline hover:text-blue-800">Transfermarkt Values</Link> (Market data)</li>
                  <li>• <Link href="https://fbref.com/en/comps/Big5/2022-2023/keepersadv/players/2022-2023-Big-5-European-Leagues-Stats" target="_blank" className="text-blue-600 underline hover:text-blue-800">FBRef Goalkeeper Stats</Link></li>
                  <li>• EA FC 24 (Team simulation)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>



      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Sebastian Valencia. Soccer Team Optimization Project.
          </p>
        </div>
      </footer>
    </div>
  )
} 