import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET Emergency Alerts by Dog ID
 * Retrieves all emergency alerts for a specific dog, ordered by alert date in descending order.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with emergency alerts or an error
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const dog_id = url.searchParams.get('dog_id')

  // Validate that dog_id is provided
  if (!dog_id) {
    return NextResponse.json({ error: 'dog_id is required' }, { status: 400 })
  }

  // Query Supabase for emergency alerts
  const { data, error } = await supabase
    .from('emergency_alerts')
    .select('*')
    .eq('dog_id', dog_id)
    .order('alert_date', { ascending: false })

  // Handle potential errors
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

/**
 * POST Create a new Emergency Alert
 * Adds a new emergency alert record to the database.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the created alert or an error
 */
export async function POST(request: Request) {
  const body = await request.json()
  const { dog_id, alert_message, alert_date, resolved } = body

  // Validate required fields
  if (!dog_id || !alert_message) {
    return NextResponse.json({ error: 'dog_id and alert_message are required' }, { status: 400 })
  }

  // Insert new emergency alert into Supabase
  const { data, error } = await supabase
    .from('emergency_alerts')
    .insert([{ dog_id, alert_message, alert_date, resolved }])
    .select()

  // Handle potential errors and successful insertion
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) return NextResponse.json({ error: 'Failed to create emergency alert' }, { status: 500 })
  return NextResponse.json(data[0], { status: 201 })
}

/**
 * PUT Update an Emergency Alert
 * Updates an existing emergency alert record in the database.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the updated alert or an error
 */
export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body

  // Validate that id is provided
  if (!id) {
    return NextResponse.json({ error: 'id is required for updating emergency alert' }, { status: 400 })
  }

  // Update emergency alert in Supabase
  const { data, error } = await supabase
    .from('emergency_alerts')
    .update(updates)
    .eq('id', id)
    .select()

  // Handle potential errors and successful update
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) return NextResponse.json({ error: 'Emergency alert not found' }, { status: 404 })
  return NextResponse.json(data[0], { status: 200 })
}

/**
 * DELETE an Emergency Alert
 * Removes an emergency alert record from the database.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response confirming deletion or an error
 */
export async function DELETE(request: Request) {
  const body = await request.json()
  const { id } = body

  // Validate that id is provided
  if (!id) {
    return NextResponse.json({ error: 'id is required for deleting emergency alert' }, { status: 400 })
  }

  // Delete emergency alert from Supabase
  const { data, error } = await supabase
    .from('emergency_alerts')
    .delete()
    .eq('id', id)
    .select()

  // Handle potential errors and successful deletion
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) return NextResponse.json({ error: 'Emergency alert not found' }, { status: 404 })
  return NextResponse.json({ message: 'Emergency alert deleted successfully' }, { status: 200 })
}
