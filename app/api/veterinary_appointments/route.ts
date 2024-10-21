import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET Veterinary Appointments by Dog ID
 * Retrieves all veterinary appointments for a specific dog, ordered by appointment date.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with appointments or an error
 */
export async function GET(request: Request) {
  // Extract dog_id from the request URL
  const url = new URL(request.url)
  const dog_id = url.searchParams.get('dog_id')

  // Validate that dog_id is provided
  if (!dog_id) {
    return NextResponse.json({ error: 'dog_id is required' }, { status: 400 })
  }

  // Query Supabase for veterinary appointments
  const { data, error } = await supabase
    .from('veterinary_appointments')
    .select('*')
    .eq('dog_id', dog_id)
    .order('appointment_date', { ascending: true })

  // Handle potential errors and no data scenarios
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) return NextResponse.json({ error: 'No data found' }, { status: 404 })
  
  // Return the first appointment (assuming we want only one)
  return NextResponse.json(data[0], { status: 200 })
}

/**
 * POST Create a new Veterinary Appointment
 * Adds a new veterinary appointment record to the database.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the created appointment or an error
 */
export async function POST(request: Request) {
  const body = await request.json()
  const { dog_id, appointment_date, vet_recommendations, follow_up_instructions } = body

  // Validate required fields
  if (!dog_id || !appointment_date) {
    return NextResponse.json({ error: 'dog_id and appointment_date are required' }, { status: 400 })
  }

  // Insert new appointment into Supabase
  const { data, error } = await supabase
    .from('veterinary_appointments')
    .insert([{ dog_id, appointment_date, vet_recommendations, follow_up_instructions }])
    .select()

  // Handle potential errors and successful insertion
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  return NextResponse.json(data[0], { status: 201 })
}

/**
 * PUT Update a Veterinary Appointment
 * Updates an existing veterinary appointment record in the database.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the updated appointment or an error
 */
export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body

  // Validate that id is provided
  if (!id) {
    return NextResponse.json({ error: 'id is required for updating veterinary appointment' }, { status: 400 })
  }

  // Update appointment in Supabase
  const { data, error } = await supabase
    .from('veterinary_appointments')
    .update(updates)
    .eq('id', id)
    .select()

  // Handle potential errors and successful update
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) return NextResponse.json({ error: 'No appointment found to update' }, { status: 404 })
  return NextResponse.json(data[0], { status: 200 })
}

/**
 * DELETE a Veterinary Appointment
 * Removes a veterinary appointment record from the database.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response confirming deletion or an error
 */
export async function DELETE(request: Request) {
  const body = await request.json()
  const { id } = body

  // Validate that id is provided
  if (!id) {
    return NextResponse.json({ error: 'id is required for deleting veterinary appointment' }, { status: 400 })
  }

  // Delete appointment from Supabase
  const { data, error } = await supabase
    .from('veterinary_appointments')
    .delete()
    .eq('id', id)
    .select()

  // Handle potential errors and successful deletion
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) return NextResponse.json({ error: 'No appointment found to delete' }, { status: 404 })
  return NextResponse.json({ message: 'Appointment deleted successfully' }, { status: 200 })
}
