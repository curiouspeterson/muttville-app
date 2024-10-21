'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Bar } from 'react-chartjs-2'
import { ChartData } from 'chart.js';

// AnalyticsDashboard component for displaying walk data for dogs
export default function AnalyticsDashboard() {
  // State to hold the chart data, initialized as null
  const [data, setData] = useState<ChartData<'bar', number[], string> | null>(null)

  useEffect(() => {
    // Function to fetch and process walk data from Supabase
    const fetchData = async () => {
      // Query Supabase for walk activities, counting occurrences for each dog
      const { data: walks, error } = await supabase
        .from('activities')
        .select('dog_id, count(*)', { count: 'exact' })
        .eq('activity_type', 'Walk')

      // Handle any errors during data fetching
      if (error) {
        console.error('Error fetching walks:', error)
        return
      }

      // Process the fetched data into a format suitable for the chart
      const typedWalks = walks.map(w => ({
        dog_id: w.dog_id as string,
        // Handle potential array or number return types for count
        count: Array.isArray(w.count) ? w.count.length : Number(w.count),
      }))

      // Extract labels (dog IDs) and data (walk counts) for the chart
      const labels = typedWalks.map(w => w.dog_id)
      const walkData = typedWalks.map(w => w.count)

      // Set the processed data for the chart
      setData({
        labels,
        datasets: [
          {
            label: 'Walks',
            data: walkData,
            backgroundColor: 'rgba(75,192,192,0.6)',
          },
        ],
      })
    }

    // Call the fetchData function when the component mounts
    fetchData()
  }, []) // Empty dependency array ensures this effect runs only once on mount

  // Display a loading message while data is being fetched
  if (!data) return <div>Loading...</div>

  // Render the Bar chart component with the processed data
  return <Bar data={data} />
}
