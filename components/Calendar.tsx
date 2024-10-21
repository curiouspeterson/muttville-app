// Import necessary dependencies for the calendar component
import { Calendar, momentLocalizer, Event as CalendarEvent } from 'react-big-calendar'
import moment from 'moment'
import { useQuery } from 'react-query';

// Define the structure of an activity
interface Activity {
  activity_type: string;
  created_at: string;
}

// Create a localizer for the calendar using moment.js
const localizer = momentLocalizer(moment)

// Function to fetch activities from the API
// This is a placeholder and should be replaced with actual API call
const fetchActivities = async (): Promise<Activity[]> => {
  // TODO: Implement the actual API call here
  const response = await fetch('/api/activities');
  return response.json();
};

// Extend the CalendarEvent interface to include custom properties
interface CustomEvent extends CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  color: string;
}

// Main component for rendering the activity calendar
function ActivityCalendar() {
  // Fetch activities using react-query
  const { data } = useQuery<Activity[], Error>('activities', fetchActivities);

  // Transform fetched activities into calendar events
  const calendarEvents: CustomEvent[] = data?.map((activity) => ({
    title: activity.activity_type,
    start: new Date(activity.created_at),
    end: new Date(activity.created_at),
    // Assign color based on activity type (green for walks, blue for others)
    color: activity.activity_type === 'Walk' ? 'green' : 'blue',
  })) || []

  // Render the calendar component with the transformed events
  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
    />
  )
}

export default ActivityCalendar
