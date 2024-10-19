// Import necessary dependencies
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import DogProfileClient from './DogProfileClient'

// Define the DogProfile component as an async function
// This component fetches and displays details for a specific dog
export default async function DogProfile({ params }: { params: { id: string } }) {
  // Fetch dog data from Supabase based on the provided ID
  const { data: dog, error } = await supabase
    .from('dogs')
    .select('*')
    .eq('id', params.id)
    .single()

  // If there's an error or no dog is found with the given ID, show a 404 page
  if (error || !dog) {
    notFound()
  }

  // Render the DogProfileClient component with the fetched dog data
  return (
    <DogProfileClient dog={dog} />
  )
}
