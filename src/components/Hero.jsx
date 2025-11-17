import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 md:p-10 shadow-xl max-w-xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">Joybait</h1>
            <p className="mt-3 md:mt-4 text-gray-700 md:text-lg">A playful confidence app with gentle real‑world challenges, reflections, and feel‑good streaks.</p>
            <div className="mt-6 flex gap-3">
              <a href="#get-started" className="inline-flex items-center px-4 py-2 md:px-5 md:py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">Get Started</a>
              <a href="#gallery" className="inline-flex items-center px-4 py-2 md:px-5 md:py-3 rounded-xl bg-white text-gray-900 font-semibold shadow hover:bg-gray-50 transition">Browse Joy Gallery</a>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
    </section>
  )
}
