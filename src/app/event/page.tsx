import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Events | Joewy',
  description: 'Upcoming events',
}

interface CalendarEvent {
  id: number
  title: string
  start_datetime: string
  end_datetime: string
  location: string
  status: string
}

function getStatusColor(status: string | null) {
  if (!status) return 'bg-gray-100 text-gray-800'
  
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-100 text-green-800'
    case 'tentative':
      return 'bg-yellow-100 text-yellow-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
}

export default async function EventsPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data: events } = await supabase
    .from('calendar')
    .select('id, title, start_datetime, end_datetime, location, status')
    .order('start_datetime', { ascending: true })
    .gte('end_datetime', new Date().toISOString()) // Only future events

  if (!events || events.length === 0) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">No upcoming events</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
        <div className="space-y-4">
          {events.map((event) => (
            <Link 
              key={event.id} 
              href={`/event/${event.id}`}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <h2 className="text-lg font-semibold text-gray-900">{event.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={event.start_datetime}>
                        {new Date(event.start_datetime).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                        {' · '}
                        {new Date(event.start_datetime).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </time>
                    </div>
                    {event.location && (
                      <p className="text-sm text-gray-600">{event.location}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {event.status && (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 