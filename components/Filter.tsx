// Create a filter component to select temperament
import { useState } from 'react'

export default function Filter({ onFilter }: { onFilter: (filter: string) => void }) {
  const [temperament, setTemperament] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemperament(e.target.value)
    onFilter(e.target.value)
  }

  return (
    <select value={temperament} onChange={handleChange} id="temperament" name="temperament">
      <option value="">All Temperaments</option>
      <option value="Calm">Calm</option>
      <option value="Aggressive">Aggressive</option>
      <option value="Playful">Playful</option>
      {/* Add more as needed */}
    </select>
  )
}
