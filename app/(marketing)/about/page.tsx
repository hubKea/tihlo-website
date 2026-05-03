import type { Metadata } from 'next';
import Image from 'next/image';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import MaskHeading from '@/components/motion/MaskHeading';
import DarkGlowSection from '@/components/sections/DarkGlowSection';
import MagneticButton from '@/components/motion/MagneticButton';
import { ABOUT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description:
    'TIHLO is a specialist independent firm operating active monitoring and verification for mining commodity movement across South Africa.',
};

const TEAM = [
  {
    name: 'Team Member',
    role: 'Operations Director',
    bio: 'Specialist in logistics control and commodity security across Mpumalanga coal corridors. 12 years operational experience.',
  },
  {
    name: 'Team Member',
    role: 'Head of Intelligence',
    bio: 'Leads the analysis and reporting function. Background in mining fleet data systems and evidence-grade documentation.',
  },
  {
    name: 'Team Member',
    role: 'Control Room Lead',
    bio: 'Oversees 24/7 controller operations. Former logistics compliance officer across Northern Cape manganese operations.',
  },
];

function MapZA() {
  return (
    <svg
      viewBox="0 0 600 500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="h-full w-full text-white/40"
      aria-label="Map of South Africa showing TIHLO operating regions"
    >
      {/* Simplified SA outline */}
      <path
        d="M120,80 L280,60 L400,70 L480,100 L520,140 L530,200 L500,260 L460,300 L440,360 L420,400 L380,430 L340,460 L300,470 L260,460 L220,430 L180,400 L140,360 L100,300 L80,240 L70,180 L90,130 Z"
        strokeWidth="1.5"
        stroke="white"
        opacity="0.2"
      />
      {/* Internal province lines */}
      <path d="M200,120 L350,110 L400,160 L360,220 L280,230 L200,200 Z" strokeWidth="0.8" strokeDasharray="4 3" stroke="white" opacity="0.1" />
      <path d="M200,200 L280,230 L260,300 L180,320 L140,260 L160,200 Z" strokeWidth="0.8" strokeDasharray="4 3" stroke="white" opacity="0.1" />
      <path d="M280,230 L360,220 L400,280 L380,340 L320,360 L260,300 Z" strokeWidth="0.8" strokeDasharray="4 3" stroke="white" opacity="0.1" />
      <path d="M360,220 L440,200 L460,260 L420,320 L380,340 L400,280 Z" strokeWidth="0.8" strokeDasharray="4 3" stroke="white" opacity="0.1" />

      {/* Mpumalanga — the single active pulse dot (the section's red accent) */}
      <circle cx="370" cy="195" r="6" fill="var(--red)" stroke="none" className="pulse-corridor" />
      <circle cx="370" cy="195" r="6" fill="var(--red)" stroke="none" opacity="0.4" />
      <text x="382" y="199" fontSize="10" fontFamily="var(--font-mono)" fill="white" letterSpacing="0.12em" opacity="0.6">MPUMALANGA</text>

      {/* Limpopo — secondary corridor (white) */}
      <circle cx="310" cy="145" r="5" fill="white" stroke="none" opacity="0.8" />
      <text x="322" y="149" fontSize="10" fontFamily="var(--font-mono)" fill="white" letterSpacing="0.12em" opacity="0.6">LIMPOPO</text>

      {/* Northern Cape — secondary corridor (white) */}
      <circle cx="200" cy="290" r="5" fill="white" stroke="none" opacity="0.8" />
      <text x="212" y="294" fontSize="10" fontFamily="var(--font-mono)" fill="white" letterSpacing="0.12em" opacity="0.6">NORTHERN CAPE</text>

      {/* Pretoria HQ */}
      <circle cx="295" cy="210" r="4" fill="white" stroke="none" opacity="0.6" />
      <text x="307" y="214" fontSize="9" fontFamily="var(--font-mono)" fill="white" letterSpacing="0.1em" opacity="0.4">PRETORIA · HQ</text>

      {/* Corridor lines — quiet white dashed */}
      <path d="M295,210 L370,195" stroke="white" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
      <path d="M295,210 L310,145" stroke="white" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
      <path d="M295,210 L200,290" stroke="white" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--ink)]">
        {/* Background photograph — full bleed */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-operations.jpg"
            alt="Active mining corridor — South African operations"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Dark gradient overlay to ensure text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(14,16,20,0.55) 0%, rgba(14,16,20,0.65) 60%, rgba(14,16,20,0.92) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Subtle vignette from sides */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(14,16,20,0.4) 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Subtle grain/texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-site flex-col justify-end px-6 pb-20 pt-40 lg:px-12 lg:pb-28 lg:pt-48">
          <div className="grid w-full min-w-0 grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-20">
            {/* Left column — copy */}
            <div className="min-w-0 w-[calc(100vw-3rem)] sm:w-auto">
              <Eyebrow className="mb-6 ![color:rgba(250,250,248,0.68)]">
                Approach
              </Eyebrow>

              <h1 className="font-display text-[clamp(48px,7.5vw,112px)] font-medium leading-[0.92] tracking-[-0.045em] text-white">
                <MaskHeading delay={0.1} immediate>
                  {ABOUT.headline_1}
                </MaskHeading>
                <MaskHeading delay={0.25} immediate>
                  {ABOUT.headline_2}
                </MaskHeading>
              </h1>

              <p className="mt-8 max-w-[34ch] text-[17px] leading-[1.65] text-[rgba(250,250,248,0.75)] sm:max-w-[52ch]">
                {ABOUT.lede}
              </p>

              <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <MagneticButton>
                  <Button
                    variant="white"
                    size="lg"
                    href="/contact"
                  >
                    Request a briefing
                  </Button>
                </MagneticButton>
                <Button
                  variant="ghost"
                  size="lg"
                  href="/how-we-operate"
                  className="border-[rgba(250,250,248,0.3)] text-white hover:border-white hover:bg-[rgba(250,250,248,0.1)] hover:text-white"
                  arrow={false}
                >
                  How we operate
                </Button>
              </div>
            </div>

            {/* Right column — caption block */}
            <aside className="min-w-0 w-[calc(100vw-3rem)] max-w-full border-l border-[rgba(250,250,248,0.15)] pl-8 sm:w-auto">
              <p className="mono-id text-[rgba(250,250,248,0.62)]">
                Field — operational corridor
              </p>
              <p className="mt-4 max-w-[24ch] font-display text-[20px] font-medium leading-[1.18] tracking-[-0.02em] text-[rgba(250,250,248,0.85)] sm:max-w-none sm:text-[clamp(20px,2.2vw,28px)]">
                Independent. Quiet about who we work with. Loud about what we
                will not tolerate.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="block h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
                <span className="mono-id text-[rgba(250,250,248,0.62)]">
                  TIHLO operating posture
                </span>
              </div>
            </aside>
          </div>

          {/* Bottom edge — registration mark + scroll cue */}
          <div className="mt-20 flex items-end justify-between border-t border-[rgba(250,250,248,0.1)] pt-6">
            <span className="mono-id text-[rgba(250,250,248,0.55)]">
              REC OBS · ZA · 2026
            </span>
            <span className="mono-id text-[rgba(250,250,248,0.55)]">
              Scroll to continue
            </span>
          </div>
        </div>
      </section>

      {/* The firm — hidden until team is finalised */}

      {/* Operating principles — Dark with glow */}
      <DarkGlowSection
        glowPosition="center"
        glowIntensity={0.06}
        className="px-6 py-20 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-site">
          <FadeUp className="mb-14">
            <Eyebrow className="mb-5 text-white/65">How we work</Eyebrow>
            <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--white)]">
              Operating principles.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 lg:grid-cols-2">
            {ABOUT.principles.map((p, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="glow-border-top relative flex h-full gap-5 bg-[var(--ink)] px-8 py-10">
                  {/* Watermark */}
                  <span
                    className="pointer-events-none absolute right-4 top-4 font-mono text-[80px] font-bold tabular-nums leading-none tracking-[-0.04em] text-white/[0.03]"
                    aria-hidden
                  >
                    0{i + 1}
                  </span>
                  <span className="relative z-10 font-mono text-[clamp(34px,3.4vw,44px)] font-semibold tabular-nums leading-none tracking-[-0.02em] text-white/15">
                    0{i + 1}
                  </span>
                  <div className="relative z-10 flex-1">
                    <h3 className="mb-4 font-display text-xl font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--white)]">
                      {p.statement}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70">
                      {p.body}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </DarkGlowSection>

      <section className="bg-[var(--red)] border-y border-white/15 px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-site text-center">
          <FadeUp>
            <p className="font-display text-[clamp(24px,3vw,40px)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
              We succeed when every tonne mined is a tonne delivered.
            </p>
              <p className="mono-id mt-4 text-white/70">
              TIHLO operating commitment
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Team — hidden until team is finalised */}
      {process.env.NEXT_PUBLIC_SHOW_TEAM === 'true' && (
        <section className="bg-[var(--white)] px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-site">
            <FadeUp className="mb-14">
              <Eyebrow className="mb-5">The team</Eyebrow>
              <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
                Controllers and analysts.
              </h2>
            </FadeUp>

            {/* TODO: Replace with real bios and headshots once photography is completed */}
            <div className="grid grid-cols-1 gap-px border border-[var(--faint)] bg-[var(--faint)] lg:grid-cols-3">
              {TEAM.map((member, i) => (
                <FadeUp key={i} delay={i * 0.08}>
                  <div className="bg-[var(--white)] px-8 py-10">
                    {/* Placeholder portrait with scan-line aesthetic */}
                    <div className="scan-lines group relative mb-6 flex aspect-square items-center justify-center overflow-hidden bg-[var(--white-3)]">
                      {/* Diagonal scanline pattern */}
                      <div
                        className="absolute inset-0 opacity-[0.15] transition-opacity duration-500 group-hover:opacity-0"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(45deg, var(--ink) 0, var(--ink) 1px, transparent 1px, transparent 12px)',
                        }}
                      />
                      <span className="mono-id relative z-10 text-[var(--dim)]">
                        PHOTO PENDING
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[var(--ink)]">
                      {member.name}
                    </h3>
                    <p className="mono-id mb-3 mt-1 text-[var(--ink)]">
                      {member.role}
                    </p>
                    <p className="text-sm leading-relaxed text-[var(--muted)]">
                      {member.bio}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map — Dark with pulsing corridors */}
      <DarkGlowSection
        glowPosition="center"
        glowIntensity={0.07}
        className="px-6 py-20 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <FadeUp>
              <Eyebrow className="mb-5 text-white/65">Coverage</Eyebrow>
              <h2 className="mb-5 font-display text-[clamp(36px,4.6vw,56px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--white)]">
                {ABOUT.map.headline}
              </h2>
              <p className="text-[17px] leading-[1.65] text-white/72">
                {ABOUT.map.body}
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="pulse-dot block h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
                  <span className="mono-label text-white/80">Mpumalanga</span>
                  <span className="mono-id text-white/60">— Live corridor</span>
                </div>
                {['Limpopo', 'Northern Cape'].map((prov) => (
                  <div key={prov} className="flex items-center gap-3">
                    <span className="block h-1.5 w-1.5 rounded-full bg-white/60" />
                    <span className="mono-label text-white/80">{prov}</span>
                    <span className="mono-id text-white/60">— Active corridor</span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="block h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span className="mono-label text-white/80">Pretoria</span>
                  <span className="mono-id text-white/60">— Headquarters &amp; control room</span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div className="relative aspect-[6/5]">
                <MapZA />
              </div>
            </FadeUp>
          </div>
        </div>
      </DarkGlowSection>

      {/* Governance */}
      <section className="border-t border-[var(--faint)] bg-[var(--white)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-site">
          <FadeUp className="mb-10">
            <Eyebrow className="mb-5">Governance</Eyebrow>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--ink)]">
              {ABOUT.governance.headline}
            </h3>
          </FadeUp>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              { label: 'POPIA', body: ABOUT.governance.popia, number: '01' },
              {
                label: 'Confidentiality',
                body: ABOUT.governance.confidentiality,
                number: '02',
              },
              {
                label: 'Insurance',
                body: ABOUT.governance.insurance,
                number: '03',
              },
            ].map((g) => (
              <FadeUp key={g.label} delay={Number(g.number) * 0.06}>
                <div className="group border border-[var(--faint)] p-8 transition-colors hover:bg-[var(--white-2)]">
                  <span className="font-mono text-[32px] font-medium tabular-nums leading-none text-[var(--ink)]/10">
                    {g.number}
                  </span>
                  <p className="mono-label mb-3 mt-4 text-[var(--ink)]">
                    {g.label}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    {g.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <DarkGlowSection
        glowPosition="bottom-center"
        glowIntensity={0.09}
        className="px-6 py-20 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <h2 className="font-display text-[clamp(40px,5vw,64px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--white)]">
              <MaskHeading>Ready to engage<span className="text-[var(--red)]">.</span></MaskHeading>
            </h2>
            <div>
              <p className="text-white/65 mb-7 text-[17px] leading-[1.65]">
                Engagements begin with a 30-minute briefing. No fee. We assess
                the fit and tell you directly whether TIHLO is the right partner
                for your operation.
              </p>
              <MagneticButton>
                <Button variant="white" href="/contact">
                  Request a briefing
                </Button>
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </DarkGlowSection>
    </>
  );
}
