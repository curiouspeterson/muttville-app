import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET Veterinary Appointments by Dog ID
export async function GET(request: Request) {
  const url = new URL(request.url)
  const dog_id = url.searchParams.get('dog_id')

  if (!dog_id) {
    return NextResponse.json({ error: 'dog_id is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('veterinary_appointments')
    .select('*')
    .eq('dog_id', dog_id)
    .order('appointment_date', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) return NextResponse.json({ error: 'No data found' }, { status: 404 })
  return NextResponse.json(data[0], { status: 200 })
}

// POST Create a new Veterinary Appointment
export async function POST(request: Request) {
  const body = await request.json()
  const { dog_id, appointment_date, vet_recommendations, follow_up_instructions } = body

  if (!dog_id || !appointment_date) {
    return NextResponse.json({ error: 'dog_id and appointment_date are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('veterinary_appointments')
    .insert([{ dog_id, appointment_date, vet_recommendations, follow_up_instructions }])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  return NextResponse.json(data[0], { status: 201 })
}

// PUT Update a Veterinary Appointment
export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: 'id is required for updating veterinary appointment' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('veterinary_appointments')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) return NextResponse.json({ error: 'No appointment found to update' }, { status: 404 })
  return NextResponse.json(data[0], { status: 200 })
}

// DELETE a Veterinary Appointment
export async function DELETE(request: Request) {
  const body = await request.json()
  const { id } = body

  if (!id) {
    return NextResponse.json({ error: 'id is required for deleting veterinary appointment' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('veterinary_appointments')
    .delete()
    .eq('id', id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) return NextResponse.json({ error: 'No appointment found to delete' }, { status: 404 })
  return NextResponse.json({ message: 'Appointment deleted successfully' }, { status: 200 })
}
