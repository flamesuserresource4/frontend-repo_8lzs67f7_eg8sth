import { useState } from 'react'

export default function ModeSelector({ onSelect }) {
  const [mode, setMode] = useState('casual')

  return (
    <div id="get-started" className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Choose your vibe</h2>
        <p className="text-gray-600 mt-1">Start light or go on a 21‑day confidence quest.</p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={() => { setMode('casual'); onSelect?.('casual') }} className={`text-left p-5 rounded-xl border ${mode==='casual'?'border-indigo-500 bg-indigo-50':'border-gray-200 hover:border-gray-300'} transition`}>
            <div className="font-semibold text-gray-900">Casual mode</div>
            <div className="text-gray-600 text-sm mt-1">Occasional gentle prompts when you want them.</div>
          </button>
          <button onClick={() => { setMode('challenge'); onSelect?.('challenge') }} className={`text-left p-5 rounded-xl border ${mode==='challenge'?'border-indigo-500 bg-indigo-50':'border-gray-200 hover:border-gray-300'} transition`}>
            <div className="font-semibold text-gray-900">Challenge mode</div>
            <div className="text-gray-600 text-sm mt-1">21‑day confidence journey with daily streaks.</div>
          </button>
        </div>
      </div>
    </div>
  )
}
