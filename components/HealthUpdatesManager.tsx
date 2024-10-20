'use client'

import { useState } from 'react'
import { useStore } from '@/hooks/useStore'

// Define props interface for HealthUpdatesManager component
interface HealthUpdatesManagerProps {
  dogId: string
  refreshData: () => Promise<void>
}

// HealthUpdatesManager component for managing health updates of a dog
const HealthUpdatesManager: React.FC<HealthUpdatesManagerProps> = ({ dogId, refreshData }) => {
  // Use custom store hook to manage health status updates state
  const { healthStatusUpdates, addHealthStatusUpdate, deleteHealthStatusUpdate } = useStore()
  // State for new health update input
  const [newHealthUpdate, setNewHealthUpdate] = useState({ symptoms: '', behavior_changes: '', concerns: '' })
  // State for error handling
  const [error, setError] = useState<string | null>(null)

  // Function to handle adding a new health update
  const handleAddHealthUpdate = async () => {
    try {
      setError(null)
      // Send POST request to add new health update
      const response = await fetch('/api/health_updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dog_id: dogId, ...newHealthUpdate }),
      })
      // Check for unsuccessful response
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add health update')
      }
      const data = await response.json()
      // Update local state and reset form
      addHealthStatusUpdate(data)
      setNewHealthUpdate({ symptoms: '', behavior_changes: '', concerns: '' })
      await refreshData()
    } catch (error) {
      console.error('Error adding health update:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  // Function to handle deleting a health update
  const handleDeleteHealthUpdate = async (id: string) => {
    try {
      setError(null)
      // Send DELETE request to remove health update
      const response = await fetch(`/api/health_updates?id=${id}`, {
        method: 'DELETE',
      })
      // Check for unsuccessful response
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete health update')
      }
      // Update local state and refresh data
      deleteHealthStatusUpdate(id)
      await refreshData()
    } catch (error) {
      console.error('Error deleting health update:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Health Updates</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {/* Display list of health updates if available */}
      {healthStatusUpdates.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {healthStatusUpdates.map((update) => (
            <li key={update.id} className="py-2">
              <p className="font-medium">Symptoms: {update.symptoms}</p>
              <p className="text-sm text-gray-500">Behavior Changes: {update.behavior_changes}</p>
              <p className="text-sm text-gray-500">Concerns: {update.concerns}</p>
              <button
                onClick={() => handleDeleteHealthUpdate(update.id)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No health updates recorded for this dog.</p>
      )}

      {/* Form for adding new health updates */}
      <div className="mt-4">
        <h4 className="text-md font-semibold mb-2">Add Health Update</h4>
        <input
          type="text"
          placeholder="Symptoms"
          value={newHealthUpdate.symptoms}
          onChange={(e) => setNewHealthUpdate({ ...newHealthUpdate, symptoms: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="healthSymptoms"
          name="healthSymptoms"
        />
        <input
          type="text"
          placeholder="Behavior Changes"
          value={newHealthUpdate.behavior_changes}
          onChange={(e) => setNewHealthUpdate({ ...newHealthUpdate, behavior_changes: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="healthBehaviorChanges"
          name="healthBehaviorChanges"
        />
        <input
          type="text"
          placeholder="Concerns"
          value={newHealthUpdate.concerns}
          onChange={(e) => setNewHealthUpdate({ ...newHealthUpdate, concerns: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="healthConcerns"
          name="healthConcerns"
        />
        <button
          onClick={handleAddHealthUpdate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default HealthUpdatesManager
