// This file initializes and configures a Supabase client instance
// It sets up the connection to Supabase using environment variables for the URL and API key
// The configured client is exported as the default export to be used by other parts of the application
// Supabase is a PostgreSQL database with real-time capabilities and built-in authentication
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
        
