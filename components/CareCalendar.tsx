// Import necessary dependencies for the calendar component
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// Define the Event interface
interface Event {
  title: string
  start: Date
  end: Date
}

// Create a localizer for the calendar using moment.js
const localizer = momentLocalizer(moment)

// CareCalendar component to display activities in a calendar view
export default function CareCalendar() {
  // Properly type the events state
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    // Function to fetch activities from Supabase and convert them to calendar events
    const fetchEvents = async () => {
      // Fetch all activities from the 'activities' table
      const { data } = await supabase.from('activities').select('*')
      
      // Convert activities to calendar events format
      const calendarEvents: Event[] = data?.map((activity) => ({
        title: activity.activity_type,
        start: new Date(activity.created_at),
        end: new Date(activity.created_at),
      })) || []
      
      // Update the events state with the fetched and formatted data
      setEvents(calendarEvents)
    }

    // Call fetchEvents when the component mounts
    fetchEvents()
  }, []) // Empty dependency array ensures this effect runs only once on mount

  // Render the Calendar component with the fetched events
  return (
    <Calendar 
      localizer={localizer} 
      events={events} 
      startAccessor="start" 
      endAccessor="end" 
    />
  )
}
