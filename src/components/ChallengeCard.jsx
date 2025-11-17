import { useState } from 'react'

export default function ChallengeCard({ onReflect }) {
  const [loading, setLoading] = useState(false)
  const [challenge, setChallenge] = useState(null)

  const fetchChallenge = async (filters = {}) => {
    setLoading(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL
      const res = await fetch(`${base}/challenge/next`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      })
      if (!res.ok) throw new Error('No challenge available')
      const data = await res.json()
      setChallenge(data)
    } catch (e) {
      console.error(e)
      setChallenge(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Your challenge</h3>
          <button onClick={() => fetchChallenge()} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Draw one</button>
        </div>
        {loading && <p className="mt-4 text-gray-500">Finding something playful…</p>}
        {challenge && (
          <div className="mt-4 border rounded-xl p-4 bg-indigo-50 border-indigo-200">
            <div className="font-semibold text-gray-900">{challenge.title}</div>
            {challenge.description && <div className="text-gray-700 text-sm mt-1">{challenge.description}</div>}
            <div className="flex gap-2 mt-3 text-xs">
              <span className="px-2 py-1 rounded bg-white border text-gray-700">{challenge.mood}</span>
              <span className="px-2 py-1 rounded bg-white border text-gray-700">{challenge.environment}</span>
              <span className="px-2 py-1 rounded bg-white border text-gray-700">lvl {challenge.confidence}</span>
            </div>
            <button onClick={() => onReflect?.(challenge)} className="mt-4 px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700">I did it</button>
          </div>
        )}
      </div>
    </div>
  )
}
