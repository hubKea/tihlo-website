import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  ticketId: z.string(),
  name: z.string().min(2),
  role: z.string(),
  company: z.string(),
  email: z.string().email(),
  phone: z.string(),
  honeypot: z.string().max(0),
  sectors: z.array(z.string()),
  fleetSize: z.string(),
  corridors: z.string(),
  provinces: z.array(z.string()),
  engagementType: z.string(),
  situation: z.string().optional(),
  contactPreference: z.string(),
});

// Simple in-memory rate limit (resets per serverless instance)
const submissions = new Map<string, number>();

export async function POST(req: NextRequest) {
  // Rate limiting — 1 per IP per 5 minutes
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const now = Date.now();
  const last = submissions.get(ip) ?? 0;
  if (now - last < 5 * 60 * 1000) {
    return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
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

  const html = `
<div style="font-family: monospace; font-size: 13px; color: #0E1014; padding: 32px;">
  <p style="color: #B42318; letter-spacing: 0.2em; font-size: 11px; text-transform: uppercase; margin: 0 0 24px;">TIHLO — BRIEFING REQUEST</p>
  <p style="font-size: 11px; color: #666; margin: 0 0 4px;">TICKET: ${d.ticketId}</p>
  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

  <p style="font-size: 11px; color: #666; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.15em;">CONTACT</p>
  <p style="margin: 0 0 4px;"><strong>Name:</strong> ${d.name}</p>
  <p style="margin: 0 0 4px;"><strong>Role:</strong> ${d.role}</p>
  <p style="margin: 0 0 4px;"><strong>Company:</strong> ${d.company}</p>
  <p style="margin: 0 0 4px;"><strong>Email:</strong> ${d.email}</p>
  <p style="margin: 0 0 20px;"><strong>Phone:</strong> ${d.phone}</p>

  <p style="font-size: 11px; color: #666; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.15em;">OPERATION</p>
  <p style="margin: 0 0 4px;"><strong>Sectors:</strong> ${d.sectors.join(', ')}</p>
  <p style="margin: 0 0 4px;"><strong>Fleet size:</strong> ${d.fleetSize}</p>
  <p style="margin: 0 0 4px;"><strong>Corridors:</strong> ${d.corridors}</p>
  <p style="margin: 0 0 20px;"><strong>Provinces:</strong> ${d.provinces.join(', ')}</p>

  <p style="font-size: 11px; color: #666; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.15em;">ENQUIRY</p>
  <p style="margin: 0 0 4px;"><strong>Engagement type:</strong> ${d.engagementType}</p>
  <p style="margin: 0 0 4px;"><strong>Contact preference:</strong> ${d.contactPreference}</p>
  ${d.situation ? `<p style="margin: 0 0 4px;"><strong>Situation:</strong> ${d.situation}</p>` : ''}
</div>
`;

  try {
    submissions.set(ip, now);

    const resend = new Resend(process.env.RESEND_API_KEY);
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
