'use client'

import { useState } from 'react'
import { useStore } from '@/hooks/useStore'
import { format } from 'date-fns'

interface EmergencyAlertsManagerProps {
  dogId: string
  refreshData: () => Promise<void>
}

const EmergencyAlertsManager: React.FC<EmergencyAlertsManagerProps> = ({ dogId, refreshData }) => {
  const { emergencyAlerts, addEmergencyAlert, deleteEmergencyAlert } = useStore()
  const [newAlert, setNewAlert] = useState({ alert_message: '', alert_date: '' })

  const handleAddAlert = async () => {
    try {
      const response = await fetch('/api/emergency_alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dog_id: dogId, ...newAlert }),
      })
      if (!response.ok) {
        throw new Error('Failed to add emergency alert')
      }
      const data = await response.json()
      addEmergencyAlert(data)
      setNewAlert({ alert_message: '', alert_date: '' })
      await refreshData()
    } catch (error) {
      console.error('Error adding emergency alert:', error)
    }
  }

  const handleDeleteAlert = async (id: string) => {
    try {
      const response = await fetch(`/api/emergency_alerts?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete emergency alert')
      }
      deleteEmergencyAlert(id)
      await refreshData()
    } catch (error) {
      console.error('Error deleting emergency alert:', error)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Emergency Alerts</h3>
      {emergencyAlerts.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {emergencyAlerts.map((alert) => (
            <li key={alert.id} className="py-2">
              <p className="font-medium text-red-600">Alert: {alert.alert_message}</p>
              <p className="text-sm text-gray-500">Date: {format(new Date(alert.alert_date), 'PPpp')}</p>
              <button
                onClick={() => handleDeleteAlert(alert.id)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No emergency alerts for this dog.</p>
      )}

      <div className="mt-4">
        <h4 className="text-md font-semibold mb-2">Add Emergency Alert</h4>
        <input
          type="text"
          placeholder="Alert Message"
          value={newAlert.alert_message}
          onChange={(e) => setNewAlert({ ...newAlert, alert_message: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="alertMessage"
          name="alertMessage"
        />
        <input
          type="datetime-local"
          value={newAlert.alert_date}
          onChange={(e) => setNewAlert({ ...newAlert, alert_date: e.target.value })}
          className="mr-2 p-1 border rounded"
          id="alertDate"
          name="alertDate"
        />
        <button
          onClick={handleAddAlert}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default EmergencyAlertsManager
