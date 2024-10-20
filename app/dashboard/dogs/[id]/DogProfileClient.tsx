'use client'
    
import { Dog, Activity, Medication, HealthStatusUpdate, VeterinaryAppointment, ChronicCondition, EmergencyAlert } from '@/types/Dog'
import { format } from 'date-fns'
import { useStore } from '@/hooks/useStore'
import { useEffect } from 'react'
import MedicationsManager from '@/components/MedicationsManager'
import HealthUpdatesManager from '@/components/HealthUpdatesManager'
import VetAppointmentsManager from '@/components/VetAppointmentsManager'
import ChronicConditionsManager from '@/components/ChronicConditionsManager'
import EmergencyAlertsManager from '@/components/EmergencyAlertsManager'
import ActivitiesManager from '@/components/ActivitiesManager'
    
interface DogProfileClientProps {
  dog: Dog
  activities: Activity[]
  medications: Medication[]
  healthUpdates: HealthStatusUpdate[]
  vetAppointments: VeterinaryAppointment[]
  chronicConditions: ChronicCondition[]
  emergencyAlerts: EmergencyAlert[]
}

export default function DogProfileClient({
  dog,
  activities,
  medications,
  healthUpdates,
  vetAppointments,
  chronicConditions,
  emergencyAlerts,
}: DogProfileClientProps) {
  const {
    setActivities,
    setMedications,
    setHealthStatusUpdates,
    setVeterinaryAppointments,
    setChronicConditions,
    setEmergencyAlerts,
  } = useStore()

  // Initialize store with server-fetched data
  useEffect(() => {
    setActivities(activities)
    setMedications(medications)
    setHealthStatusUpdates(healthUpdates)
    setVeterinaryAppointments(vetAppointments)
    setChronicConditions(chronicConditions)
    setEmergencyAlerts(emergencyAlerts)
  }, [activities, medications, healthUpdates, vetAppointments, chronicConditions, emergencyAlerts])

  // Function to refresh all data
  const refreshData = async () => {
    const response = await fetch(`/api/dogs/${dog.id}`)
    if (response.ok) {
      const data = await response.json()
      setActivities(data.activities)
      setMedications(data.medications)
      setHealthStatusUpdates(data.healthUpdates)
      setVeterinaryAppointments(data.vetAppointments)
      setChronicConditions(data.chronicConditions)
      setEmergencyAlerts(data.emergencyAlerts)
    }
  }

  // Refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshData, 30000)
    return () => clearInterval(interval)
  }, [dog.id])

  const lastFeeding = activities
    .filter(a => a.activity_type === 'Feeding')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]

  const lastWalk = activities
    .filter(a => a.activity_type === 'Walk')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{dog.name}</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Dog Details</h2>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="font-medium text-gray-500">Age</dt>
            <dd>{dog.age} years</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Breed</dt>
            <dd>{dog.breed}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Health Status</dt>
            <dd>{dog.health_status}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Status</dt>
            <dd>{dog.status}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-medium text-gray-500">Notes</dt>
            <dd>{dog.notes}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-medium text-gray-500">Created At</dt>
            <dd>{format(new Date(dog.created_at), 'PPpp')}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Temperament</dt>
            <dd>{dog.temperament}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Last Fed</dt>
            <dd>{lastFeeding ? format(new Date(lastFeeding.created_at), 'PPpp') : 'Never'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Last Walked</dt>
            <dd>{lastWalk ? format(new Date(lastWalk.created_at), 'PPpp') : 'Never'}</dd>
          </div>
        </dl>
      </div>
    
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <MedicationsManager dogId={dog.id} refreshData={refreshData} />
      </div>
    
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <HealthUpdatesManager dogId={dog.id} refreshData={refreshData} />
      </div>
    
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <VetAppointmentsManager dogId={dog.id} refreshData={refreshData} />
      </div>
    
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <ChronicConditionsManager dogId={dog.id} refreshData={refreshData} />
      </div>
    
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <EmergencyAlertsManager dogId={dog.id} refreshData={refreshData} />
      </div>
    
      <div className="bg-white shadow-md rounded-lg p-6">
        <ActivitiesManager dogId={dog.id} refreshData={refreshData} />
      </div>
    </div>
  )
}
