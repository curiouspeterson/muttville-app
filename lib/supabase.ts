// Import the createClient function from Supabase JavaScript library
import { createClient } from '@supabase/supabase-js'

// Retrieve Supabase URL and anonymous key from environment variables
// These are used to connect to the Supabase instance
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create and export a Supabase client instance
// The '!' is used to assert that the URL and key are not null or undefined
// Note: This assumes the environment variables are always set correctly
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('Supabase client initialized with URL:', supabaseUrl)

// Potential improvement: Add error handling for cases where environment variables are not set

// --- No Changes Needed Unless Additional Configuration Required ---

// If you plan to use real-time features for new tables, ensure they are included in your Supabase subscription setup elsewhere in the codebase.

// Example:
// const channel = supabase.channel('new_channel')
//   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'medications' }, payload => {
//     // Handle new medication
//   })
//   .subscribe()
