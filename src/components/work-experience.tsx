import Link from "next/link"
import Image from "next/image"

export function WorkExperience() {
  return (
    <section className="mb-10">
      <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-6">
        WORK EXPERIENCE:
      </h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 p-1">
            <Image 
              src="/logos/1password.png" 
              alt="1Password" 
              width={40} 
              height={40}
              className="w-10 h-10 object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-base">1Password</h3>
              <span className="text-sm text-gray-500 font-mono">Sep 2024 – Dec 2024</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Data Analyst Co-op</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              did everything analytics from <Link href="https://www.youtube.com/watch?v=RO625v1HXxo" target="_blank" className="text-blue-600 underline hover:text-blue-800">b2b</Link>, <Link href="https://blog.1password.com/1password-teams-free-business-reports-trial/" target="_blank" className="text-blue-600 underline hover:text-blue-800">b2c</Link> 
              , <Link href="https://blog.1password.com/product-update-features-and-security-q3-2024/" target="_blank" className="text-blue-600 underline hover:text-blue-800">telemetry</Link> and 2025 kpi planning
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image 
              src="/logos/thescore.jpg" 
              alt="theScore" 
              width={48} 
              height={48}
              className="w-12 h-12 object-cover rounded-lg"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-base">theScore/ESPN Bet</h3>
              <span className="text-sm text-gray-500 font-mono">May 2024 – Aug 2024</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Data Analyst Co-op</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 leading-relaxed">
                helped every data team from product, marketing, compliance & enterprise; scored 12 weekly shout-outs.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                found a knack for product analytics/ds
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image 
              src="/logos/loblaw-digital.jpg" 
              alt="Loblaw Digital" 
              width={48} 
              height={48}
              className="w-12 h-12 object-cover rounded-lg"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-base">Loblaw Digital</h3>
              <span className="text-sm text-gray-500 font-mono">Apr 2023 – Aug 2023</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Growth Analyst Co-op</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 leading-relaxed">
                marketing analytics for <Link href="https://www.pcexpress.ca/" target="_blank" className="text-blue-600 underline hover:text-blue-800">pc express</Link> did targetting, promo A/B tests, and measured results.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                owned entire analytics flow for <Link href="https://www.vanmag.com/taste/general/the-frozen-pizza-chronicles-vol-3-big-grocery-gets-in-on-the-game/" target="_blank" className="text-blue-600 underline hover:text-blue-800">pc black label pizza</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image 
              src="/logos/loblaw.jpg" 
              alt="Loblaw Companies" 
              width={48} 
              height={48}
              className="w-12 h-12 object-cover rounded-lg"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-base">Loblaw Companies Limited</h3>
              <span className="text-sm text-gray-500 font-mono">Jan 2023 – Apr 2023</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Full Stack Developer Co-op</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              worked on internal search tools used by 500+ users; asked to stay part time
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image 
              src="/logos/ttc.png" 
              alt="Toronto Transit Commission" 
              width={48} 
              height={48}
              className="w-12 h-12 object-cover rounded-lg"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-base">Toronto Transit Commission</h3>
              <span className="text-sm text-gray-500 font-mono">May 2022 – Aug 2022</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Data Analyst Co-op</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              made first automated reporting system for IT technicians; they thanked me with samosas
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 