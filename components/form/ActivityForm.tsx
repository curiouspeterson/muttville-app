import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@clerk/nextjs'

export default function ActivityForm({ dogId }: { dogId: string }) {
  const [activityType, setActivityType] = useState('')
  const [notes, setNotes] = useState('')
  const { userId } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.from('activities').insert({
      dog_id: dogId,
      walker_id: userId,
      activity_type: activityType,
      notes,
    })
    // Handle success or error
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={activityType} onChange={(e) => setActivityType(e.target.value)}>
        <option value="">Select Activity</option>
        <option value="Walk">Walk</option>
        <option value="Feeding">Feeding</option>
        {/* Add more options as needed */}
      </select>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit">Log Activity</button>
    </form>
  )
}
