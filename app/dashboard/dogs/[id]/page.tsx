// Import necessary dependencies
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import DogProfileClient from './DogProfileClient'
import { Dog, Activity } from '@/types/Dog'

// Define the DogProfile component as an async function
// This component fetches and displays details for a specific dog
export default async function DogProfile({ params }: { params: { id: string } }) {
  // Fetch dog data from Supabase based on the provided ID
  const { data: dog, error: dogError } = await supabase
    .from('dogs')
    .select('*')
    .eq('id', params.id)
    .single()

  // If there's an error or no dog is found with the given ID, show a 404 page
  if (dogError || !dog) {
    notFound()
  }

  // Fetch activities related to this dog
  const { data: activities, error: activitiesError } = await supabase
    .from('activities')
    .select('*')
    .eq('dog_id', params.id)
    .order('created_at', { ascending: false })

  if (activitiesError) {
    console.error('Error fetching activities:', activitiesError)
  }

  // Render the DogProfileClient component with the fetched dog data and activities
  return (
    <DogProfileClient dog={dog as Dog} activities={activities as Activity[]} />
  )
}
