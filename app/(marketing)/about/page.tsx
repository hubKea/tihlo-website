import type { Metadata } from 'next';
import Image from 'next/image';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import { ABOUT, BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'TIHLO is a specialist independent firm operating active monitoring and verification for mining commodity movement across South Africa.',
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
  // Simplified line-drawn South Africa map with province outlines and corridor dots
  return (
    <svg
      viewBox="0 0 600 500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="w-full h-full text-[var(--ink)]"
      aria-label="Map of South Africa showing TIHLO operating regions"
    >
      {/* Simplified SA outline */}
      <path d="M120,80 L280,60 L400,70 L480,100 L520,140 L530,200 L500,260 L460,300 L440,360 L420,400 L380,430 L340,460 L300,470 L260,460 L220,430 L180,400 L140,360 L100,300 L80,240 L70,180 L90,130 Z" strokeWidth="1.5"/>
      {/* Internal province lines (simplified) */}
      <path d="M200,120 L350,110 L400,160 L360,220 L280,230 L200,200 Z" strokeWidth="0.8" strokeDasharray="4 3"/>
      <path d="M200,200 L280,230 L260,300 L180,320 L140,260 L160,200 Z" strokeWidth="0.8" strokeDasharray="4 3"/>
      <path d="M280,230 L360,220 L400,280 L380,340 L320,360 L260,300 Z" strokeWidth="0.8" strokeDasharray="4 3"/>
      <path d="M360,220 L440,200 L460,260 L420,320 L380,340 L400,280 Z" strokeWidth="0.8" strokeDasharray="4 3"/>
      {/* Mpumalanga dot (active) */}
      <circle cx="370" cy="195" r="6" fill="var(--red)" stroke="none"/>
      <text x="382" y="199" fontSize="10" fontFamily="var(--font-mono)" fill="var(--ink)" letterSpacing="0.12em">MPUMALANGA</text>
      {/* Limpopo dot (active) */}
      <circle cx="310" cy="145" r="6" fill="var(--red)" stroke="none"/>
      <text x="322" y="149" fontSize="10" fontFamily="var(--font-mono)" fill="var(--ink)" letterSpacing="0.12em">LIMPOPO</text>
      {/* Northern Cape dot (active) */}
      <circle cx="200" cy="290" r="6" fill="var(--red)" stroke="none"/>
      <text x="212" y="294" fontSize="10" fontFamily="var(--font-mono)" fill="var(--ink)" letterSpacing="0.12em">NORTHERN CAPE</text>
      {/* Pretoria HQ dot */}
      <circle cx="295" cy="210" r="4" fill="var(--ink)" stroke="none"/>
      <text x="307" y="214" fontSize="9" fontFamily="var(--font-mono)" fill="var(--muted)" letterSpacing="0.1em">PRETORIA · HQ</text>
      {/* Corridor lines */}
      <path d="M295,210 L370,195" stroke="var(--red)" strokeWidth="0.8" strokeDasharray="3 3"/>
      <path d="M295,210 L310,145" stroke="var(--red)" strokeWidth="0.8" strokeDasharray="3 3"/>
      <path d="M295,210 L200,290" stroke="var(--red)" strokeWidth="0.8" strokeDasharray="3 3"/>
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--ink)] px-6 pb-20 pt-36 lg:px-12 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1565793979540-72c7a00b5f57?auto=format&fit=crop&w=2400&q=85"
            alt="South African mining landscape"
            fill
            quality={85}
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--ink)]/75" />
        </div>
        <div className="relative mx-auto max-w-site">
          <FadeUp>
            <Eyebrow className="mb-6 text-white/50">§ The firm</Eyebrow>
            <h1 className="mb-8 font-display text-[clamp(52px,8vw,108px)] font-medium leading-[0.9] tracking-[-0.05em] text-[var(--paper)]">
              {ABOUT.headline}
            </h1>
            <p className="max-w-2xl text-[18px] leading-[1.65] text-white/65">
              {ABOUT.lede}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* The firm */}
      <section className="bg-[var(--paper)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeUp>
              <Eyebrow className="mb-5">§ Who we are</Eyebrow>
              <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
                Independent.<br />Operational.
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="space-y-5 text-[17px] leading-[1.65] text-[var(--muted)] pt-2 lg:pt-12">
                {ABOUT.firm.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Operating principles */}
      <section className="bg-[var(--paper-2)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-site">
          <FadeUp className="mb-14">
            <Eyebrow className="mb-5">§ How we work</Eyebrow>
            <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
              Operating principles.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-px bg-[var(--rule)] border border-[var(--rule)] lg:grid-cols-2">
            {ABOUT.principles.map((p, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="bg-[var(--paper-2)] px-8 py-10">
                  <p className="mono-id mb-5 text-[var(--red)]">§ 0{i + 1}</p>
                  <h3 className="mb-4 font-display text-xl font-medium leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
                    {p.statement}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{p.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[var(--paper)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-site">
          <FadeUp className="mb-14">
            <Eyebrow className="mb-5">§ The team</Eyebrow>
            <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
              Controllers and analysts.
            </h2>
          </FadeUp>

          {/* TODO: Replace with real bios and headshots once photography is completed */}
          <div className="grid grid-cols-1 gap-px bg-[var(--rule)] border border-[var(--rule)] lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-[var(--paper)] px-8 py-10">
                  {/* Placeholder portrait */}
                  <div className="mb-6 aspect-square bg-[var(--paper-3)] flex items-center justify-center">
                    <span className="mono-id text-[var(--dim)]">PHOTO PENDING</span>
                  </div>
                  <h3 className="font-display text-lg font-medium text-[var(--ink)]">{member.name}</h3>
                  <p className="mono-id mt-1 mb-3 text-[var(--red)]">{member.role}</p>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{member.bio}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-[var(--paper-2)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <FadeUp>
              <Eyebrow className="mb-5">§ Coverage</Eyebrow>
              <h2 className="mb-5 font-display text-[clamp(36px,4.6vw,56px)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
                {ABOUT.map.headline}
              </h2>
              <p className="text-[17px] leading-[1.65] text-[var(--muted)]">{ABOUT.map.body}</p>

              <div className="mt-8 space-y-3">
                {['Mpumalanga', 'Limpopo', 'Northern Cape'].map((prov) => (
                  <div key={prov} className="flex items-center gap-3">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
                    <span className="mono-label text-[var(--ink)]">{prov}</span>
                    <span className="mono-id text-[var(--dim)]">— Active corridors</span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="block h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
                  <span className="mono-label text-[var(--ink)]">Pretoria</span>
                  <span className="mono-id text-[var(--dim)]">— Headquarters & control room</span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div className="aspect-[6/5] relative">
                <MapZA />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="bg-[var(--paper)] px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-site">
          <FadeUp>
            <div className="border border-[var(--rule)] p-8 lg:p-12">
              <Eyebrow className="mb-5">§ Governance</Eyebrow>
              <h3 className="mb-8 font-display text-2xl font-medium tracking-[-0.02em] text-[var(--ink)]">
                {ABOUT.governance.headline}
              </h3>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {[
                  { label: 'POPIA', body: ABOUT.governance.popia },
                  { label: 'Confidentiality', body: ABOUT.governance.confidentiality },
                  { label: 'Insurance', body: ABOUT.governance.insurance },
                ].map((g) => (
                  <div key={g.label}>
                    <p className="mono-label mb-2 text-[var(--muted)]">{g.label}</p>
                    <p className="text-sm leading-relaxed text-[var(--muted)]">{g.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--ink)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--paper)]">
              Ready to engage.
            </h2>
            <div>
              <p className="mb-7 text-[17px] leading-[1.65] text-white/65">
                Engagements begin with a 30-minute briefing. No fee. We assess the fit and tell
                you directly whether TIHLO is the right partner for your operation.
              </p>
              <Button variant="white" href="/contact">
                Request a briefing
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
