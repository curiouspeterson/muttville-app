// Import the createClient function from Supabase JavaScript library
import { createClient } from '@supabase/supabase-js'

// Retrieve Supabase URL and anonymous key from environment variables
// These are used to connect to the Supabase instance
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create and export a Supabase client instance
// The '!' is used to assert that the URL and key are not null or undefined
// Note: This assumes the environment variables are always set correctly
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

// Potential improvement: Add error handling for cases where environment variables are not set
