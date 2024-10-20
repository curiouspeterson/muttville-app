import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET Emergency Alerts by Dog ID
export async function GET(request: Request) {
  const url = new URL(request.url)
  const dog_id = url.searchParams.get('dog_id')

  if (!dog_id) {
    return NextResponse.json({ error: 'dog_id is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('emergency_alerts')
    .select('*')
    .eq('dog_id', dog_id)
    .order('alert_date', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST Create a new Emergency Alert
export async function POST(request: Request) {
  const body = await request.json()
  const { dog_id, alert_message, alert_date, resolved } = body

  if (!dog_id || !alert_message) {
    return NextResponse.json({ error: 'dog_id and alert_message are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('emergency_alerts')
    .insert([{ dog_id, alert_message, alert_date, resolved }])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0], { status: 201 })
}

// PUT Update an Emergency Alert
export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: 'id is required for updating emergency alert' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('emergency_alerts')
    .update(updates)
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0], { status: 200 })
}

// DELETE an Emergency Alert
export async function DELETE(request: Request) {
  const body = await request.json()
  const { id } = body

  if (!id) {
    return NextResponse.json({ error: 'id is required for deleting emergency alert' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('emergency_alerts')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0], { status: 200 })
}
