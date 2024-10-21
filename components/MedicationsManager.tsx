'use client'

import { useState } from 'react'
import { useStore } from '@/hooks/useStore'

// Define props interface for MedicationsManager component
interface MedicationsManagerProps {
  dogId: string
  refreshData: () => Promise<void>
}

// MedicationsManager component for managing medications of a dog
const MedicationsManager: React.FC<MedicationsManagerProps> = ({ dogId, refreshData }) => {
  // Use custom store hook to manage medications state
  const { medications, addMedication, deleteMedication } = useStore()
  // State for new medication input
  const [newMedication, setNewMedication] = useState({ type: '', dose: '', frequency: '' })

  // Function to handle adding a new medication
  const handleAddMedication = async () => {
    try {
      // Send POST request to add new medication
      const response = await fetch('/api/medications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dog_id: dogId, ...newMedication }),
      })
      // Check for successful response
      if (response.ok) {
        const data = await response.json()
        // Update local state and reset form
        addMedication(data)
        setNewMedication({ type: '', dose: '', frequency: '' })
        await refreshData()
      } else {
        // Log error if request fails
        console.error('Error adding medication:', await response.text())
      }
    } catch (error) {
      console.error('Error in handleAddMedication:', error)
    }
  }

  // Function to handle deleting a medication
  const handleDeleteMedication = async (id: string) => {
    try {
      // Send DELETE request to remove medication
      const response = await fetch('/api/medications', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      // Check for successful response
      if (response.ok) {
        // Update local state and refresh data
        deleteMedication(id)
        await refreshData()
      } else {
        // Log error if request fails
        console.error('Error deleting medication:', await response.text())
      }
    } catch (error) {
      console.error('Error in handleDeleteMedication:', error)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Medications</h3>
      {/* Display list of medications if available */}
      {medications.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {medications.map((medication) => (
            <li key={medication.id} className="py-2 flex justify-between items-center">
              <div>
                <p className="font-medium">{medication.type}</p>
                <p className="text-sm text-gray-500">Dosage: {medication.dose}</p>
                <p className="text-sm text-gray-500">Frequency: {medication.frequency}</p>
              </div>
              <button
                onClick={() => handleDeleteMedication(medication.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No medications recorded for this dog.</p>
      )}

      {/* Form for adding a new medication */}
      <div className="mt-4">
        <h4 className="text-md font-semibold mb-2">Add Medication</h4>
        <input
          type="text"
          placeholder="Type"
          value={newMedication.type}
          onChange={(e) => setNewMedication({ ...newMedication, type: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="medicationType"
          name="medicationType"
        />
        <input
          type="text"
          placeholder="Dose"
          value={newMedication.dose}
          onChange={(e) => setNewMedication({ ...newMedication, dose: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="medicationDose"
          name="medicationDose"
        />
        <input
          type="text"
          placeholder="Frequency"
          value={newMedication.frequency}
          onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="medicationFrequency"
          name="medicationFrequency"
        />
        <button
          onClick={handleAddMedication}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default MedicationsManager
