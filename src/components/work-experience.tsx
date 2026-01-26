import Link from "next/link"
import Image from "next/image"

export function WorkExperience() {
  return (
    <section className="mb-6">
      <h2 className="font-mono text-xs font-semibold uppercase tracking-wide mb-3">
        WORK EXPERIENCE:
      </h2>
      <div className="space-y-1">
        <Link href="https://www.shopify.com" target="_blank" className="flex items-center gap-3 hover:bg-gray-50 rounded py-0.5 transition-colors">
          <div className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center flex-shrink-0">
            <Image 
              src="/logos/shopify.JPG" 
              alt="Shopify" 
              width={24} 
              height={24}
              className="w-6 h-6 object-cover rounded"
              unoptimized
            />
          </div>
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="text-xs text-gray-700">Data Scientist</span>
            <span className="text-xs text-gray-700 font-semibold">Shopify</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-400 text-xs">↳</span>
          </div>
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="text-xs text-gray-700"><span className="text-gray-500">prev.</span> Software Developer</span>
          </div>
        </div>

        <Link href="https://1password.com" target="_blank" className="flex items-center gap-3 hover:bg-gray-50 rounded py-0.5 transition-colors">
          <div className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center flex-shrink-0 p-0.5">
            <Image 
              src="/logos/1password.png" 
              alt="1Password" 
              width={20} 
              height={20}
              className="w-5 h-5 object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="text-xs text-gray-700">Data Analyst</span>
            <span className="text-xs text-gray-700 font-semibold">1Password</span>
          </div>
        </Link>

        <Link href="https://www.thescore.com" target="_blank" className="flex items-center gap-3 hover:bg-gray-50 rounded py-0.5 transition-colors">
          <div className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center flex-shrink-0">
            <Image 
              src="/logos/thescore.jpg" 
              alt="theScore" 
              width={24} 
              height={24}
              className="w-6 h-6 object-cover rounded"
              unoptimized
            />
          </div>
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="text-xs text-gray-700">Data Analyst</span>
            <span className="text-xs text-gray-700 font-semibold">theScore</span>
          </div>
        </Link>

        <Link href="https://www.loblawdigital.co" target="_blank" className="flex items-center gap-3 hover:bg-gray-50 rounded py-0.5 transition-colors">
          <div className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center flex-shrink-0">
            <Image 
              src="/logos/loblaw-digital.jpg" 
              alt="Loblaw Digital" 
              width={24} 
              height={24}
              className="w-6 h-6 object-cover rounded"
              unoptimized
            />
          </div>
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="text-xs text-gray-700">Growth Analyst</span>
            <span className="text-xs text-gray-700 font-semibold">Loblaw Digital</span>
          </div>
        </Link>

        <Link href="https://www.loblaw.ca" target="_blank" className="flex items-center gap-3 hover:bg-gray-50 rounded py-0.5 transition-colors">
          <div className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center flex-shrink-0">
            <Image 
              src="/logos/loblaw.jpg" 
              alt="Loblaw Companies" 
              width={24} 
              height={24}
              className="w-6 h-6 object-cover rounded"
              unoptimized
            />
          </div>
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="text-xs text-gray-700">Full Stack Developer</span>
            <span className="text-xs text-gray-700 font-semibold">Loblaw Companies</span>
          </div>
        </Link>

        <Link href="https://www.ttc.ca" target="_blank" className="flex items-center gap-3 hover:bg-gray-50 rounded py-0.5 transition-colors">
          <div className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center flex-shrink-0">
            <Image 
              src="/logos/ttc.png" 
              alt="Toronto Transit Commission" 
              width={24} 
              height={24}
              className="w-6 h-6 object-cover rounded"
              unoptimized
            />
          </div>
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="text-xs text-gray-700">Data Analyst</span>
            <span className="text-xs text-gray-700 font-semibold">TTC</span>
          </div>
        </Link>
      </div>
    </section>
  )
} 