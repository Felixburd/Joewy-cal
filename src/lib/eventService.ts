import { supabase } from './supabaseClient'

export interface CalendarEvent {
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

export const getEventById = async (id: string): Promise<CalendarEvent> => {
  const { data, error } = await supabase
    .from('calendar')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
} 