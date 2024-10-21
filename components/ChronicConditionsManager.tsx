'use client'

import { useState } from 'react'
import { useStore } from '@/hooks/useStore'
import { format } from 'date-fns'

// Define props interface for ChronicConditionsManager component
interface ChronicConditionsManagerProps {
  dogId: string
  refreshData: () => Promise<void>
}

// ChronicConditionsManager component for managing chronic conditions of a dog
const ChronicConditionsManager: React.FC<ChronicConditionsManagerProps> = ({ dogId, refreshData }) => {
  // Use custom store hook to manage chronic conditions state
  const { chronicConditions, addChronicCondition, deleteChronicCondition } = useStore()
  // State for new condition input
  const [newCondition, setNewCondition] = useState({ condition_name: '', diagnosis_date: '', management_plan: '' })
  // State for error handling
  const [error, setError] = useState<string | null>(null)

  // Function to handle adding a new chronic condition
  const handleAddCondition = async () => {
    try {
      setError(null)
      // Send POST request to add new chronic condition
      const response = await fetch('/api/chronic_conditions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dog_id: dogId, ...newCondition }),
      })
      // Check for unsuccessful response
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add chronic condition')
      }
      const data = await response.json()
      // Update local state and reset form
      addChronicCondition(data)
      setNewCondition({ condition_name: '', diagnosis_date: '', management_plan: '' })
      await refreshData()
    } catch (error) {
      console.error('Error adding chronic condition:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  // Function to handle deleting a chronic condition
  const handleDeleteCondition = async (id: string) => {
    try {
      setError(null)
      // Send DELETE request to remove chronic condition
      const response = await fetch(`/api/chronic_conditions?id=${id}`, {
        method: 'DELETE',
      })
      // Check for unsuccessful response
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete chronic condition')
      }
      // Update local state and refresh data
      deleteChronicCondition(id)
      await refreshData()
    } catch (error) {
      console.error('Error deleting chronic condition:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Chronic Conditions</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {/* Display list of chronic conditions if available */}
      {chronicConditions && chronicConditions.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {chronicConditions.map((condition) => (
            condition && (
              <li key={condition.id} className="py-2">
                <p className="font-medium">{condition.condition_name}</p>
                <p className="text-sm text-gray-500">
                  Diagnosed: {condition.diagnosis_date ? format(new Date(condition.diagnosis_date), 'PP') : 'N/A'}
                </p>
                <p className="text-sm text-gray-500">Management Plan: {condition.management_plan || 'N/A'}</p>
                <button
                  onClick={() => handleDeleteCondition(condition.id)}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </li>
            )
          ))}
        </ul>
      ) : (
        <p>No chronic conditions recorded for this dog.</p>
      )}

      {/* Form to add new chronic condition */}
      <div className="mt-4">
        <h4 className="text-md font-semibold mb-2">Add Chronic Condition</h4>
        <input
          type="text"
          placeholder="Condition Name"
          value={newCondition.condition_name}
          onChange={(e) => setNewCondition({ ...newCondition, condition_name: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="conditionName"
          name="conditionName"
        />
        <input
          type="date"
          value={newCondition.diagnosis_date}
          onChange={(e) => setNewCondition({ ...newCondition, diagnosis_date: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="diagnosisDate"
          name="diagnosisDate"
        />
        <input
          type="text"
          placeholder="Management Plan"
          value={newCondition.management_plan}
          onChange={(e) => setNewCondition({ ...newCondition, management_plan: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="managementPlan"
          name="managementPlan"
        />
        <button
          onClick={handleAddCondition}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default ChronicConditionsManager
