// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sycncozmhnpwxwzxpsfw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5Y25jb3ptaG5wd3h3enhwc2Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMTU3ODAsImV4cCI6MjA1OTY5MTc4MH0.BaJHJCcafRKqgbR7BV8HUeznRS1W23n4SAHeFqO9qyk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);