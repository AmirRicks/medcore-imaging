import { createClient } from "@supabase/supabase-js";

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false },
    }
  );
}

export type DoseRecord = {
  id?: string;
  user_id?: string;
  dlp: number;
  region: string;
  age_group: string;
  effective_dose: number;
  ssde?: number;
  created_at?: string;
};
