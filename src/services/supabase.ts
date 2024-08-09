import { createClient } from "@supabase/supabase-js";
import config from "../helpers/env";

const supabaseUrl = "https://txpjupgxqfaksnmjvpeq.supabase.co";
const supabaseKey = config.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("SUPABASE_KEY is not defined in the environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);