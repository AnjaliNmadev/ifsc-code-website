import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Public, read-only Supabase client. The anon key is safe to expose in the
 * browser — it only has the permissions granted by Row Level Security (RLS)
 * policies on the database, which the schema in /supabase/schema.sql sets to
 * "anyone can SELECT, nobody can INSERT/UPDATE/DELETE".
 *
 * If the env vars are not set (e.g. local dev before Supabase is connected),
 * this client is created with empty strings and every query will fail
 * gracefully — callers in lib/data.ts catch that and return empty results
 * instead of crashing the page.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Server-only admin client, used exclusively by the daily cron route
 * (app/api/cron/snapshot-rates) to write a row to metal_rate_history. Uses
 * the service_role key, which bypasses Row Level Security — this must
 * NEVER be imported into any client component or exposed to the browser.
 * SUPABASE_SERVICE_ROLE_KEY (no NEXT_PUBLIC_ prefix) is only available
 * server-side, which is exactly what keeps it safe.
 */
export function getSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!supabaseUrl || !serviceKey) return null;
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}
