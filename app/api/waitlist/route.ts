import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const InputSchema = z.object({
  email: z.string().email().max(254),
  source: z.string().max(64).optional(),
});

export const dynamic = 'force-dynamic';

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
  const serviceKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];
  if (!url || !serviceKey || serviceKey === 'PASTE_SERVICE_ROLE_KEY_HERE') {
    console.error('[/api/waitlist] missing Supabase env');
    return NextResponse.json({ error: 'Server misconfigured.' }, { status: 500 });
  }

  const supabase = createClient(url, serviceKey, {
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

  if (error) {
    if (error.code === '23505') {
      // Unique violation — email already in. Treat as success so users
      // never see a "you're already on the list" friction screen.
      return NextResponse.json({ ok: true, deduped: true });
    }
    console.error('[/api/waitlist] insert failed', error);
    return NextResponse.json({ error: 'Could not save signup.' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
