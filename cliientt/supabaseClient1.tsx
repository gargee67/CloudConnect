import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = "https://bpiwtcrbtrxhtxogumtb.supabase.co";
const supabaseAnonKey: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwaXd0Y3JidHJ4aHR4b2d1bXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1Mjk2NzYsImV4cCI6MjA1MzEwNTY3Nn0.z5igRXhV5tY6xZlpSNhcDjORh0eHgWGQl6mj0FSSKZM";

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
