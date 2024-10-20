'use client'

// Import Activity interface from types/Dog.ts
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { Activity } from '@/types/Dog'

export default function ActivityLog({ dogId }: { dogId: string }) {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const fetchActivities = async () => {
      const { data } = await supabase
        .from('activities')
        .select('*')
        .eq('dog_id', dogId)
        .order('created_at', { ascending: false })

      if (data) {
        setActivities(data as Activity[])
      }
    }

    fetchActivities()
  }, [dogId])

  return (
    <div>
      <h2>Activity Log</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.activity_type} by {activity.walker_id} on {new Date(activity.created_at).toLocaleString()}
            <p>{activity.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
