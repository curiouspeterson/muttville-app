'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Bar } from 'react-chartjs-2'
import { ChartData } from 'chart.js';

// Remove or comment out the unused interface
// interface Walk {
//   dog_id: string;
//   count: number;
// }

export default function AnalyticsDashboard() {
  const [data, setData] = useState<ChartData<'bar', number[], string> | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data: walks, error } = await supabase
        .from('activities')
        .select('dog_id, count(*)', { count: 'exact' })
        .eq('activity_type', 'Walk')

      if (error) {
        console.error('Error fetching walks:', error)
        return
      }

      // Correctly map count to number
      const typedWalks = walks.map(w => ({
        dog_id: w.dog_id as string,
        count: Array.isArray(w.count) ? w.count.length : Number(w.count),
      }))

      const labels = typedWalks.map(w => w.dog_id)
      const walkData = typedWalks.map(w => w.count) // No need for parseInt now

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

    fetchData()
  }, [])

  if (!data) return <div>Loading...</div>

  return <Bar data={data} />
}
