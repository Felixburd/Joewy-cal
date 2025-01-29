import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cvfkrcdejtywfhgtcwwb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZmtyY2RlanR5d2ZoZ3Rjd3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4Nzk2MzMsImV4cCI6MjA1MzQ1NTYzM30.Cqn1iVgnfB-hdHxSM0B58cWpXY0E9oWCQmavs1MYlic'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 