'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Email collection form for the pre-launch waitlist. Posts to
 * `POST /api/waitlist`; on duplicate (23505) the server treats it as a
 * successful re-signup so users never see "you're already on the list"
 * friction.
 */
export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Enter a valid email.');
      return;
    }
    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'landing' }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(json.error ?? 'Something went wrong.');
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-[var(--color-fg)] bg-[var(--color-surface)] p-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
          You&rsquo;re in
        </p>
        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--color-fg)]">
          We&rsquo;ll be in touch.
        </h3>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Watch your inbox — we&rsquo;ll send your invite when access opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="flex-1"
          aria-label="Email address"
        />
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Joining…' : 'Join waitlist'}
        </Button>
      </div>
      {error ? (
        <p
          role="alert"
          className="text-left text-sm text-[var(--color-accent)]"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
