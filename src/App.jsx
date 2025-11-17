import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import ModeSelector from './components/ModeSelector'
import ChallengeCard from './components/ChallengeCard'
import ReflectionForm from './components/ReflectionForm'
import Gallery from './components/Gallery'

function App() {
  const [userId, setUserId] = useState(() => localStorage.getItem('joybait_uid') || '')
  const [mode, setMode] = useState(localStorage.getItem('joybait_mode') || 'casual')
  const [step, setStep] = useState(userId ? 'challenge' : 'signup')
  const [activeChallenge, setActiveChallenge] = useState(null)

  useEffect(() => {
    if (!userId) return
    localStorage.setItem('joybait_uid', userId)
  }, [userId])

  const signup = async (selectedMode) => {
    const base = import.meta.env.VITE_BACKEND_URL
    const res = await fetch(`${base}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: selectedMode })
    })
    const data = await res.json()
    setUserId(data.user_id)
    setMode(selectedMode)
    localStorage.setItem('joybait_mode', selectedMode)
    setStep('challenge')
  }

  const onSelectMode = async (m) => {
    if (userId) {
      const base = import.meta.env.VITE_BACKEND_URL
      await fetch(`${base}/user/${userId}/mode`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: m }) })
      setMode(m)
      localStorage.setItem('joybait_mode', m)
    } else {
      await signup(m)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-indigo-50 to-emerald-50">
      <Hero />

      {step === 'signup' && (
        <div className="-mt-16 space-y-6">
          <ModeSelector onSelect={onSelectMode} />
        </div>
      )}

      {step === 'challenge' && (
        <div className="-mt-16 space-y-6">
          <ModeSelector onSelect={onSelectMode} />
          <ChallengeCard onReflect={(ch) => { setActiveChallenge(ch); setStep('reflect') }} />
        </div>
      )}

      {step === 'reflect' && (
        <div className="-mt-16 space-y-6">
          <ReflectionForm userId={userId} challenge={activeChallenge} onDone={() => { setStep('challenge'); setActiveChallenge(null) }} />
        </div>
      )}

      <div className="my-16" />
      <Gallery />
      <footer className="text-center text-xs text-gray-500 py-10">Play nice. Be kind. Skip freely.</footer>
    </div>
  )
}

export default App
