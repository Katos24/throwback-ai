import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const payload = await req.json();
    
    // Webhook sends data in payload.record
    const { library_name, email, phone, zip_codes, message } = payload.record;

    // Send email to yourself
    await resend.emails.send({
      from: 'Throwback AI <notifications@throwbackai.app>',
      to: 'hello@throwbackai.app', // Your email
      subject: `🎯 New Demo Request: ${library_name}`,
      html: `
        <h2>New Demo Request Submitted</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Organization Details</h3>
          <p><strong>Library Name:</strong> ${library_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Service Area (Zip Codes):</strong> ${zip_codes}</p>
        </div>

        ${message ? `
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Message</h3>
            <p>${message}</p>
          </div>
        ` : ''}

        <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 8px;">
          <h3>Next Steps</h3>
          <ol>
            <li>Reply to ${email} to schedule onboarding call</li>
            <li>Collect branding assets (logo, colors)</li>
            <li>Set up their library portal</li>
            <li>Send portal link within 24-48 hours</li>
          </ol>
        </div>

        <p style="margin-top: 30px; color: #666; font-size: 12px;">
          Submitted: ${new Date().toLocaleString()}
        </p>
      `
    });

    // Also send confirmation to the library
    await resend.emails.send({
      from: 'Throwback AI <hello@throwbackai.app>',
      to: email,
      subject: 'Demo Request Received - Throwback AI for Libraries',
      html: `
        <h2>Thanks for Your Interest in Throwback AI!</h2>
        
        <p>Hi ${library_name} team,</p>
        
        <p>We've received your demo request and are excited to help you offer photo restoration to your community.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>What Happens Next?</h3>
          <ol>
            <li>We'll reach out within 1 business day to schedule a quick call</li>
            <li>We'll collect your branding (logo, colors, zip codes)</li>
            <li>We'll set up your custom portal within 24-48 hours</li>
            <li>You'll receive your portal link and marketing materials</li>
          </ol>
        </div>

        <p>In the meantime, feel free to reply to this email with any questions!</p>
        
        <p>Best regards,<br>
        The Throwback AI Team</p>
        
        <p style="margin-top: 30px; color: #666; font-size: 12px;">
          If you didn't request this demo, please ignore this email.
        </p>
      `
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Email notification error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}