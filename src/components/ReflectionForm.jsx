import { useState } from 'react'

export default function ReflectionForm({ userId, challenge, onDone }) {
  const [before, setBefore] = useState(3)
  const [after, setAfter] = useState(4)
  const [note, setNote] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [saving, setSaving] = useState(false)

  const submit = async () => {
    if (!challenge) return
    setSaving(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL
      const res = await fetch(`${base}/reflect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          challenge_id: challenge._id,
          mood_before: Number(before),
          mood_after: Number(after),
          note,
          is_public: isPublic,
        })
      })
      if (!res.ok) throw new Error('Failed to save')
      onDone?.()
    } catch (e) {
      console.error(e)
      alert('Could not save reflection')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-gray-900">How did it feel?</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm text-gray-600">Mood before (1–5)</span>
            <input type="number" min="1" max="5" value={before} onChange={e=>setBefore(e.target.value)} className="mt-1 border rounded-lg px-3 py-2" />
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-gray-600">Mood after (1–5)</span>
            <input type="number" min="1" max="5" value={after} onChange={e=>setAfter(e.target.value)} className="mt-1 border rounded-lg px-3 py-2" />
          </label>
          <label className="md:col-span-2 flex flex-col">
            <span className="text-sm text-gray-600">Optional note</span>
            <textarea value={note} onChange={e=>setNote(e.target.value)} className="mt-1 border rounded-lg px-3 py-2" rows={3} placeholder="A tiny reflection…" />
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isPublic} onChange={e=>setIsPublic(e.target.checked)} />
            <span className="text-sm text-gray-700">Share anonymously to the Joy Gallery</span>
          </label>
        </div>
        <div className="mt-4 flex gap-3">
          <button disabled={saving} onClick={submit} className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50">Save Reflection</button>
        </div>
      </div>
    </div>
  )
}
