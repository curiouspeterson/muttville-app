'use client'

// Import necessary dependencies
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { Activity } from '@/types/Dog'

// ActivityLog component to display a log of activities for a specific dog
export default function ActivityLog({ dogId }: { dogId: string }) {
  // State to store the list of activities
  const [activities, setActivities] = useState<Activity[]>([])

  // Effect hook to fetch activities when the component mounts or dogId changes
  useEffect(() => {
    const fetchActivities = async () => {
      // Query the 'activities' table in Supabase
      const { data } = await supabase
        .from('activities')
        .select('*')
        .eq('dog_id', dogId)
        .order('created_at', { ascending: false })

      // Update state with fetched activities if data is available
      if (data) {
        setActivities(data as Activity[])
      }
    }

    fetchActivities()
  }, [dogId])

  // Render the activity log
  return (
    <div>
      <h2>Activity Log</h2>
      <ul>
        {/* Map through activities and render each as a list item */}
        {activities.map((activity) => (
          <li key={activity.id}>
            {/* Display activity details: type, walker, date, and notes */}
            {activity.activity_type} by {activity.walker_id} on {new Date(activity.created_at).toLocaleString()}
            <p>{activity.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
