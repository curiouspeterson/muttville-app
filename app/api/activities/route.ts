import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET Activities by Dog ID
 * Retrieves all activities for a specific dog, ordered by creation date.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const dog_id = url.searchParams.get('dog_id')

  // Validate that dog_id is provided
  if (!dog_id) {
    return NextResponse.json({ error: 'dog_id is required' }, { status: 400 })
  }

  // Query Supabase for activities
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('dog_id', dog_id)
    .order('created_at', { ascending: false })

  // Handle potential errors
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

/**
 * POST Create a new Activity
 * Adds a new activity record to the database.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received body:', body)

    const { dog_id, walker_id, activity_type, notes, temperament_notes } = body

    if (!dog_id || !walker_id || !activity_type) {
      return NextResponse.json({ error: 'dog_id, walker_id, and activity_type are required' }, { status: 400 })
    }

    console.log('Inserting activity:', { dog_id, walker_id, activity_type, notes, temperament_notes })

    const { data, error } = await supabase
      .from('activities')
      .insert([{ dog_id, walker_id, activity_type, notes, temperament_notes }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: `Supabase error: ${error.message}` }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No data returned after insertion' }, { status: 500 })
    }

    console.log('Inserted data:', data[0])

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 })
  }
}

/**
 * PUT Update an Activity
 * Updates an existing activity record in the database.
 */
export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body

  // Validate that id is provided
  if (!id) {
    return NextResponse.json({ error: 'id is required for updating activity' }, { status: 400 })
  }

  // Update activity in Supabase
  const { data, error } = await supabase
    .from('activities')
    .update(updates)
    .eq('id', id)

  // Handle potential errors and return the updated activity
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data?.[0] ?? null, { status: 200 })
}

/**
 * DELETE an Activity
 * Removes an activity record from the database.
 */
export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'id is required for deleting activity' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id)
      .select()

    if (error) throw error

    if (data && data.length > 0) {
      return NextResponse.json(data[0], { status: 200 })
    } else {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error deleting activity:', error)
    return NextResponse.json({ error: 'An error occurred while deleting the activity' }, { status: 500 })
  }
}
