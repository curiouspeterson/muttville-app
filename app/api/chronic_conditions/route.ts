import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * API routes for managing chronic conditions of dogs
 * This file contains CRUD operations for chronic conditions
 */

/**
 * GET Chronic Conditions by Dog ID
 * Retrieves all chronic conditions for a specific dog
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} JSON response with chronic conditions or error
 */
export async function GET(request: Request) {
  // Extract dog_id from the URL query parameters
  const url = new URL(request.url)
  const dog_id = url.searchParams.get('dog_id')

  // Validate that dog_id is provided
  if (!dog_id) {
    return NextResponse.json({ error: 'dog_id is required' }, { status: 400 })
  }

  // Query Supabase for chronic conditions
  const { data, error } = await supabase
    .from('chronic_conditions')
    .select('*')
    .eq('dog_id', dog_id)

  // Handle potential errors and return the data
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

/**
 * POST Create a new Chronic Condition
 * Adds a new chronic condition record to the database
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} JSON response with the created condition or error
 */
export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json()
  const { dog_id, condition_name, diagnosis_date, management_plan } = body

  // Validate required fields
  if (!dog_id || !condition_name) {
    return NextResponse.json({ error: 'dog_id and condition_name are required' }, { status: 400 })
  }

  // Insert new chronic condition into Supabase
  const { data, error } = await supabase
    .from('chronic_conditions')
    .insert([{ dog_id, condition_name, diagnosis_date, management_plan }])

  // Handle potential errors and return the newly created condition
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data?.[0] ?? null, { status: 201 })
}

/**
 * PUT Update a Chronic Condition
 * Updates an existing chronic condition record in the database
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} JSON response with the updated condition or error
 */
export async function PUT(request: Request) {
  // Parse the request body
  const body = await request.json()
  const { id, ...updates } = body

  // Validate that id is provided
  if (!id) {
    return NextResponse.json({ error: 'id is required for updating chronic condition' }, { status: 400 })
  }

  // Update chronic condition in Supabase
  const { data, error } = await supabase
    .from('chronic_conditions')
    .update(updates)
    .eq('id', id)

  // Handle potential errors and return the updated condition
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data?.[0] ?? null, { status: 200 })
}

/**
 * DELETE a Chronic Condition
 * Removes a chronic condition record from the database
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} JSON response with the deleted condition or error
 */
export async function DELETE(request: Request) {
  // Parse the request body
  const body = await request.json()
  const { id } = body

  // Validate that id is provided
  if (!id) {
    return NextResponse.json({ error: 'id is required for deleting chronic condition' }, { status: 400 })
  }

  // Delete chronic condition from Supabase
  const { data, error } = await supabase
    .from('chronic_conditions')
    .delete()
    .eq('id', id)

  // Handle potential errors and return the deleted condition
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data?.[0] ?? null, { status: 200 })
}
