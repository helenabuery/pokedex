import { useState } from 'react'
import Home from './pages/Home.jsx'
import Detail from './pages/Detail.jsx'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)

  return selectedId
    ? <Detail id={selectedId} onBack={() => setSelectedId(null)} />
    : <Home onSelect={setSelectedId} />
}
