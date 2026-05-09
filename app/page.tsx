import { TopNav } from '@/components/marketing/TopNav';
import { Footer } from '@/components/marketing/Footer';
import { Hero } from '@/components/marketing/Hero';
import { HowItWorksSteps } from '@/components/marketing/HowItWorksSteps';
import { BuiltForBoth } from '@/components/marketing/BuiltForBoth';
import { DesignPartners } from '@/components/marketing/DesignPartners';
import { FAQ } from '@/components/marketing/FAQ';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] font-sans text-[var(--color-fg)]">
      <TopNav />
      <main>
        <Hero />
        <HowItWorksSteps />
        <BuiltForBoth />
        <section className="border-t border-[var(--color-border)] py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                Built for creators like
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-fg)] md:text-4xl">
                Designed with these voices in mind.
              </h2>
            </div>
            <DesignPartners />
          </div>
        </section>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
