import Link from "next/link"
import Image from "next/image"

export default function HealthDashboard() {
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
            src="/logos/lyft.png" 
            alt="Lyft Express Drive Analytics - Business analytics dashboard for rideshare operations"
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
              Business Analytics
            </span>
            <span className="text-xs font-mono uppercase tracking-wide text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">
              Rideshare Operations
            </span>
          </div>
          <h1 className="font-jetbrains-mono text-2xl font-bold mb-4 leading-tight">
            LYFT EXPRESS DRIVE DASHBOARD
          </h1>
          <p className="text-base mb-6 leading-relaxed text-gray-700">
            A comprehensive business analytics dashboard tracking the health of Lyft&apos;s Express Drive Program,
            analyzing regional fleet distribution, driver activity patterns, financial performance, and lifetime value
            across NYC, Chicago, and Philadelphia markets.
          </p>
          
          {/* Dashboard Link */}
          <div className="mb-6">
            <a 
              href="https://app.mode.com/svalenci/reports/54d9c6e3cde5" 
              target="_blank"
              className="inline-flex items-center text-sm font-jetbrains-mono font-medium text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              VIEW LIVE DASHBOARD →
            </a>
            <p className="text-xs text-gray-600 mt-1">Interactive dashboard built with Mode Analytics (a business intelligence platform) - click to explore the data yourself</p>
          </div>
        </section>

        {/* Project Overview */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            PROJECT OVERVIEW:
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              <strong>What is Express Drive?</strong> Lyft&apos;s Express Drive Program is a vehicle rental service that allows people 
              without personal cars to rent vehicles and drive for Lyft. Think of it as &quot;car rental meets rideshare&quot; - drivers 
              pay a weekly rental fee (~$255) to access a vehicle, then earn money by giving rides to passengers.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              This dashboard analyzes the business health of this program across three major markets (NYC, Chicago, and Philadelphia), 
              answering questions like: Are drivers making money? Is the fleet being used efficiently? How valuable are these drivers to Lyft long-term?
            </p>
            <div className="grid grid-cols-4 gap-3 text-sm">
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-gray-600">Platform:</span>
                <p className="text-gray-700">Mode Analytics</p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-gray-600">Data Sources:</span>
                <p className="text-gray-700">Lyft Operations</p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-gray-600">Markets:</span>
                <p className="text-gray-700">NYC, CHI, PHI</p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-gray-600">Drivers:</span>
                <p className="text-gray-700">9,874 unique</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            THE BUSINESS CHALLENGE:
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              <strong>Why does this matter?</strong> Lyft has thousands of Express Drive vehicles and drivers across multiple cities. 
              Without proper data analysis, it&apos;s impossible to know if the program is profitable, if drivers are happy, 
              or where improvements are needed. This project analyzes real operational data to answer critical business questions:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-black font-bold mr-3 mt-0.5">•</span>
                <span>How is fleet utilization performing across NYC, Chicago, and Philadelphia markets?</span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-3 mt-0.5">•</span>
                <span>Are there data quality issues affecting driver-vehicle relationship tracking?</span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-3 mt-0.5">•</span>
                <span>What are the true financial outcomes for drivers after rental costs?</span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-3 mt-0.5">•</span>
                <span>How can we calculate lifetime value to optimize driver acquisition and retention?</span>
              </li>
            </ul>
            <p>
              The challenge? Express Drive data comes from multiple computer systems that don&apos;t always talk to each other perfectly. 
              Driver reservations, vehicle assignments, and earnings data all live in different databases. This project involved 
              cleaning and connecting this messy data to create reliable business insights that Lyft can actually use.
            </p>
          </div>
        </section>

        {/* Dashboard Approach */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            ANALYTICAL APPROACH:
          </h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Rather than providing surface-level metrics, this dashboard takes a comprehensive
              approach to Express Drive program analysis with four key focus areas:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-500 text-white text-xs font-mono rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                  <h3 className="font-mono text-sm font-semibold text-blue-800">REGIONAL FLEET DISTRIBUTION</h3>
                </div>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Analyze vehicle distribution across NYC, Chicago, and Philadelphia markets with 
                  data quality checks for regional mapping accuracy.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-green-500 text-white text-xs font-mono rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                  <h3 className="font-mono text-sm font-semibold text-green-800">DRIVER-VEHICLE ACTIVITY</h3>
                </div>
                <p className="text-sm text-green-700 leading-relaxed">
                  Track daily fleet activity with sophisticated data cleaning to ensure accurate 
                  1:1 driver-vehicle relationships and identify data integrity issues.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-purple-500 text-white text-xs font-mono rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                  <h3 className="font-mono text-sm font-semibold text-purple-800">FINANCIAL PERFORMANCE</h3>
                </div>
                <p className="text-sm text-purple-700 leading-relaxed">
                  Calculate true driver earnings by deducting prorated rental costs ($255/week) 
                  from platform revenue to understand real financial outcomes.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-orange-500 text-white text-xs font-mono rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
                  <h3 className="font-mono text-sm font-semibold text-orange-800">LIFETIME VALUE MODELING</h3>
                </div>
                <p className="text-sm text-orange-700 leading-relaxed">
                  Build churn-based LTV model incorporating platform commission, Express Drive 
                  haircut, and retention assumptions to calculate driver value.
                </p>
              </div>
            </div>
            
            <p className="text-gray-700">
              The following sections detail each analysis area with specific methodologies, findings, 
              and business insights derived from the Express Drive program data.
            </p>
          </div>
        </section>



        {/* Metadata & Data Structure */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            DATA STRUCTURE & METADATA:
          </h2>
          
          <div className="space-y-6">
            {/* Metadata Screenshot */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden mb-4">
                <Image 
                  src="/logos/metadata.JPG" 
                  alt="Dataset Metadata View - Mode Analytics metadata view showing dataset structure, column descriptions, and data types"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority={false}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              <p className="text-xs text-center text-gray-600">
                Mode Analytics metadata view showing dataset structure, column descriptions, and data types
              </p>
            </div>

            {/* Callout explaining metadata choice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-yellow-600 text-lg">💡</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-mono text-sm font-semibold text-yellow-800 mb-2">DESIGN DECISION: Metadata Visibility</h4>
                  <p className="text-sm text-yellow-700 leading-relaxed">
                    I included the metadata section prominently because it allows users to quickly understand the data structure, 
                    column meanings, and data sources without diving into technical documentation. This transparency builds trust 
                    and helps stakeholders understand exactly what metrics are being tracked and how they&apos;re defined.
                  </p>
                </div>
              </div>
            </div>


          </div>
        </section>

        {/* Individual Chart Analysis */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            KEY VISUALIZATIONS & INSIGHTS:
          </h2>
          
          <div className="space-y-8">
            
            {/* Chart 1: Regional Fleet Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-mono text-sm font-semibold mb-4 text-gray-800">🗺️ REGIONAL FLEET DISTRIBUTION</h3>
              
              <div className="bg-gray-50 border border-gray-300 rounded-lg overflow-hidden mb-4">
                <Image 
                  src="/logos/region-data.JPG" 
                  alt="Regional Metrics Dashboard - Screenshot showing vehicle distribution pie chart and data table"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority={false}
                  quality={85}
                  loading="lazy"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">KEY FINDINGS</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• NYC dominates with 4,311 vehicles (49.2%)</li>
                    <li>• Chicago has 2,489 vehicles (28.4%)</li>
                    <li>• Philadelphia operates 1,784 vehicles (20.4%)</li>
                    <li>• 465 vehicles lack proper region mapping</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">DATA INTEGRITY PROCESS</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Validated 1:1 vehicle_id mapping by comparing distinct IDs to total rows</li>
                    <li>• Standardized inconsistent region naming conventions</li>
                    <li>• Created separate bucket for missing region data</li>
                    <li>• Flagged vehicles for downstream data cleanup efforts</li>
                  </ul>
                </div>
              </div>

              {/* Regional Analysis Thought Process */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-blue-600 text-lg">🔍</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-mono text-sm font-semibold text-blue-800 mb-2">ANALYTICAL APPROACH: Regional Data Standardization</h4>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      Started by validating vehicle_id integrity, comparing distinct IDs to total rows to identify duplicates. 
                      Discovered inconsistent region naming conventions and standardized them into NYC, CHI, and PHI buckets. 
                      Created a separate category for vehicles with missing region data - this became a valuable data quality 
                      metric for future cleanup efforts and highlighted potential gaps in the data collection process.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 2: Driver & Fleet Activity */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-mono text-sm font-semibold mb-4 text-gray-800">🚗 DRIVER & FLEET ACTIVITY ANALYSIS</h3>
              
              <div className="bg-gray-50 border border-gray-300 rounded-lg overflow-hidden mb-4">
                <Image 
                  src="/logos/Fleet.JPG" 
                  alt="Fleet Activity Time Series - Screenshot of vehicle/driver count over time with cleaning logic"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority={false}
                  quality={85}
                  loading="lazy"
                />
              </div>

              {/* Enhanced callout explaining data cleaning approach */}
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-purple-600 text-lg">🔧</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-mono text-sm font-semibold text-purple-800 mb-2">ANALYTICAL APPROACH: Solving the 1:1 Relationship Problem</h4>
                    <p className="text-sm text-purple-700 leading-relaxed mb-3">
                      <strong>Expected vs. Reality:</strong> Initially assumed that daily vehicle-driver relationships should be 1:1 
                      (100 vehicles = 100 active drivers). However, raw data showed discrepancies with more drivers than vehicles on most days.
                    </p>
                    <p className="text-sm text-purple-700 leading-relaxed mb-3">
                      <strong>Root Cause Analysis:</strong> Discovered vehicles with multiple drivers during overlapping periods, 
                      likely due to reservation system issues where canceled or shortened reservations weren&apos;t updated retroactively. 
                      These represent data cleanliness issues rather than actual usage patterns.
                    </p>
                    <p className="text-sm text-purple-700 leading-relaxed">
                      <strong>Solution:</strong> Implemented &quot;first reservation&quot; filtering logic to clean the data. Created conflict 
                      flags for vehicles with multiple drivers and drivers with multiple vehicles. This produced the clean 1:1 
                      relationship expected and turned data discrepancies into actionable data quality metrics.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">RAW METRICS</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 6,467 avg daily vehicles</li>
                    <li>• 7,770 avg daily drivers</li>
                    <li>• 1,303 vehicle-driver variance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">CLEANED METRICS</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 6,448 avg daily vehicles/drivers</li>
                    <li>• Perfect 1:1 relationship achieved</li>
                    <li>• First reservation rule applied</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">DATA QUALITY FLAGS</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 1,159 vehicles w/ multiple drivers</li>
                    <li>• 4 drivers w/ multiple vehicles</li>
                    <li>• Overlap detection implemented</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Chart 3: Driver Financials */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-mono text-sm font-semibold mb-4 text-gray-800">💰 DRIVER FINANCIAL PERFORMANCE</h3>
              
              <div className="bg-gray-50 border border-gray-300 rounded-lg overflow-hidden mb-4">
                <Image 
                  src="/logos/financials.JPG" 
                  alt="Driver Financials Dashboard - Screenshot of revenue, rental costs, and earnings analysis"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority={false}
                  quality={85}
                  loading="lazy"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">FINANCIAL METRICS</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-200">
                      <span className="text-sm font-medium">Average Revenue</span>
                      <span className="text-sm font-bold text-green-600">$822.92</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded border border-red-200">
                      <span className="text-sm font-medium">Rental Cost (Prorated)</span>
                      <span className="text-sm font-bold text-red-600">$242.68</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                      <span className="text-sm font-medium">Net Earnings</span>
                      <span className="text-sm font-bold text-blue-600">$580.24</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">KEY METHODOLOGY</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">▲</span>
                      <span>Filtered earnings to match active reservation periods</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-0.5">●</span>
                      <span>Prorated $255 weekly rental cost by days reserved</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-0.5">▼</span>
                      <span>Removed null earnings and invalid driver IDs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-0.5">♦</span>
                      <span>Covered Express Drive drivers only</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Financial Analysis Thought Process */}
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-green-600 text-lg">💰</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-mono text-sm font-semibold text-green-800 mb-2">ANALYTICAL APPROACH: Financial Performance Calculation</h4>
                    <p className="text-sm text-green-700 leading-relaxed mb-3">
                      <strong>Initial Assumptions:</strong> Earnings data appeared to be raw amounts before deductions (only 1 negative value 
                      and few zeros found). Weekly rental cost of $255 sourced from research showing costs between $240-$270.
                    </p>
                    <p className="text-sm text-green-700 leading-relaxed mb-3">
                      <strong>Data Validation:</strong> Matched earnings to active reservation periods to ensure accuracy. Created Express Drive 
                      flag by checking earnings against reservation windows - confirmed our sample only covered Express Drive drivers.
                    </p>
                    <p className="text-sm text-green-700 leading-relaxed">
                      <strong>Cost Logic:</strong> Since earnings didn&apos;t include rental costs, manually deducted them by prorating 
                      weekly $255 cost based on actual reservation days. Critical for accurate net earnings since not all reservations last full weeks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 4: Lifetime Value Analysis */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-mono text-sm font-semibold mb-4 text-gray-800">📈 DRIVER LIFETIME VALUE MODELING</h3>
              
              <div className="bg-gray-50 border border-gray-300 rounded-lg overflow-hidden mb-4">
                <Image 
                  src="/logos/ltv.JPG" 
                  alt="LTV Analysis Dashboard - Screenshot of churn modeling and lifetime value calculations"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority={false}
                  quality={85}
                  loading="lazy"
                />
              </div>

              {/* Enhanced callout explaining LTV approach */}
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-orange-600 text-lg">💡</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-mono text-sm font-semibold text-orange-800 mb-2">ANALYTICAL APPROACH: First-Time LTV Modeling</h4>
                    <p className="text-sm text-orange-700 leading-relaxed mb-3">
                      <strong>Data Limitations &amp; Learning:</strong> Limited dataset made LTV calculation challenging, but this was my first 
                      time working through an LTV problem and found it genuinely enjoyable. Researched various LTV approaches and chose 
                      a simple, transparent model that still captured the core business value.
                    </p>
                    <p className="text-sm text-orange-700 leading-relaxed mb-3">
                      <strong>Revenue Model:</strong> Applied 17% Express Drive haircut (from research) to driver earnings, then took 20% 
                      commission on post-haircut revenue. Formula: Weekly Profit = (Driver Earnings × (1 - 0.17)) × 0.20
                    </p>
                    <p className="text-sm text-orange-700 leading-relaxed">
                      <strong>Churn Assumptions:</strong> Used 7.5% weekly churn rate from industry benchmarks since dataset lacked 
                      clear churn signals. Expected active weeks = 1 / churn rate = 13.33 weeks average driver lifetime.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Revenue Model Breakdown */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-mono text-sm font-semibold text-gray-800 mb-4 text-center">💰 REVENUE MODEL BREAKDOWN</h4>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <h5 className="font-mono text-sm text-gray-700 mb-2">Weekly Profit Formula</h5>
                    <div className="bg-white p-3 rounded border">
                      <div className="font-mono text-sm text-gray-800 mb-1">Weekly Profit = Weekly Earnings × (1 - Express Drive %) × Commission %</div>
                      <div className="font-mono text-xs text-gray-600">Average Weekly Lyft Profit = $106.79</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h5 className="font-mono text-sm text-gray-700 mb-2">Expected Active Weeks Formula</h5>
                    <div className="bg-white p-3 rounded border">
                      <div className="font-mono text-sm text-gray-800 mb-1">Expected Active Weeks = 1 ÷ Churn Rate</div>
                      <div className="font-mono text-xs text-gray-600">Expected Active Weeks = 1 ÷ 0.075 = 13.33 weeks</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LTV Formula */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-mono text-sm font-semibold text-gray-800 mb-3 text-center">📊 LIFETIME VALUE CALCULATION</h4>
                <div className="text-center">
                  <div className="font-mono text-lg text-gray-800 mb-2">LTV = Weekly Profit × Expected Active Weeks</div>
                  <div className="font-mono text-sm text-gray-600 mb-2">LTV = $106.79 × (1 ÷ 0.075)</div>
                  <div className="font-mono text-lg text-green-600 font-bold">LTV = $106.79 × 13.33 = $1,423.82</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">Weekly Profit</div>
                  <div className="text-xl font-bold text-green-600">$106.79</div>
                  <div className="text-xs text-gray-600">Lyft&apos;s profit per driver</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">Churn Rate</div>
                  <div className="text-xl font-bold text-orange-600">7.5%</div>
                  <div className="text-xs text-gray-600">Weekly (industry benchmark)</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">Expected Weeks</div>
                  <div className="text-xl font-bold text-blue-600">13.33</div>
                  <div className="text-xs text-gray-600">1 ÷ churn rate</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">LTV COMPONENTS</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 9,874 unique drivers analyzed</li>
                    <li>• $106.79 avg weekly Lyft profit</li>
                    <li>• 13.33 expected active weeks</li>
                    <li>• $1,423.82 average driver LTV</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">REVENUE MODEL</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 17% Express Drive haircut applied first</li>
                    <li>• 20% Lyft commission on post-haircut revenue</li>
                    <li>• Formula: (Earnings × 0.83) × 0.20</li>
                    <li>• 7.5% weekly churn rate assumed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">FINAL RESULTS</h4>
                  <div className="space-y-2">
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                      <div className="text-xs text-green-700">Average Driver LTV</div>
                      <div className="text-lg font-bold text-green-800">$1,423.82</div>
                    </div>
                    <div className="text-xs text-gray-600">Total value to Lyft per driver</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            TECHNICAL IMPLEMENTATION:
          </h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🔗</div>
              <h3 className="font-mono text-sm font-semibold text-gray-800 mb-2">SQL QUERIES & DATA ANALYSIS</h3>
              <p className="text-sm text-gray-600 mb-4">
                All SQL queries, data transformations, and technical implementation details are available in the live Mode Analytics dashboard.
              </p>
              <a 
                href="https://app.mode.com/svalenci/reports/54d9c6e3cde5/details" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="mr-2">🔍</span>
                View Full Mode Analytics Dashboard
              </a>
            </div>
          </div>
        </section>

        {/* Business Impact & Results */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-6">
            BUSINESS IMPACT & KEY FINDINGS:
          </h2>

          {/* Callout explaining dashboard value */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-blue-600 text-lg">🎯</span>
              </div>
              <div className="ml-3">
                <h4 className="font-mono text-sm font-semibold text-blue-800 mb-2">BUSINESS IMPACT: Strategic Driver Program Insights</h4>
                <p className="text-sm text-blue-700 leading-relaxed">
                  This analysis provided critical insights for optimizing Lyft&apos;s Express Drive program across multiple markets. 
                  Key findings included identifying data quality issues affecting 1,159 vehicles, calculating true driver 
                  profitability after rental costs, and building an LTV model showing $1,423.82 average driver value. 
                  These insights directly informed driver acquisition strategies and operational improvements.
                </p>
              </div>
            </div>
          </div>



          {/* Key Findings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-mono text-sm font-semibold text-gray-800 mb-4">🔍 DATA QUALITY INSIGHTS</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-0.5">⚠️</span>
                  <div>
                    <strong>1,159 vehicles</strong> with multiple drivers detected
                    <div className="text-xs text-gray-600">Indicates reservation system overlap issues</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-0.5">📍</span>
                  <div>
                    <strong>465 vehicles</strong> missing regional mapping
                    <div className="text-xs text-gray-600">Flagged for data cleanup and standardization</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✅</span>
                  <div>
                    <strong>Data cleaning</strong> achieved 1:1 driver-vehicle ratio
                    <div className="text-xs text-gray-600">From 7,770 drivers to 6,448 clean relationships</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-mono text-sm font-semibold text-gray-800 mb-4">💰 FINANCIAL PERFORMANCE</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">💵</span>
                  <div>
                    <strong>$580.24</strong> average net driver earnings
                    <div className="text-xs text-gray-600">After $242.68 prorated rental costs</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-0.5">📈</span>
                  <div>
                    <strong>$1,423.82</strong> average driver lifetime value
                    <div className="text-xs text-gray-600">Based on 13.33 week retention model</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-0.5">🗺️</span>
                  <div>
                    <strong>NYC dominates</strong> with 49.2% of fleet
                    <div className="text-xs text-gray-600">4,311 vehicles across 3 major markets</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Lessons Learned & Future Improvements */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            LESSONS LEARNED & FUTURE IMPROVEMENTS:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-mono text-sm font-semibold text-gray-800 mb-4">🔄 DATA QUALITY CHALLENGES</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Inconsistent data collection from different sources required significant cleaning and normalization. 
                Future iterations would benefit from standardized data ingestion pipelines and automated quality checks 
                to reduce manual preprocessing time.
              </p>
              <div className="border-t pt-3">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">Key Issues to Address:</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Follow up on vehicles w/ no region mapping</li>
                  <li>• Investigate data feeding the vehicle reservation table</li>
                  <li>• Implement lookback period improvements</li>
                  <li>• Clarify earnings calculation methodology</li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-mono text-sm font-semibold text-gray-800 mb-4">📊 VISUALIZATION EFFECTIVENESS</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Mode Analytics&apos; business intelligence platform proved invaluable for rapid data exploration and visualization. 
                The ability to iterate quickly on SQL queries and generate comprehensive charts revealed insights 
                that would have been missed in traditional static reporting approaches.
              </p>
              <div className="border-t pt-3">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">Analysis Improvements:</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• More thorough LTV model development</li>
                  <li>• Ability to verify key assumptions</li>
                  <li>• Enhanced (XD) driver insights & average lifespan</li>
                  <li>• Larger timeframe for trend analysis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-blue-600 text-lg">🚀</span>
              </div>
              <div className="ml-3">
                <h4 className="font-mono text-sm font-semibold text-blue-800 mb-2">PLANNED ENHANCEMENTS</h4>
                <p className="text-sm text-blue-700 leading-relaxed mb-3">
                  Next steps include developing more sophisticated modeling approaches, expanding data coverage, 
                  and implementing automated monitoring systems for key business metrics.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-blue-700">
                  <div>
                    <h5 className="font-semibold mb-1">Model Enhancements:</h5>
                    <ul className="space-y-1">
                      <li>• Predictive modeling for driver retention</li>
                      <li>• Regional performance optimization</li>
                      <li>• Enhanced LTV calculations with cohort analysis</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Data Expansion:</h5>
                    <ul className="space-y-1">
                      <li>• Tie more granular regional data</li>
                      <li>• Integrate additional driver behavioral metrics</li>
                      <li>• Implement real-time data quality monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="mb-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-4">
            TECHNICAL STACK:
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">
                  Platform & Tools
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Mode Analytics (Primary Platform)</li>
                  <li>• SQL (Data Analysis & Queries)</li>
                  <li>• Statistical Analysis</li>
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">
                  Data Sources & Visualization
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Lyft Express Public Mode Data</li>
                  <li>• Lyft Express Drive FAQ</li>
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
            © 2025 Sebastian Valencia. Lyft Express Drive Analytics Project.
          </p>
        </div>
      </footer>
    </div>
  )
} 