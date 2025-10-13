import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function POST(req) {
  try {
    const { libraryName, email, phone, zipCodes, message } = await req.json();

    // Validate required fields
    if (!libraryName || !email || !zipCodes) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    const { data, error } = await supabase
      .from('demo_requests')
      .insert([
        {
          library_name: libraryName,
          email: email,
          phone: phone || null,
          zip_codes: zipCodes,
          message: message || null,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save request' },
        { status: 500 }
      );
    }

    // Send email notification to you
    await sendNotificationEmail({
      libraryName,
      email,
      phone,
      zipCodes,
      message
    });

    // Send confirmation email to library
    await sendConfirmationEmail(email, libraryName);

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Email notification to you (the admin)
async function sendNotificationEmail({ libraryName, email, phone, zipCodes, message }) {
  try {
    // Option 1: Use Resend (recommended)
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     from: 'Throwback AI <noreply@throwbackai.app>',
    //     to: 'your-email@example.com',
    //     subject: `🎉 New Library Demo Request: ${libraryName}`,
    //     html: `
    //       <h2>New Library Demo Request</h2>
    //       <p><strong>Library:</strong> ${libraryName}</p>
    //       <p><strong>Email:</strong> ${email}</p>
    //       <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    //       <p><strong>Zip Codes:</strong> ${zipCodes}</p>
    //       <p><strong>Message:</strong> ${message || 'None'}</p>
    //       <hr>
    //       <p>Respond within 24 hours!</p>
    //     `
    //   })
    // });

    // Option 2: Simple console log for now (we'll set up email next)
    console.log('📧 New Demo Request:', {
      libraryName,
      email,
      phone,
      zipCodes,
      message
    });

    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}

// Confirmation email to library
async function sendConfirmationEmail(email, libraryName) {
  try {
    // Option 1: Use Resend
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     from: 'Throwback AI <hello@throwbackai.app>',
    //     to: email,
    //     subject: 'Thanks for Your Interest in Throwback AI',
    //     html: `
    //       <h2>Thanks for requesting a demo, ${libraryName}!</h2>
    //       <p>We received your request and will reach out within 24 hours to set up your free trial.</p>
    //       <p>In the meantime, feel free to reply with any questions.</p>
    //       <br>
    //       <p>Best,<br>Alex<br>Throwback AI</p>
    //     `
    //   })
    // });

    // Option 2: Console log for now
    console.log('📧 Confirmation sent to:', email);

    return true;
  } catch (error) {
    console.error('Confirmation email error:', error);
    return false;
  }
}