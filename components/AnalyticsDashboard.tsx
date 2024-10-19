// Import the Bar component from react-chartjs-2 for creating bar charts
import { Bar } from 'react-chartjs-2'

// Define the AnalyticsDashboard component
export default function AnalyticsDashboard() {
  // Define the data structure for the bar chart
  const data = {
    // X-axis labels representing different dogs
    labels: ['Dog 1', 'Dog 2', 'Dog 3'],
    datasets: [
      {
        // Dataset label
        label: 'Walks',
        // Y-axis data representing the number of walks for each dog
        data: [12, 19, 3],
        // Color of the bars in the chart
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  }

  // Render the Bar component with the defined data
  // This will create a bar chart visualizing the number of walks for each dog
  return <Bar data={data} />
}
