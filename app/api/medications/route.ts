import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET Medications by Dog ID
export async function GET(request: Request) {
  const url = new URL(request.url)
  const dog_id = url.searchParams.get('dog_id')

  if (!dog_id) {
    return NextResponse.json({ error: 'dog_id is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .eq('dog_id', dog_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  if (!data) {
    return NextResponse.json({ error: 'No medications found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

// POST Create a new Medication
export async function POST(request: Request) {
  const body = await request.json()
  const { dog_id, type, dose, frequency, last_administered_at } = body

  if (!dog_id || !type || !dose || !frequency) {
    return NextResponse.json({ error: 'dog_id, type, dose, and frequency are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('medications')
    .insert([{ dog_id, type, dose, frequency, last_administered_at }])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'Failed to create medication' }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}

// PUT Update a Medication
export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: 'id is required for updating medication' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('medications')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'Medication not found or no changes made' }, { status: 404 })
  }

  return NextResponse.json(data[0], { status: 200 })
}

// DELETE a Medication
export async function DELETE(request: Request) {
  const body = await request.json()
  const { id } = body

  if (!id) {
    return NextResponse.json({ error: 'id is required for deleting medication' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('medications')
    .delete()
    .eq('id', id)
    .select() // Add this line to return the deleted row

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'Medication not found' }, { status: 404 })
  }

  return NextResponse.json(data[0], { status: 200 })
}
