import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Metadata, ResolvingMetadata } from 'next'
import { Calendar, Clock, MapPin, Users, User, Tag, Info } from 'lucide-react'
import { ShareButton } from '@/components/share-button'

export const dynamic = 'force-dynamic'

interface CalendarEvent {
  id: number
  created_at: string
  title: string
  details: string
  start_datetime: string
  end_datetime: string
  location: string
  organizer: string
  participants_count: number
  recurrence: string
  status: string
  tags: string[]
}

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data: event } = await supabase
    .from('calendar')
    .select('title')
    .eq('id', params.id)
    .single()

  return {
    title: event?.title ? `${event.title} | Joewy` : 'Event | Joewy',
  }
}

export default async function EventPage({ params }: PageProps) {
  if (!params.id) {
    notFound()
  }

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data: event, error } = await supabase
    .from('calendar')
    .select()
    .eq('id', params.id)
    .single()

  if (error) {
    console.error('Error fetching event:', error)
    notFound()
  }

  if (!event) {
    notFound()
  }

  const getStatusColor = (status: string | null) => {
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

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 font-[family-name:var(--font-space-grotesk)]">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            <div className="flex items-center gap-2">
              {event.status && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              )}
              <ShareButton 
                title={event.title} 
                text={`Check out this event: ${event.title}`} 
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-3 text-gray-600">
            <Calendar className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">Date & Time</p>
              <p>{new Date(event.start_datetime).toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <div className="flex items-center mt-1 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {new Date(event.start_datetime).toLocaleTimeString('en-US', { 
                    hour: 'numeric',
                    minute: '2-digit'
                  })} - {new Date(event.end_datetime).toLocaleTimeString('en-US', { 
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 text-gray-600">
            <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">Location</p>
              <p>{event.location}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 text-gray-600">
            <Info className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">Details</p>
              <p className="whitespace-pre-wrap">{event.details}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start space-x-3 text-gray-600">
              <User className="w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Organizer</p>
                <p>{event.organizer}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 text-gray-600">
              <Users className="w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Participants</p>
                <p>{event.participants_count} people</p>
              </div>
            </div>
          </div>

          {event.tags && event.tags.length > 0 && (
            <div className="flex items-start space-x-3 text-gray-600">
              <Tag className="w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 