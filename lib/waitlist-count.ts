import { createClient } from '@supabase/supabase-js';

/**
 * Marketing baseline added on top of the real DB count. The displayed
 * number on the landing is `WAITLIST_BASE_OFFSET + db_count`, so as
 * real signups land the public number grows from this baseline.
 *
 * Bump this manually if we want a one-shot increase to the visible
 * total without inserting fake rows.
 */
export const WAITLIST_BASE_OFFSET = 286;

/**
 * Server-side fetch of the current waitlist signup count, for SSR.
 * Returns the visible total = base offset + actual DB rows.
 *
 * Uses the anon client + the `get_waitlist_count()` RPC (security-
 * definer) so we don't need service-role and don't expose the table.
 * If the lookup fails we return just the base offset — the page never
 * renders "0 creators on the waitlist" if Supabase is down.
 */
export async function getDisplayedWaitlistCount(): Promise<number> {
  const url = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const anonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
  if (!url || !anonKey) return WAITLIST_BASE_OFFSET;

  try {
    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase.rpc('get_waitlist_count');
    if (error || typeof data !== 'number') return WAITLIST_BASE_OFFSET;
    return WAITLIST_BASE_OFFSET + data;
  } catch {
    return WAITLIST_BASE_OFFSET;
  }
}

/**
 * Map a raw DB count (from /api/waitlist response) to the displayed
 * total. Used client-side to render "You're #287" after a successful
 * signup.
 */
export function displayCountFromDb(dbCount: number | null | undefined): number {
  if (typeof dbCount !== 'number' || !Number.isFinite(dbCount)) {
    return WAITLIST_BASE_OFFSET;
  }
  return WAITLIST_BASE_OFFSET + dbCount;
}
