import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const InputSchema = z.object({
  email: z.string().email().max(254),
  source: z.string().max(64).optional(),
});

export const dynamic = 'force-dynamic';

/**
 * Waitlist signup endpoint.
 *
 * Uses the public anon key (NOT service-role) — the `waitlist_signups`
 * table has an RLS policy that allows INSERT for anon, so we don't need
 * the secret. This removes the operator pain of having to paste a
 * SUPABASE_SERVICE_ROLE_KEY for the form to work; only the two
 * NEXT_PUBLIC_* keys are required, and those ship with the build.
 *
 * Reads the live count via the get_waitlist_count() RPC (security-
 * definer, callable by anon) so we don't need read access to the
 * table. The response carries `count` so the form can show "You're
 * #287" position on success.
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad JSON.' }, { status: 400 });
  }

  const parsed = InputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  }

  const url = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const anonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
  if (!url || !anonKey) {
    console.error('[/api/waitlist] missing NEXT_PUBLIC_SUPABASE_* env');
    return NextResponse.json({ error: 'Server misconfigured.' }, { status: 500 });
  }

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const email = parsed.data.email.trim().toLowerCase();
  const userAgent = req.headers.get('user-agent') ?? null;
  const referer = req.headers.get('referer') ?? null;

  const { error } = await supabase.from('waitlist_signups').insert({
    email,
    source: parsed.data.source ?? null,
    user_agent: userAgent,
    referer,
  });

  // Read the new count whether the insert succeeded or 23505'd as a dedup.
  // RPC bypasses the read-restriction RLS on the table.
  let count: number | null = null;
  const countRes = await supabase.rpc('get_waitlist_count');
  if (!countRes.error && typeof countRes.data === 'number') {
    count = countRes.data;
  }

  if (error) {
    if (error.code === '23505') {
      // Unique violation — email already in. Treat as success so users
      // never see a "you're already on the list" friction screen.
      return NextResponse.json({ ok: true, deduped: true, count });
    }
    console.error('[/api/waitlist] insert failed', error);
    return NextResponse.json({ error: 'Could not save signup.' }, { status: 500 });
  }
  return NextResponse.json({ ok: true, count });
}
