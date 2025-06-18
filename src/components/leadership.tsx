import Link from "next/link"
import Image from "next/image"

export function Leadership() {
  return (
    <section className="mb-10">
      <h2 className="font-mono text-sm font-semibold uppercase tracking-wide mb-6">
        LEADERSHIP:
      </h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 p-1">
            <Image 
              src="/logos/techplus.png" 
              alt="Tech+ UW" 
              width={40} 
              height={40}
              className="w-10 h-10 object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-base">Tech+ UW</h3>
              <span className="text-sm text-gray-500 font-mono">Jan 2024 – Dec 2024</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Logistics Lead</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              restarted <Link href="https://www.techplusuw.com/" target="_blank" className="text-blue-600 underline hover:text-blue-800">mentorship program</Link> that helped me in first year, had 200+ students from diverse backgrounds
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-black border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image 
              src="/logos/uwdsc.png" 
              alt="UW Data Science Club" 
              width={48} 
              height={48}
              className="w-12 h-12 object-contain rounded-lg"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-base">University of Waterloo Data Science Club</h3>
              <span className="text-sm text-gray-500 font-mono">Dec 2022 – Aug 2023</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">President</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 leading-relaxed">
                launched <Link href="https://creators.spotify.com/pod/profile/uwdsc-dataden" target="_blank" className="text-blue-600 underline hover:text-blue-800">podcast</Link>, did everything from editing to creating logos & graphics to cold messaging guests
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                founded <Link href="https://www.linkedin.com/feed/update/urn:li:activity:7055207351288549376" target="_blank" className="text-blue-600 underline hover:text-blue-800">consulting team</Link> reached out 40+ companies; delivered climate risk analytics for <Link href="https://www.manifestclimate.com/" target="_blank" className="text-blue-600 underline hover:text-blue-800">manifest climate</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 