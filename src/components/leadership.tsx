import Link from "next/link"
import Image from "next/image"

export function Leadership() {
  return (
    <section className="mb-6">
      <h2 className="font-mono text-xs font-semibold uppercase tracking-wide mb-3">
        LEADERSHIP:
      </h2>
      <div className="space-y-1">
        <Link href="https://www.techplusuw.com" target="_blank" className="flex items-center gap-3 hover:bg-gray-50 rounded py-0.5 transition-colors">
          <div className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center flex-shrink-0 p-0.5">
            <Image 
              src="/logos/techplus.png" 
              alt="Tech+ UW" 
              width={20} 
              height={20}
              className="w-5 h-5 object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="text-xs text-gray-700">Logistics Lead</span>
            <span className="text-xs text-gray-700 font-semibold">Tech+ UW</span>
          </div>
        </Link>

        <Link href="https://www.uwdatascience.ca" target="_blank" className="flex items-center gap-3 hover:bg-gray-50 rounded py-0.5 transition-colors">
          <div className="w-6 h-6 bg-black border border-gray-200 rounded flex items-center justify-center flex-shrink-0">
            <Image 
              src="/logos/uwdsc.png" 
              alt="UW Data Science Club" 
              width={24} 
              height={24}
              className="w-6 h-6 object-contain rounded"
              unoptimized
            />
          </div>
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="text-xs text-gray-700">President</span>
            <span className="text-xs text-gray-700 font-semibold">UW Data Science Club</span>
          </div>
        </Link>
      </div>
    </section>
  )
} 