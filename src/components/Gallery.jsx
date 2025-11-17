import { useEffect, useState } from 'react'

export default function Gallery() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const base = import.meta.env.VITE_BACKEND_URL
      const res = await fetch(`${base}/gallery`)
      if (res.ok) setItems(await res.json())
    }
    load()
  }, [])

  if (!items.length) return null

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Joy Gallery</h2>
        <p className="text-gray-600 mt-1">Anonymous uplifting moments from the community.</p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.id} className="border rounded-xl p-4 bg-gradient-to-br from-amber-50 to-pink-50">
              <div className="text-sm text-gray-700">{it.note || 'No note provided'}</div>
              <div className="mt-2 text-xs text-gray-500">Mood after: {it.mood_after}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
