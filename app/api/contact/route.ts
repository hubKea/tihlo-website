import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

function escape(s: string | undefined | null): string {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeArr(arr: string[]): string {
  return arr.map(escape).join(', ');
}

const ROLES = ['GM / COO', 'CFO', 'Procurement', 'Risk', 'Other'] as const;
const SECTORS = [
  'Coal',
  'Chrome',
  'Manganese',
  'Iron Ore',
  'Copper',
  'Aggregates',
  'Fuel',
  'Agri-bulk',
  'Other',
] as const;
const PROVINCES = [
  'Mpumalanga',
  'Limpopo',
  'Northern Cape',
  'Gauteng',
  'North West',
  'Other',
] as const;
const FLEET_SIZES = ['<10', '10–50', '50–200', '200+'] as const;
const CORRIDORS = ['1', '2–5', '6–15', '15+'] as const;
const ENGAGEMENT_TYPES = [
  '30-minute briefing',
  'Risk assessment',
  'Pilot corridor',
  'Just exploring',
] as const;
const CONTACT_PREFS = ['Email', 'Phone', 'Either'] as const;

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const CONTROL_CHAR_PATTERN = /[\u0000-\u001F\u007F]/;

const safeText = (max: number, min = 1) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max)
    .refine((value) => !CONTROL_CHAR_PATTERN.test(value), {
      message: 'Invalid characters',
    });

const schema = z.object({
  ticketId: z.string().regex(/^TIH-[A-Z0-9]{6}$/),
  name: safeText(120, 2),
  role: z.enum(ROLES),
  company: safeText(160, 2),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .min(9)
    .max(32)
    .regex(/^[\d\s+\-()]+$/),
  honeypot: z.string().max(0).optional().default(''),
  sectors: z.array(z.enum(SECTORS)).min(1).max(SECTORS.length),
  fleetSize: z.enum(FLEET_SIZES),
  corridors: z.enum(CORRIDORS),
  provinces: z.array(z.enum(PROVINCES)).min(1).max(PROVINCES.length),
  engagementType: z.enum(ENGAGEMENT_TYPES),
  situation: z.string().trim().max(500).optional().default(''),
  contactPreference: z.enum(CONTACT_PREFS),
});

const localSubmissions = new Map<string, number>();

function getClientIp(req: NextRequest) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

async function takeRateLimitSlot(ip: string) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    const res = await fetch(redisUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${redisToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        'SET',
        `contact:submission:${ip}`,
        String(Date.now()),
        'PX',
        String(RATE_LIMIT_WINDOW_MS),
        'NX',
      ]),
    });

    if (!res.ok) {
      throw new Error('Rate limit store unavailable');
    }

    const data = (await res.json()) as { result?: 'OK' | null };
    return data.result === 'OK';
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Production rate limit store is not configured');
  }

  const now = Date.now();
  const last = localSubmissions.get(ip) ?? 0;
  if (now - last < RATE_LIMIT_WINDOW_MS) return false;

  localSubmissions.set(ip, now);
  return true;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  try {
    const allowed = await takeRateLimitSlot(ip);
    if (!allowed) {
      return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
    }
  } catch (err) {
    console.error('Rate limit error:', err);
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 422 });
  }

  const d = parsed.data;

  // Honeypot check
  if (d.honeypot) {
    return NextResponse.json({ ok: true }); // silent reject
  }

  const toEmail = process.env.CONTACT_EMAIL ?? 'info@tihlo.co.za';
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
  }

  const html = `
<div style="font-family: monospace; font-size: 13px; color: #0E1014; padding: 32px;">
  <p style="color: #B42318; letter-spacing: 0.2em; font-size: 11px; text-transform: uppercase; margin: 0 0 24px;">TIHLO — BRIEFING REQUEST</p>
  <p style="font-size: 11px; color: #666; margin: 0 0 4px;">TICKET: ${escape(d.ticketId)}</p>
  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

  <p style="font-size: 11px; color: #666; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.15em;">CONTACT</p>
  <p style="margin: 0 0 4px;"><strong>Name:</strong> ${escape(d.name)}</p>
  <p style="margin: 0 0 4px;"><strong>Role:</strong> ${escape(d.role)}</p>
  <p style="margin: 0 0 4px;"><strong>Company:</strong> ${escape(d.company)}</p>
  <p style="margin: 0 0 4px;"><strong>Email:</strong> ${escape(d.email)}</p>
  <p style="margin: 0 0 20px;"><strong>Phone:</strong> ${escape(d.phone)}</p>

  <p style="font-size: 11px; color: #666; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.15em;">OPERATION</p>
  <p style="margin: 0 0 4px;"><strong>Sectors:</strong> ${escapeArr(d.sectors)}</p>
  <p style="margin: 0 0 4px;"><strong>Fleet size:</strong> ${escape(d.fleetSize)}</p>
  <p style="margin: 0 0 4px;"><strong>Corridors:</strong> ${escape(d.corridors)}</p>
  <p style="margin: 0 0 20px;"><strong>Provinces:</strong> ${escapeArr(d.provinces)}</p>

  <p style="font-size: 11px; color: #666; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.15em;">ENQUIRY</p>
  <p style="margin: 0 0 4px;"><strong>Engagement type:</strong> ${escape(d.engagementType)}</p>
  <p style="margin: 0 0 4px;"><strong>Contact preference:</strong> ${escape(d.contactPreference)}</p>
  ${d.situation ? `<p style="margin: 0 0 4px;"><strong>Situation:</strong> ${escape(d.situation)}</p>` : ''}
</div>
`;

  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: 'TIHLO <no-reply@tihlo.co.za>',
      to: [toEmail],
      reply_to: d.email,
      subject: `[${d.ticketId}] Briefing request — ${d.company}`,
      html,
    });

    return NextResponse.json({ ok: true, ticketId: d.ticketId });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
  }
}
