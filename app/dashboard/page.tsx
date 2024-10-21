// Import necessary components for the dashboard
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import CareCalendar from '@/components/CareCalendar';

// Define the main dashboard page component
export default function DashboardPage() {
  return (
    <div>
      {/* Main heading for the dashboard */}
      <h1>Dashboard</h1>
      
      {/* Component to display analytics data */}
      <AnalyticsDashboard />
      
      {/* Component to show care-related calendar events */}
      <CareCalendar />
    </div>
  )
}
