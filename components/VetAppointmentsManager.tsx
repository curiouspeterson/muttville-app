'use client'

import { useState } from 'react'
import { useStore } from '@/hooks/useStore'
import { format } from 'date-fns'

interface VetAppointmentsManagerProps {
  dogId: string
  refreshData: () => Promise<void>
}

const VetAppointmentsManager: React.FC<VetAppointmentsManagerProps> = ({ dogId, refreshData }) => {
  const { veterinaryAppointments, addVeterinaryAppointment, deleteVeterinaryAppointment } = useStore()
  const [newAppointment, setNewAppointment] = useState({ appointment_date: '', vet_recommendations: '', follow_up_instructions: '' })

  const handleAddAppointment = async () => {
    const response = await fetch('/api/veterinary_appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dog_id: dogId, ...newAppointment }),
    })
    if (response.ok) {
      const data = await response.json()
      addVeterinaryAppointment(data)
      setNewAppointment({ appointment_date: '', vet_recommendations: '', follow_up_instructions: '' })
      await refreshData()
    } else {
      console.error('Error adding vet appointment:', await response.text())
    }
  }

  const handleDeleteAppointment = async (id: string) => {
    const response = await fetch(`/api/veterinary_appointments?id=${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      deleteVeterinaryAppointment(id)
      await refreshData()
    } else {
      console.error('Error deleting vet appointment:', await response.text())
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Veterinary Appointments</h3>
      {veterinaryAppointments.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {veterinaryAppointments.map((appointment) => (
            <li key={appointment.id} className="py-2">
              <p className="font-medium">Date: {format(new Date(appointment.appointment_date), 'PPpp')}</p>
              <p className="text-sm text-gray-500">Recommendations: {appointment.vet_recommendations}</p>
              <p className="text-sm text-gray-500">Follow-up: {appointment.follow_up_instructions}</p>
              <button
                onClick={() => handleDeleteAppointment(appointment.id)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No veterinary appointments recorded for this dog.</p>
      )}

      <div className="mt-4">
        <h4 className="text-md font-semibold mb-2">Add Veterinary Appointment</h4>
        <input
          type="datetime-local"
          value={newAppointment.appointment_date}
          onChange={(e) => setNewAppointment({ ...newAppointment, appointment_date: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="appointmentDate"
          name="appointmentDate"
        />
        <input
          type="text"
          placeholder="Vet Recommendations"
          value={newAppointment.vet_recommendations}
          onChange={(e) => setNewAppointment({ ...newAppointment, vet_recommendations: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="vetRecommendations"
          name="vetRecommendations"
        />
        <input
          type="text"
          placeholder="Follow-up Instructions"
          value={newAppointment.follow_up_instructions}
          onChange={(e) => setNewAppointment({ ...newAppointment, follow_up_instructions: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="followUpInstructions"
          name="followUpInstructions"
        />
        <button
          onClick={handleAddAppointment}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default VetAppointmentsManager
