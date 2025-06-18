import Link from "next/link"

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6">
        <nav className="max-w-2xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-black text-base font-semibold font-serif hover:underline">
            sebo
          </Link>
          <div className="flex gap-4 md:gap-8 font-mono text-sm font-medium items-center">
            <Link href="mailto:svalenci@uwaterloo.ca" target="_blank" className="text-blue-600 underline hover:text-blue-800">
              CONTACT
            </Link>
            <Link href="https://linkedin.com/in/svalenci" target="_blank" className="text-blue-600 underline hover:text-blue-800">
              LINKEDIN
            </Link>
            <Link href="https://twitter.com/yourusername" target="_blank" className="text-blue-600 underline hover:text-blue-800">
              TWITTER
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 pt-16 pb-16">
        <div className="text-center">
          <h1 className="font-mono text-2xl font-bold mb-8 leading-tight">
            BLOG
          </h1>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12">
            <div className="space-y-4">
              <div className="text-6xl">✍️</div>
              <h2 className="font-mono text-lg font-semibold uppercase tracking-wide">
                Work in Progress
              </h2>
              <p className="text-sm text-gray-600">
                This page is coming soon. Check back later for thoughts, insights, and stories!
              </p>
              <Link 
                href="/" 
                className="inline-block mt-6 text-blue-600 underline hover:text-blue-800 font-mono text-sm"
              >
                ← BACK TO HOME
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Sebastian Valencia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 