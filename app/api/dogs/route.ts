import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET handler for retrieving all dogs
 * @returns {Promise<NextResponse>} JSON response with all dogs or an error
 */
export async function GET() {
  // Fetch all dogs from the 'dogs' table
  const { data, error } = await supabase.from('dogs').select('*');
  
  // Handle potential errors
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Return the fetched data
  return NextResponse.json(data);
}

/**
 * POST handler for creating a new dog
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the created dog data or an error
 */
export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  
  // Insert the new dog into the 'dogs' table
  const { data, error } = await supabase.from('dogs').insert(body);
  
  // Handle potential errors
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Return the created dog data with a 201 status code
  return NextResponse.json(data, { status: 201 });
}

/**
 * PUT handler for updating an existing dog
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the updated dog data or an error
 */
export async function PUT(request: Request) {
  // Parse the request body
  const body = await request.json();
  
  // Destructure the id and updates from the body
  const { id, ...updates } = body;
  
  // Check if an id is provided
  if (!id) {
    return NextResponse.json({ error: 'ID is required for updating a dog.' }, { status: 400 });
  }
  
  // Update the dog in the 'dogs' table
  const { data, error } = await supabase.from('dogs').update(updates).eq('id', id);
  
  // Handle potential errors
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Return the updated dog data
  return NextResponse.json(data, { status: 200 });
}

/**
 * DELETE handler for removing a dog
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with the deleted dog data or an error
 */
export async function DELETE(request: Request) {
  // Parse the request body
  const body = await request.json();
  
  // Extract the id from the body
  const { id } = body;
  
  // Check if an id is provided
  if (!id) {
    return NextResponse.json({ error: 'ID is required for deleting a dog.' }, { status: 400 });
  }
  
  // Delete the dog from the 'dogs' table
  const { data, error } = await supabase.from('dogs').delete().eq('id', id);
  
  // Handle potential errors
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Return the deleted dog data
  return NextResponse.json(data, { status: 200 });
}
