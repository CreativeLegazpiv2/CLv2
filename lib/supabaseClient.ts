// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }
  
  // Create Supabase client
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Add a console log to check if it's being created properly
  console.log({
    supabaseUrl, 
    supabaseAnonKey,
    supabaseClient: supabase
  });