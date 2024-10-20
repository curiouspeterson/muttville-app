import { Calendar, momentLocalizer, Event as CalendarEvent } from 'react-big-calendar'
import moment from 'moment'
import { useQuery } from 'react-query';

interface Activity {
  activity_type: string;
  created_at: string;
}

const localizer = momentLocalizer(moment)

// Assuming you have a function to fetch activities
const fetchActivities = async (): Promise<Activity[]> => {
  // Implement your API call here
  // For example:
  const response = await fetch('/api/activities');
  return response.json();
};

interface CustomEvent extends CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  color: string;
}

function ActivityCalendar() {
  const { data } = useQuery<Activity[], Error>('activities', fetchActivities);

  const calendarEvents: CustomEvent[] = data?.map((activity) => ({
    title: activity.activity_type,
    start: new Date(activity.created_at),
    end: new Date(activity.created_at),
    color: activity.activity_type === 'Walk' ? 'green' : 'blue',
  })) || []

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
