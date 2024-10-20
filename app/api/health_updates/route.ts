import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET Health Updates by Dog ID
export async function GET(request: Request) {
  const url = new URL(request.url)
  const dog_id = url.searchParams.get('dog_id')

  if (!dog_id) {
    return NextResponse.json({ error: 'dog_id is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('health_status_updates')
    .select('*')
    .eq('dog_id', dog_id)
    .order('updated_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST Create a new Health Status Update
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received body:', body)  // Log the received body

    const { dog_id, symptoms, behavior_changes, concerns } = body

    if (!dog_id) {
      return NextResponse.json({ error: 'dog_id is required' }, { status: 400 })
    }

    console.log('Inserting health update:', { dog_id, symptoms, behavior_changes, concerns })  // Log the data being inserted

    const { data, error } = await supabase
      .from('health_status_updates')
      .insert([{ dog_id, symptoms, behavior_changes, concerns }])
      .select()

    if (error) {
      console.error('Supabase error:', error)  // Log any Supabase errors
      throw error
    }

    console.log('Inserted data:', data)  // Log the inserted data

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Error creating health update:', error)
    return NextResponse.json({ error: 'An error occurred while creating the health update' }, { status: 500 })
  }
}

// PUT Update a Health Status Update
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'id is required for updating health status update' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('health_status_updates')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error
    return NextResponse.json(data[0], { status: 200 })
  } catch (error) {
    console.error('Error updating health update:', error)
    return NextResponse.json({ error: 'An error occurred while updating the health update' }, { status: 500 })
  }
}

// DELETE a Health Status Update
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required for deleting health status update' }, { status: 400 })
    }

    const { error } = await supabase
      .from('health_status_updates')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ message: 'Health update deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting health update:', error)
    return NextResponse.json({ error: 'An error occurred while deleting the health update' }, { status: 500 })
  }
}
