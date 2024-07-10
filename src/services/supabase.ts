import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://txpjupgxqfaksnmjvpeq.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("SUPABASE_KEY is not defined in the environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
