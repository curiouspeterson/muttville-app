import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET Medications by Dog ID
 * Retrieves all medications for a specific dog.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with medications or an error
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const dog_id = url.searchParams.get('dog_id')

  // Validate that dog_id is provided
  if (!dog_id) {
    return NextResponse.json({ error: 'dog_id is required' }, { status: 400 })
  }

  // Query Supabase for medications
  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .eq('dog_id', dog_id)

  // Handle potential errors
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  // Return 404 if no medications found
  if (!data) {
    return NextResponse.json({ error: 'No medications found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

/**
 * POST Create a new Medication
 * Adds a new medication record to the database.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the created medication or an error
 */
export async function POST(request: Request) {
  const body = await request.json()
  const { dog_id, type, dose, frequency, last_administered_at } = body

  // Validate required fields
  if (!dog_id || !type || !dose || !frequency) {
    return NextResponse.json({ error: 'dog_id, type, dose, and frequency are required' }, { status: 400 })
  }

  // Insert new medication into Supabase
  const { data, error } = await supabase
    .from('medications')
    .insert([{ dog_id, type, dose, frequency, last_administered_at }])
    .select()

  // Handle potential errors and successful insertion
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'Failed to create medication' }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}

/**
 * PUT Update a Medication
 * Updates an existing medication record in the database.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the updated medication or an error
 */
export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body

  // Validate that id is provided
  if (!id) {
    return NextResponse.json({ error: 'id is required for updating medication' }, { status: 400 })
  }

  // Update medication in Supabase
  const { data, error } = await supabase
    .from('medications')
    .update(updates)
    .eq('id', id)
    .select()

  // Handle potential errors and successful update
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'Medication not found or no changes made' }, { status: 404 })
  }

  return NextResponse.json(data[0], { status: 200 })
}

/**
 * DELETE a Medication
 * Removes a medication record from the database.
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the deleted medication or an error
 */
export async function DELETE(request: Request) {
  const body = await request.json()
  const { id } = body

  // Validate that id is provided
  if (!id) {
    return NextResponse.json({ error: 'id is required for deleting medication' }, { status: 400 })
  }

  // Delete medication from Supabase
  const { data, error } = await supabase
    .from('medications')
    .delete()
    .eq('id', id)
    .select() // Return the deleted row

  // Handle potential errors and successful deletion
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'Medication not found' }, { status: 404 })
  }

  return NextResponse.json(data[0], { status: 200 })
}
