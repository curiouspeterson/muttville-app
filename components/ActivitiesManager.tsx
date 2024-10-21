'use client'

import { useState } from 'react'
import { useStore } from '@/hooks/useStore'
import { format } from 'date-fns'

// Define the props interface for the ActivitiesManager component
interface ActivitiesManagerProps {
  dogId: string
  refreshData: () => Promise<void>
}

// ActivitiesManager component for managing dog activities
const ActivitiesManager: React.FC<ActivitiesManagerProps> = ({ dogId, refreshData }) => {
  // Use the custom store hook to manage activities state
  const { activities, addActivity, deleteActivity } = useStore()
  // State for new activity input
  const [newActivity, setNewActivity] = useState({ activity_type: '', notes: '', walker_id: '' })
  // State for error handling
  const [error, setError] = useState<string | null>(null)

  // Function to handle adding a new activity
  const handleAddActivity = async () => {
    try {
      setError(null)
      // Send POST request to add new activity
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dog_id: dogId, ...newActivity }),
      })
      
      const data = await response.json()
      
      // Check for unsuccessful response
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add activity')
      }
      
      // Update local state and reset form
      addActivity(data)
      setNewActivity({ activity_type: '', notes: '', walker_id: '' })
      await refreshData()
    } catch (error) {
      console.error('Error adding activity:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  // Function to handle deleting an activity
  const handleDeleteActivity = async (id: string) => {
    try {
      setError(null)
      // Send DELETE request to remove activity
      const response = await fetch(`/api/activities`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      
      // Check for unsuccessful response
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Failed to delete activity. Status: ${response.status}`)
      }
      
      // Update local state and refresh data
      deleteActivity(id)
      await refreshData()
    } catch (error) {
      console.error('Error deleting activity:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Activities</h3>
      {/* Display error message if there's an error */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {/* Display list of activities or a message if no activities */}
      {activities.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="py-2">
              <p className="font-medium">{activity.activity_type}</p>
              <p className="text-sm text-gray-500">Notes: {activity.notes}</p>
              <p className="text-sm text-gray-500">Walker: {activity.walker_id}</p>
              <p className="text-sm text-gray-500">Date: {format(new Date(activity.created_at), 'PPpp')}</p>
              <button
                onClick={() => handleDeleteActivity(activity.id)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities recorded for this dog.</p>
      )}

      {/* Form for adding new activities */}
      <div className="mt-4">
        <h4 className="text-md font-semibold mb-2">Add Activity</h4>
        <select
          value={newActivity.activity_type}
          onChange={(e) => setNewActivity({ ...newActivity, activity_type: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="activityType"
          name="activityType"
        >
          <option value="">Select Activity Type</option>
          <option value="Walk">Walk</option>
          <option value="Feeding">Feeding</option>
          <option value="Play">Play</option>
          <option value="Training">Training</option>
        </select>
        <input
          type="text"
          placeholder="Notes"
          value={newActivity.notes}
          onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="activityNotes"
          name="activityNotes"
        />
        <input
          type="text"
          placeholder="Walker ID"
          value={newActivity.walker_id}
          onChange={(e) => setNewActivity({ ...newActivity, walker_id: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="walkerId"
          name="walkerId"
        />
        <button
          onClick={handleAddActivity}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default ActivitiesManager
