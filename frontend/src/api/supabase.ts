import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(

"https://bdbutfbrdjhhtvqkpcrg.supabase.co",
"sb_publishable_AT53biDmCY47x9SHzVWg3g_kt_jYy4R"
  // import.meta.env.VITE_SUPABASE_URL!,
  // import.meta.env.VITE_SUPABASE_ANON_KEY!
);
