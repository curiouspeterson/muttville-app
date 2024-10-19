// Import necessary dependencies
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

// Define the Activity type
type Activity = {
  id: string
  activity_type: string
  walker_id: string
  created_at: string
  notes: string
}

// ActivityLog component to display activities for a specific dog
export default function ActivityLog({ dogId }: { dogId: string }) {
  // Properly type the state
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Function to fetch activities from Supabase
    const fetchActivities = async () => {
      // Query Supabase for activities related to the specific dog
      const { data } = await supabase
        .from('activities')
        .select('*')
        .eq('dog_id', dogId)
        .order('created_at', { ascending: false }) // Sort activities by creation date, newest first

      // Check if data is not null before setting state
      if (data) {
        setActivities(data as Activity[])
      }
    }

    // Call the fetchActivities function when the component mounts or dogId changes
    fetchActivities()
  }, [dogId]) // Dependency array ensures effect runs when dogId changes

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
