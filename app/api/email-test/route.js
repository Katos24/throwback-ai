export async function GET() {
  console.log('=== EMAIL TEST ===');
  console.log('API Key:', process.env.RESEND_API_KEY?.substring(0, 15) + '...');
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['contact@dailycommuterny.com'],
        subject: 'Email Test',
        html: '<p>Testing Resend API</p>'
      })
    });

    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));

    return Response.json({
      status: response.status,
      ok: response.ok,
      data
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}