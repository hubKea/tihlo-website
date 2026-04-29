'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';

// Schemas per step
const step1Schema = z.object({
  name: z.string().min(2, 'Minimum 2 characters'),
  role: z.string().min(1, 'Please select a role'),
  company: z.string().min(2, 'Minimum 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(9, 'Enter a valid phone number')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Invalid phone format'),
  honeypot: z.string().max(0), // spam trap
});

const step2Schema = z.object({
  sectors: z.array(z.string()).min(1, 'Select at least one sector'),
  fleetSize: z.string().min(1, 'Select fleet size'),
  corridors: z.string().min(1, 'Select number of corridors'),
  provinces: z.array(z.string()).min(1, 'Select at least one province'),
});

const step3Schema = z.object({
  engagementType: z.string().min(1, 'Select engagement type'),
  situation: z.string().max(500).optional(),
  contactPreference: z.string().min(1, 'Select contact preference'),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;
type Step3 = z.infer<typeof step3Schema>;

const ROLES = ['GM / COO', 'CFO', 'Procurement', 'Risk', 'Other'];
const SECTORS = ['Coal', 'Chrome', 'Manganese', 'Iron Ore', 'Copper', 'Aggregates', 'Fuel', 'Agri-bulk', 'Other'];
const PROVINCES = ['Mpumalanga', 'Limpopo', 'Northern Cape', 'Gauteng', 'North West', 'Other'];
const FLEET_SIZES = ['<10', '10–50', '50–200', '200+'];
const CORRIDORS = ['1', '2–5', '6–15', '15+'];
const ENGAGEMENT_TYPES = ['30-minute briefing', 'Risk assessment', 'Pilot corridor', 'Just exploring'];
const CONTACT_PREFS = ['Email', 'Phone', 'Either'];

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mono-id mb-2 block text-[var(--ink)]">§ {label.toUpperCase()}</label>
      {children}
      {error && <p className="mono-id mt-1.5 text-[var(--red)]">§ {error.toUpperCase()}</p>}
    </div>
  );
}

function TextInput({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      {...props}
      className={`w-full border bg-[var(--paper-2)] px-4 py-3 font-display text-[15px] text-[var(--ink)] placeholder:text-[var(--dim)] outline-none transition-all focus:border-[var(--red)] focus:bg-[var(--paper)] ${
        error ? 'border-[var(--red)]' : 'border-[var(--rule-2)]'
      }`}
    />
  );
}

function SelectInput({ error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return (
    <select
      {...props}
      className={`w-full border bg-[var(--paper-2)] px-4 py-3 font-display text-[15px] text-[var(--ink)] outline-none transition-all focus:border-[var(--red)] focus:bg-[var(--paper)] ${
        error ? 'border-[var(--red)]' : 'border-[var(--rule-2)]'
      }`}
    >
      {children}
    </select>
  );
}

function ChipSelector({
  options,
  selected,
  onToggle,
  error,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-1">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`mono-id px-3 py-1.5 transition-all border ${
              selected.includes(opt)
                ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                : 'border-[var(--rule-2)] text-[var(--muted)] hover:border-[var(--ink)]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="mono-id mt-2 text-[var(--red)]">§ {error.toUpperCase()}</p>}
    </div>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
  name,
  error,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
  error?: string;
}) {
  return (
    <div>
      <div className="mt-1 space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex cursor-pointer items-center gap-3">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
                value === opt ? 'border-[var(--ink)] bg-[var(--ink)]' : 'border-[var(--rule-2)]'
              }`}
              onClick={() => onChange(opt)}
            >
              {value === opt && (
                <span className="block h-1.5 w-1.5 bg-[var(--paper)]" />
              )}
            </span>
            <span className="mono-id text-[var(--ink)]">{opt.toUpperCase()}</span>
          </label>
        ))}
      </div>
      {error && <p className="mono-id mt-2 text-[var(--red)]">§ {error.toUpperCase()}</p>}
    </div>
  );
}

type FormData = Step1 & Step2 & Step3;

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({
    sectors: [],
    provinces: [],
    engagementType: '',
    contactPreference: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId] = useState(() => `TIH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
  const [error, setError] = useState('');

  // Step 1 form
  const s1 = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData as Partial<Step1>,
  });

  const handleStep1 = s1.handleSubmit((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  });

  // Step 2 local state (chips/multi-select)
  const [s2Errors, setS2Errors] = useState<Record<string, string>>({});
  const toggleSector = (v: string) => {
    setFormData((prev) => ({
      ...prev,
      sectors: prev.sectors?.includes(v)
        ? prev.sectors.filter((s) => s !== v)
        : [...(prev.sectors ?? []), v],
    }));
  };
  const toggleProvince = (v: string) => {
    setFormData((prev) => ({
      ...prev,
      provinces: prev.provinces?.includes(v)
        ? prev.provinces.filter((p) => p !== v)
        : [...(prev.provinces ?? []), v],
    }));
  };
  const handleStep2 = () => {
    const res = step2Schema.safeParse(formData);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setS2Errors(errs);
      return;
    }
    setS2Errors({});
    setStep(3);
  };

  // Step 3
  const [s3Errors, setS3Errors] = useState<Record<string, string>>({});
  const handleStep3 = async () => {
    const res = step3Schema.safeParse(formData);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setS3Errors(errs);
      return;
    }
    setS3Errors({});
    setSubmitting(true);
    setError('');
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ticketId }),
      });
      if (!resp.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Transmission failed. Please email info@tihlo.co.za directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-[var(--ink)] bg-[var(--paper-2)] p-10 lg:p-12">
        <p className="mono-label mb-6 flex items-center gap-3 text-[var(--red)]">
          <span className="block h-px w-8 bg-[var(--red)]" />
          § Transmission received
        </p>
        <p className="font-mono text-[clamp(28px,3vw,40px)] font-medium leading-none tabular-nums text-[var(--ink)]">
          TICKET: <span className="text-[var(--red)]">{ticketId}</span>
        </p>
        <ul className="mt-8 space-y-2 border-t border-[var(--rule)] pt-6 font-mono text-xs tracking-[0.16em] text-[var(--muted)]">
          <li className="flex items-center justify-between gap-4">
            <span>RESPONSE TARGET</span>
            <span className="text-[var(--ink)]">1 BUSINESS DAY</span>
          </li>
          <li className="flex items-center justify-between gap-4">
            <span>CONTROLLER</span>
            <span className="text-[var(--ink)]">ASSIGNED</span>
          </li>
          <li className="flex items-center justify-between gap-4">
            <span>INSTRUMENT</span>
            <span className="flex items-center gap-2 text-[var(--ink)]">
              <span className="block h-1.5 w-1.5 rounded-full bg-[var(--green)] pulse-dot-green" />
              ACTIVE
            </span>
          </li>
        </ul>
        <p className="mt-8 text-[16px] leading-[1.65] text-[var(--muted)]">
          A TIHLO representative will contact you within one business day using your preferred
          contact method.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[var(--rule)]">
      {/* Progress bar */}
      <div className="flex border-b border-[var(--rule)]">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex flex-1 items-center justify-center gap-3 py-4 transition-colors ${
              s === step
                ? 'bg-[var(--ink)]'
                : s < step
                ? 'bg-[var(--paper-2)]'
                : 'bg-[var(--paper)]'
            }`}
          >
            <span
              className={`font-mono text-[20px] font-medium leading-none tabular-nums ${
                s === step
                  ? 'text-[var(--red)]'
                  : s < step
                  ? 'text-[var(--ink)]'
                  : 'text-[var(--dim)]'
              }`}
            >
              {String(s).padStart(2, '0')}
            </span>
            {s < step && <span className="block h-px w-6 bg-[var(--red)]" />}
          </div>
        ))}
      </div>

      <div className="px-7 py-8">
        {/* Step 1 — About you */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="space-y-6" noValidate>
            <input type="text" className="hidden" {...s1.register('honeypot')} tabIndex={-1} aria-hidden="true" />

            <p className="mono-label text-[var(--muted)] mb-6">About you</p>

            <Field label="Full name" error={s1.formState.errors.name?.message}>
              <TextInput {...s1.register('name')} placeholder="Full name" error={s1.formState.errors.name?.message} />
            </Field>

            <Field label="Role" error={s1.formState.errors.role?.message}>
              <SelectInput {...s1.register('role')} error={s1.formState.errors.role?.message}>
                <option value="">Select role</option>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </SelectInput>
            </Field>

            <Field label="Company" error={s1.formState.errors.company?.message}>
              <TextInput {...s1.register('company')} placeholder="Company name" error={s1.formState.errors.company?.message} />
            </Field>

            <Field label="Email" error={s1.formState.errors.email?.message}>
              <TextInput {...s1.register('email')} type="email" placeholder="your@email.com" error={s1.formState.errors.email?.message} />
            </Field>

            <Field label="Phone" error={s1.formState.errors.phone?.message}>
              <TextInput {...s1.register('phone')} type="tel" placeholder="+27 xx xxx xxxx" error={s1.formState.errors.phone?.message} />
            </Field>

            <div className="pt-2">
              <Button type="submit" className="w-full justify-center">Continue</Button>
            </div>
          </form>
        )}

        {/* Step 2 — Your operation */}
        {step === 2 && (
          <div className="space-y-7">
            <p className="mono-label text-[var(--muted)] mb-6">Your operation</p>

            <Field label="Sector(s)" error={s2Errors.sectors}>
              <ChipSelector
                options={SECTORS}
                selected={formData.sectors ?? []}
                onToggle={toggleSector}
                error={s2Errors.sectors}
              />
            </Field>

            <Field label="Approximate fleet size" error={s2Errors.fleetSize}>
              <div className="mt-1 flex flex-wrap gap-2">
                {FLEET_SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, fleetSize: s }))}
                    className={`mono-id px-3 py-1.5 border transition-all ${
                      formData.fleetSize === s
                        ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                        : 'border-[var(--rule-2)] text-[var(--muted)] hover:border-[var(--ink)]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Corridors / sites" error={s2Errors.corridors}>
              <div className="mt-1 flex flex-wrap gap-2">
                {CORRIDORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, corridors: c }))}
                    className={`mono-id px-3 py-1.5 border transition-all ${
                      formData.corridors === c
                        ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                        : 'border-[var(--rule-2)] text-[var(--muted)] hover:border-[var(--ink)]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Province(s)" error={s2Errors.provinces}>
              <ChipSelector
                options={PROVINCES}
                selected={formData.provinces ?? []}
                onToggle={toggleProvince}
                error={s2Errors.provinces}
              />
            </Field>

            <div className="flex gap-3 pt-2">
              <Button variant="ghost" arrow={false} onClick={() => setStep(1)} className="flex-1 justify-center">
                Back
              </Button>
              <Button onClick={handleStep2} className="flex-1 justify-center">
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 — What you'd like to discuss */}
        {step === 3 && (
          <div className="space-y-7">
            <p className="mono-label text-[var(--muted)] mb-6">Your enquiry</p>

            <Field label="Engagement type" error={s3Errors.engagementType}>
              <RadioGroup
                options={ENGAGEMENT_TYPES}
                value={formData.engagementType ?? ''}
                onChange={(v) => setFormData((prev) => ({ ...prev, engagementType: v }))}
                name="engagementType"
                error={s3Errors.engagementType}
              />
            </Field>

            <Field label="Situation (optional)">
              <textarea
                value={formData.situation ?? ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, situation: e.target.value }))}
                maxLength={500}
                rows={4}
                placeholder="Brief description of your current situation..."
                className="w-full resize-none border-b border-[var(--rule-2)] bg-transparent py-2.5 font-display text-[15px] text-[var(--ink)] placeholder:text-[var(--dim)] outline-none transition-colors focus:border-[var(--red)]"
              />
              <p className="mono-id mt-1 text-[var(--dim)] text-right">
                {(formData.situation ?? '').length}/500
              </p>
            </Field>

            <Field label="Preferred contact" error={s3Errors.contactPreference}>
              <RadioGroup
                options={CONTACT_PREFS}
                value={formData.contactPreference ?? ''}
                onChange={(v) => setFormData((prev) => ({ ...prev, contactPreference: v }))}
                name="contactPreference"
                error={s3Errors.contactPreference}
              />
            </Field>

            {error && (
              <p className="mono-id text-[var(--red)]">§ {error.toUpperCase()}</p>
            )}

            <div className="flex gap-3 pt-2">
              <Button variant="ghost" arrow={false} onClick={() => setStep(2)} className="flex-1 justify-center">
                Back
              </Button>
              <button
                onClick={handleStep3}
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--red)] border border-[var(--ink)] hover:border-[var(--red)] px-6 py-3.5 font-display font-medium text-[13px] transition-all duration-200 disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send to TIHLO'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
