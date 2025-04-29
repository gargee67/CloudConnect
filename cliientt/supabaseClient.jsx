import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bpiwtcrbtrxhtxogumtb.supabase.co"; // Replace with your Supabase URL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwaXd0Y3JidHJ4aHR4b2d1bXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1Mjk2NzYsImV4cCI6MjA1MzEwNTY3Nn0.z5igRXhV5tY6xZlpSNhcDjORh0eHgWGQl6mj0FSSKZM"; // Replace with your Supabase Anon Key

export const supabase = createClient(
  "https://bpiwtcrbtrxhtxogumtb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwaXd0Y3JidHJ4aHR4b2d1bXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1Mjk2NzYsImV4cCI6MjA1MzEwNTY3Nn0.z5igRXhV5tY6xZlpSNhcDjORh0eHgWGQl6mj0FSSKZM"
);
