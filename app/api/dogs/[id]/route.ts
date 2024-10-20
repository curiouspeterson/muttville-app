import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET handler for retrieving comprehensive dog information
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters
 * @param {string} params.id - The ID of the dog to retrieve
 * @returns {NextResponse} JSON response with dog data or error
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const dogId = params.id

  // Fetch all related data for the dog in parallel
  const [
    { data: dog, error: dogError },
    { data: activities, error: activitiesError },
    { data: medications, error: medicationsError },
    { data: healthUpdates, error: healthUpdatesError },
    { data: vetAppointments, error: vetAppointmentsError },
    { data: chronicConditions, error: chronicConditionsError },
    { data: emergencyAlerts, error: emergencyAlertsError }
  ] = await Promise.all([
    supabase.from('dogs').select('*').eq('id', dogId).single(),
    supabase.from('activities').select('*').eq('dog_id', dogId),
    supabase.from('medications').select('*').eq('dog_id', dogId),
    supabase.from('health_status_updates').select('*').eq('dog_id', dogId),
    supabase.from('veterinary_appointments').select('*').eq('dog_id', dogId),
    supabase.from('chronic_conditions').select('*').eq('dog_id', dogId),
    supabase.from('emergency_alerts').select('*').eq('dog_id', dogId)
  ])

  // Check for errors in fetching any data
  const errors = [dogError, activitiesError, medicationsError, healthUpdatesError, vetAppointmentsError, chronicConditionsError, emergencyAlertsError].filter(Boolean);
  if (errors.length > 0) {
    return NextResponse.json({ error: "Failed to fetch complete dog data", details: errors.map(e => e?.message || 'Unknown error') }, { status: 500 });
  }

  // Return all fetched data as a JSON response
  return NextResponse.json({
    dog,
    activities,
    medications,
    healthUpdates,
    vetAppointments,
    chronicConditions,
    emergencyAlerts
  })
}
