// Import necessary dependencies
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import DogProfileClient from './DogProfileClient'
import { Dog, Activity, Medication, HealthStatusUpdate, VeterinaryAppointment, ChronicCondition, EmergencyAlert } from '@/types/Dog'

// Define the DogProfile component as an async function
// This component fetches and displays details for a specific dog
export default async function DogProfile({ params }: { params: { id: string } }) {
  // Fetch dog data from Supabase based on the provided ID
  const { data: dog, error: dogError } = await supabase
    .from('dogs')
    .select('*')
    .eq('id', params.id)
    .single()

  // If there's an error or no dog is found with the given ID, show a 404 page
  if (dogError || !dog) {
    notFound()
  }

  // Fetch activities related to this dog
  const { data: activities, error: activitiesError } = await supabase
    .from('activities')
    .select('*')
    .eq('dog_id', params.id)
    .order('created_at', { ascending: false })

  if (activitiesError) {
    console.error('Error fetching activities:', activitiesError)
  }

  // --- Fetching New Data ---
  
  // Fetch medications
  const { data: medications, error: medicationsError } = await supabase
    .from('medications')
    .select('*')
    .eq('dog_id', params.id)

  if (medicationsError) {
    console.error('Error fetching medications:', medicationsError)
  }

  // Fetch health status updates
  const { data: healthUpdates, error: healthUpdatesError } = await supabase
    .from('health_status_updates')
    .select('*')
    .eq('dog_id', params.id)
    .order('updated_at', { ascending: false })

  if (healthUpdatesError) {
    console.error('Error fetching health status updates:', healthUpdatesError)
  }

  // Fetch veterinary appointments
  const { data: vetAppointments, error: vetAppointmentsError } = await supabase
    .from('veterinary_appointments')
    .select('*')
    .eq('dog_id', params.id)
    .order('appointment_date', { ascending: true })

  if (vetAppointmentsError) {
    console.error('Error fetching veterinary appointments:', vetAppointmentsError)
  }

  // Fetch chronic conditions
  const { data: chronicConditions, error: chronicConditionsError } = await supabase
    .from('chronic_conditions')
    .select('*')
    .eq('dog_id', params.id)

  if (chronicConditionsError) {
    console.error('Error fetching chronic conditions:', chronicConditionsError)
  }

  // Fetch emergency alerts
  const { data: emergencyAlerts, error: emergencyAlertsError } = await supabase
    .from('emergency_alerts')
    .select('*')
    .eq('dog_id', params.id)
    .order('alert_date', { ascending: false })

  if (emergencyAlertsError) {
    console.error('Error fetching emergency alerts:', emergencyAlertsError)
  }

  // --- End of Fetching New Data ---

  return (
    <DogProfileClient
      dog={dog as Dog}
      activities={activities as Activity[]}
      medications={medications as Medication[]}
      healthUpdates={healthUpdates as HealthStatusUpdate[]}
      vetAppointments={vetAppointments as VeterinaryAppointment[]}
      chronicConditions={chronicConditions as ChronicCondition[]}
      emergencyAlerts={emergencyAlerts as EmergencyAlert[]}
    />
  )
}
