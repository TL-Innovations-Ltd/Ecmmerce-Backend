const transporter = require('../../../utils/gmail_transport');
const LimiaiContact = require('../models/limiai_contact_model');

function limiaiContactEmailTemplate({ name, company }) {
  const displayName = name || 'Valued Customer';
  const companyText = company ? ` from ${company}` : '';
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Thank You for Contacting Limi</title>
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
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%);
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
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="sparkle" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="white" opacity="0.15"/><circle cx="80" cy="80" r="1.5" fill="white" opacity="0.1"/><circle cx="50" cy="15" r="0.8" fill="white" opacity="0.2"/><circle cx="15" cy="70" r="1.2" fill="white" opacity="0.12"/></pattern></defs><rect width="100" height="100" fill="url(%23sparkle)"/></svg>');
        animation: sparkle 25s ease-in-out infinite;
      }
      
      @keyframes sparkle {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
        50% { transform: translateY(-15px) rotate(180deg); opacity: 1; }
      }
      
      .logo-container {
        width: 90px;
        height: 90px;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 22px;
        margin: 0 auto 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 42px;
        backdrop-filter: blur(15px);
        border: 2px solid rgba(255, 255, 255, 0.3);
        position: relative;
        z-index: 2;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }
      
      .header h1 {
        margin: 0;
        font-size: 34px;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: -0.8px;
        position: relative;
        z-index: 2;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .header p {
        margin: 16px 0 0;
        font-size: 17px;
        color: rgba(255, 255, 255, 0.95);
        font-weight: 400;
        position: relative;
        z-index: 2;
      }
      
      .content {
        padding: 50px 40px;
        background: #ffffff;
      }
      
      .greeting {
        font-size: 20px;
        color: #1f2937;
        margin: 0 0 28px;
        font-weight: 600;
      }
      
      .intro-text {
        font-size: 16px;
        line-height: 1.7;
        color: #4b5563;
        margin: 0 0 40px;
      }
      
      .message-card {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border-radius: 18px;
        padding: 36px;
        margin: 0 0 40px;
        border: 1px solid #e2e8f0;
        position: relative;
        overflow: hidden;
      }
      
      .message-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: linear-gradient(90deg, #3b82f6, #1d4ed8, #1e40af);
        border-radius: 18px 18px 0 0;
      }
      
      .card-title {
        font-size: 24px;
        font-weight: 700;
        color: #1f2937;
        margin: 0 0 20px;
        text-align: center;
      }
      
      .steps-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 24px;
        margin-top: 24px;
      }
      
      .step-item {
        background: #ffffff;
        padding: 28px;
        border-radius: 14px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        border: 1px solid #e5e7eb;
        transition: all 0.3s ease;
        position: relative;
      }
      
      .step-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
      }
      
      .step-number {
        width: 52px;
        height: 52px;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        border-radius: 14px;
        margin: 0 auto 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 700;
        color: white;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }
      
      .step-title {
        font-size: 16px;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 10px;
      }
      
      .step-desc {
        font-size: 14px;
        color: #6b7280;
        line-height: 1.6;
        margin: 0;
      }
      
      .cta-section {
        text-align: center;
        margin: 45px 0;
      }
      
      .visit-btn {
        display: inline-block;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: #ffffff;
        text-decoration: none;
        padding: 18px 36px;
        border-radius: 14px;
        font-weight: 700;
        font-size: 16px;
        box-shadow: 0 12px 28px rgba(59, 130, 246, 0.35);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .visit-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
        transition: left 0.6s;
      }
      
      .visit-btn:hover::before {
        left: 100%;
      }
      
      .visit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 18px 40px rgba(59, 130, 246, 0.45);
      }
      
      .btn-icon {
        margin-right: 10px;
        font-size: 18px;
      }
      
      .footer {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        padding: 36px 40px;
        border-top: 1px solid #e5e7eb;
      }
      
      .footer-content {
        text-align: center;
        color: #6b7280;
        font-size: 14px;
        line-height: 1.7;
      }
      
      .footer-divider {
        width: 80px;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #1d4ed8);
        margin: 0 auto 20px;
        border-radius: 2px;
      }
      
      .company-name {
        font-weight: 700;
        color: #3b82f6;
      }
      
      @media (max-width: 640px) {
        body { padding: 12px; }
        .email-container { border-radius: 16px; }
        .header, .content, .footer { padding: 32px 24px; }
        .header h1 { font-size: 30px; }
        .steps-grid { grid-template-columns: 1fr; }
        .message-card { padding: 28px; }
        .visit-btn { padding: 16px 28px; font-size: 15px; }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <div class="logo-container">💬</div>
        <h1>Message Received</h1>
        <p>We'll be in touch soon</p>
      </div>
      
      <div class="content">
        <div class="greeting">Hello ${displayName}${companyText}!</div>
        
        <div class="intro-text">
          Thank you for reaching out to <span class="company-name">Limi</span>. We've successfully received your message and our team is already reviewing it. We appreciate you taking the time to connect with us.
        </div>
        
        
        <div class="cta-section">
          <a href="https://www.limilighting.com" class="visit-btn">
            <span class="btn-icon">🌟</span>
            Visit Limi
          </a>
        </div>
      </div>
      
      <div class="footer">
        <div class="footer-divider"></div>
        <div class="footer-content">
          You're receiving this email because you contacted <span class="company-name">Limi</span>.<br/>
          Have additional questions? Simply reply to this email and we'll get back to you promptly.
          <br/><br/>
          © ${new Date().getFullYear()} Limi. All rights reserved.
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

async function submitLimiaiContact({ name, email, company }) {
  if (!email) throw new Error('Email is required');

  const doc = await LimiaiContact.create({ name, email, company });

  const mailOptions = {
    from: process.env.GMAIL_SECRET_EMIAL,
    to: email,
    subject: 'We received your message — Limi',
    html: limiaiContactEmailTemplate({ name, company }),
  };

  await transporter.sendMail(mailOptions);

  return { success: true, id: doc._id };
}

async function getLimiaiContacts() {
  const list = await LimiaiContact.find({}).sort({ createdAt: -1 });
  return list;
}

module.exports = { submitLimiaiContact, getLimiaiContacts };
