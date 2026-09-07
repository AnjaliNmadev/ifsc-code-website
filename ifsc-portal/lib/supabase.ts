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
