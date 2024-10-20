'use client'

import { useState } from 'react'
import { useStore } from '@/hooks/useStore'

interface MedicationsManagerProps {
  dogId: string
  refreshData: () => Promise<void>
}

const MedicationsManager: React.FC<MedicationsManagerProps> = ({ dogId, refreshData }) => {
  const { medications, addMedication, deleteMedication } = useStore()
  const [newMedication, setNewMedication] = useState({ type: '', dose: '', frequency: '' })

  const handleAddMedication = async () => {
    const response = await fetch('/api/medications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dog_id: dogId, ...newMedication }),
    })
    if (response.ok) {
      const data = await response.json()
      addMedication(data)
      setNewMedication({ type: '', dose: '', frequency: '' })
      await refreshData()
    } else {
      console.error('Error adding medication:', await response.text())
    }
  }

  const handleDeleteMedication = async (id: string) => {
    const response = await fetch('/api/medications', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (response.ok) {
      deleteMedication(id)
      await refreshData()
    } else {
      console.error('Error deleting medication:', await response.text())
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Medications</h3>
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

      {/* --- Add New Medication Form --- */}
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
