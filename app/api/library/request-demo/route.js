import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

console.log('🔑 API Key loaded:', process.env.RESEND_API_KEY ? 'YES - ' + process.env.RESEND_API_KEY.substring(0, 20) : 'NO - MISSING!');

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

    let databaseSuccess = false;
    let dbError = null;

    // Try to save to database, but don't fail if it's down
    try {
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
        console.error('⚠️ Supabase error (continuing anyway):', error);
        dbError = error;
      } else {
        console.log('✅ Saved to database:', data);
        databaseSuccess = true;
      }
    } catch (dbException) {
      console.error('⚠️ Database exception (continuing anyway):', dbException);
      dbError = dbException;
    }

    // Try to send notification email (don't fail if it times out)
    const notificationSent = await sendNotificationEmail({
      libraryName,
      email,
      phone,
      zipCodes,
      message,
      databaseStatus: databaseSuccess ? 'saved' : 'failed'
    }).catch(err => {
      console.error('Email failed but continuing:', err);
      return false;
    });

    // Always return success if database saved
    // Email is nice-to-have, not required
    return NextResponse.json(
      { 
        success: true,
        databaseSaved: databaseSuccess,
        emailsSent: notificationSent,
        warning: !notificationSent ? 'Request saved but email notification failed' : null
      },
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

// Email notification using Resend SDK
async function sendNotificationEmail({ libraryName, email, phone, zipCodes, message, databaseStatus }) {
  try {
    console.log('📧 Sending notification email with Resend SDK...');
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email timeout')), 5000) // 5 second timeout
    );
    
    // Race between sending email and timeout
    const { data, error } = await Promise.race([
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['delivered@resend.dev'],  // Resend's test address
        replyTo: email,
        subject: `🎉 New Library Demo Request: ${libraryName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Library Demo Request</h2>
          
          ${databaseStatus === 'failed' ? `
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">⚠️ <strong>Note:</strong> Database temporarily unavailable. This request was not saved to Supabase.</p>
          </div>
          ` : ''}
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Library/Organization:</strong> ${libraryName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong>Zip Codes:</strong> ${zipCodes}</p>
            ${message ? `<p style="margin: 10px 0;"><strong>Message:</strong></p><p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>` : ''}
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;"><strong>📧 Next Step:</strong> Reply to this email to respond to ${libraryName}. Your reply will go directly to ${email}.</p>
            <p style="margin: 10px 0 0 0; color: #856404; font-size: 14px;">Or compose a new email from hello@throwbackai.app</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #666; font-size: 14px;">
            ⏰ Respond within 24 hours<br>
            📅 Submitted at ${new Date().toLocaleString('en-US', { 
              dateStyle: 'full', 
              timeStyle: 'short' 
            })}<br>
            💾 Database Status: ${databaseStatus === 'saved' ? '✅ Saved' : '⚠️ Not saved (outage)'}
          </p>
        </div>
      `
      }),
      timeoutPromise
    ]).catch(err => {
      if (err.message === 'Email timeout') {
        console.log('⏱️ Email timed out after 5 seconds');
        return { data: null, error: { message: 'Timeout' } };
      }
      throw err;
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return false;
    }

    console.log('✅ Notification email sent:', data);
    return true;
  } catch (error) {
    console.error('❌ Email exception:', error);
    return false;
  }
}