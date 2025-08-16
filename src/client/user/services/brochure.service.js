const transporter = require('../../../utils/gmail_transport');
const BrochureRequest = require('../models/brochure_request_model');

// Simple brochure-style HTML template generator
function brochureTemplate(displayName = 'Valued Customer') {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Your Premium Product Brochure</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      * { box-sizing: border-box; }
      body { 
        margin: 0; 
        padding: 0; 
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        padding: 20px;
      }
      
      .email-container {
        max-width: 680px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        position: relative;
      }
      
      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 50px 40px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      
      .header::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1.5" fill="white" opacity="0.08"/><circle cx="50" cy="10" r="0.8" fill="white" opacity="0.12"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        animation: float 20s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      .logo-icon {
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        margin: 0 auto 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        position: relative;
        z-index: 2;
      }
      
      .header h1 {
        margin: 0;
        font-size: 32px;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: -0.5px;
        position: relative;
        z-index: 2;
      }
      
      .header p {
        margin: 12px 0 0;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 400;
        position: relative;
        z-index: 2;
      }
      
      .content {
        padding: 50px 40px;
        background: #ffffff;
      }
      
      .greeting {
        font-size: 18px;
        color: #1f2937;
        margin: 0 0 24px;
        font-weight: 500;
      }
      
      .intro-text {
        font-size: 16px;
        line-height: 1.6;
        color: #4b5563;
        margin: 0 0 40px;
      }
      
      .features-card {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border-radius: 16px;
        padding: 32px;
        margin: 0 0 40px;
        border: 1px solid #e2e8f0;
        position: relative;
        overflow: hidden;
      }
      
      .features-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea, #764ba2);
      }
      
      .features-title {
        font-size: 22px;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 24px;
        text-align: center;
      }
      
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
      }
      
      .feature-item {
        background: #ffffff;
        padding: 24px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        border: 1px solid #e5e7eb;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      
      .feature-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }
      
      .feature-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 12px;
        margin: 0 auto 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
      
      .feature-title {
        font-size: 16px;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 8px;
      }
      
      .feature-desc {
        font-size: 14px;
        color: #6b7280;
        line-height: 1.5;
        margin: 0;
      }
      
      .cta-section {
        text-align: center;
        margin: 40px 0;
      }
      
      .download-btn {
        display: inline-block;
        background: linear-gradient(135deg, #10b981, #059669);
        color: #ffffff;
        text-decoration: none;
        padding: 16px 32px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 16px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .download-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
      }
      
      .download-btn:hover::before {
        left: 100%;
      }
      
      .download-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
      }
      
      .download-icon {
        margin-right: 8px;
        font-size: 18px;
      }
      
      .fallback-link {
        margin-top: 24px;
        padding: 20px;
        background: #f9fafb;
        border-radius: 8px;
        border-left: 4px solid #6b7280;
      }
      
      .fallback-text {
        font-size: 14px;
        color: #6b7280;
        margin: 0 0 8px;
      }
      
      .fallback-url {
        font-size: 13px;
        color: #374151;
        word-break: break-all;
        font-family: 'Courier New', monospace;
        background: #ffffff;
        padding: 8px 12px;
        border-radius: 4px;
        border: 1px solid #d1d5db;
      }
      
      .footer {
        background: #f8fafc;
        padding: 32px 40px;
        border-top: 1px solid #e5e7eb;
      }
      
      .footer-content {
        text-align: center;
        color: #6b7280;
        font-size: 14px;
        line-height: 1.6;
      }
      
      .footer-divider {
        width: 60px;
        height: 2px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        margin: 0 auto 16px;
        border-radius: 1px;
      }
      
      @media (max-width: 640px) {
        body { padding: 10px; }
        .email-container { border-radius: 16px; }
        .header, .content, .footer { padding: 30px 24px; }
        .header h1 { font-size: 28px; }
        .features-grid { grid-template-columns: 1fr; }
        .features-card { padding: 24px; }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <div class="logo-icon">📋</div>
        <h1>Premium Brochure</h1>
        <p>Your comprehensive product guide awaits</p>
      </div>
      
      <div class="content">
        <div class="greeting">Hello ${displayName},</div>
        
        <div class="intro-text">
          Thank you for your interest in our products! We're excited to share our comprehensive brochure with you. 
          This premium guide contains everything you need to make an informed decision about our solutions.
        </div>
        
        <div class="features-card">
          <h2 class="features-title">What's Inside Your Brochure</h2>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">🏷️</div>
              <div class="feature-title">Complete Product Range</div>
              <div class="feature-desc">Detailed specifications, high-quality imagery, and technical documentation for our entire catalog.</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">💡</div>
              <div class="feature-title">Smart Solutions</div>
              <div class="feature-desc">Real-world use cases, implementation examples, and success stories from our clients.</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">💰</div>
              <div class="feature-title">Transparent Pricing</div>
              <div class="feature-desc">Clear pricing tiers, volume discounts, and flexible payment options tailored to your needs.</div>
            </div>
          </div>
        </div>
        
        <div class="cta-section">
          <a href="${process.env.BROCHURE_DOWNLOAD_URL || '#'}" class="download-btn">
            <span class="download-icon">⬇️</span>
            Download Premium Brochure
          </a>
          
          <div class="fallback-link">
            <div class="fallback-text">Having trouble with the download button?</div>
            <div class="fallback-url">${process.env.BROCHURE_DOWNLOAD_URL || 'Please set BROCHURE_DOWNLOAD_URL in your environment variables'}</div>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <div class="footer-divider"></div>
        <div class="footer-content">
          You received this email because you requested our product brochure.<br/>
          If you didn't make this request, you can safely ignore this message.
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

async function sendBrochureEmail(email) {
  // Always save the requester email to the collection (per simplified schema)
  await BrochureRequest.create({ email });

  const mailOptions = {
    from: process.env.GMAIL_SECRET_EMIAL,
    to: email,
    subject: 'Your Product Brochure',
    html: brochureTemplate(),
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Brochure sent' };
  } catch (err) {
    throw new Error(err.message || 'Failed to send brochure email');
  }
}

async function Brochure_Email_Service() {
  try {
    const brochureRequests = await BrochureRequest.find({});
    return brochureRequests;
  } catch (error) {
    throw new Error(error.message || 'Failed to retrieve brochure requests');
  }
}

module.exports = { sendBrochureEmail, Brochure_Email_Service };
