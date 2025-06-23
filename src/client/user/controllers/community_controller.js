
const CommunitySubscription = require('../models/community.model');
const transporter = require('../../../utils/gmail_transport');
require('dotenv').config();

// Email templates
const emailTemplates = {
  'LIMI_Club': {
    subject: '🚀 Welcome to LIMI Club!',
    text: 'Join our community for exclusive updates and early access',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to LIMI Club</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body { margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; }
        .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: #4a6cf7; padding: 30px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 30px; background: #f9f9f9; }
        .card { background: white; border-radius: 8px; padding: 30px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h2 { color: #2c3e50; margin-top: 0; }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: #4a6cf7;
          color: white !important;
          text-decoration: none;
          border-radius: 30px;
          font-weight: 500;
          margin: 20px 0;
        }
        .footer { 
          text-align: center; 
          padding: 20px; 
          color: #777; 
          font-size: 14px; 
          border-top: 1px solid #eee;
        }
        .social-links { margin: 20px 0; }
        .social-links a { margin: 0 10px; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Welcome to LIMI Club</h1>
        </div>
        <div class="content">
          <div class="card">
            <h2>Hello!</h2>
            <p>Thank you for joining LIMI Club, your gateway to exclusive updates and early access to our latest innovations.</p>
            <p>As a member, you'll enjoy:</p>
            <ul>
              <li>Exclusive previews of upcoming products</li>
              <li>Special member-only discounts</li>
              <li>Early access to sales and promotions</li>
              <li>Insider updates on new collections</li>
            </ul>
            <p>We're thrilled to have you with us on this exciting journey!</p>
            <div style="text-align: center;">
              <a href="#" class="button">Explore Member Benefits</a>
            </div>
          </div>
          <div class="social-links" style="text-align: center;">
            <p>Connect with us:</p>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" width="30" height="30" alt="Facebook"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="30" height="30" alt="Twitter"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" width="30" height="30" alt="Instagram"></a>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} LIMI. All rights reserved.</p>
          <p>You're receiving this email because you signed up for LIMI Club.</p>
          <p><a href="#" style="color: #4a6cf7; text-decoration: none;">Unsubscribe</a> | <a href="#" style="color: #4a6cf7; text-decoration: none;">Preferences</a></p>
        </div>
      </div>
    </body>
    </html>
    `
  },
  'The_Luminaries': {
    subject: '✨ Welcome to The Luminaries!',
    text: 'Be part of our enlightened group of early adopters',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to The Luminaries</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500&display=swap');
        body { margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; line-height: 1.8; color: #333; }
        .email-container { max-width: 600px; margin: 0 auto; background: #f8f5f0; }
        .header { 
          background: linear-gradient(135deg, #2c3e50 0%, #4a6cf7 100%); 
          padding: 40px 20px; 
          text-align: center; 
          color: white;
        }
        .header h1 { 
          font-family: 'Playfair Display', serif; 
          font-size: 36px; 
          margin: 0; 
          font-weight: 700; 
          letter-spacing: 1px;
        }
        .header p { 
          font-size: 18px; 
          opacity: 0.9; 
          margin: 10px 0 0;
          font-weight: 300;
        }
        .content { padding: 30px; }
        .card { 
          background: white; 
          border-radius: 4px; 
          padding: 40px; 
          margin-bottom: 20px; 
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        h2 { 
          color: #2c3e50; 
          margin-top: 0; 
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          font-size: 28px;
        }
        .highlight {
          background: #fff9e6;
          border-left: 4px solid #ffd700;
          padding: 15px;
          margin: 20px 0;
          font-style: italic;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: #4a6cf7;
          color: white !important;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
          margin: 20px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 14px;
        }
        .footer { 
          text-align: center; 
          padding: 20px; 
          color: #777; 
          font-size: 13px; 
          line-height: 1.6;
        }
        .signature {
          margin-top: 30px;
          border-top: 1px solid #eee;
          padding-top: 20px;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>The Luminaries</h1>
          <p>Enlightening the path for early adopters</p>
        </div>
        <div class="content">
          <div class="card">
            <h2>Welcome, Visionary</h2>
            <p>We're delighted to welcome you to The Luminaries, our exclusive community of forward-thinkers and early adopters.</p>
            
            <div class="highlight">
              "The future belongs to those who believe in the beauty of their dreams."<br>
              <small>— Eleanor Roosevelt</small>
            </div>
            
            <p>As a Luminary, you'll enjoy:</p>
            <ul>
              <li>Early access to cutting-edge features</li>
              <li>Exclusive insights from industry leaders</li>
              <li>Private networking opportunities</li>
              <li>Influence over product development</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" class="button">Begin Your Journey</a>
            </div>
            
            <p>We can't wait to see the impact we'll create together.</p>
            
            <div class="signature">
              <p>Warm regards,<br>
              <strong>The Luminaries Team</strong></p>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} The Luminaries. All rights reserved.</p>
          <p>You're receiving this email because you joined The Luminaries community.</p>
          <p><a href="#" style="color: #4a6cf7; text-decoration: none;">Unsubscribe</a> | <a href="#" style="color: #4a6cf7; text-decoration: none;">Preferences</a></p>
        </div>
      </div>
    </body>
    </html>
    `
  },
  'LIMI_Collective': {
    subject: '🌟 Welcome to LIMI Collective!',
    text: 'Connect with like-minded design & tech enthusiasts',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to LIMI Collective</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        body { margin: 0; padding: 0; font-family: 'Montserrat', Arial, sans-serif; line-height: 1.7; color: #333; }
        .email-container { max-width: 600px; margin: 0 auto; background: #f5f7fa; }
        .header { 
          background: #2c3e50; 
          padding: 30px 20px; 
          text-align: center; 
          color: white;
        }
        .header h1 { 
          margin: 0; 
          font-size: 32px; 
          font-weight: 700; 
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }
        .header p { 
          font-size: 16px; 
          opacity: 0.9; 
          margin: 10px 0 0;
          font-weight: 300;
        }
        .content { padding: 30px; }
        .card { 
          background: white; 
          border-radius: 12px; 
          padding: 30px; 
          margin-bottom: 20px; 
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        h2 { 
          color: #2c3e50; 
          margin: 0 0 20px 0;
          font-size: 26px;
          font-weight: 700;
          text-align: center;
          position: relative;
          padding-bottom: 15px;
        }
        h2:after {
          content: '';
          display: block;
          width: 60px;
          height: 3px;
          background: #4a6cf7;
          margin: 15px auto 0;
        }
        .feature-box {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
          background: #f9f9f9;
          padding: 15px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .feature-box:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .feature-icon {
          background: #4a6cf7;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          flex-shrink: 0;
          font-weight: bold;
        }
        .feature-text h3 {
          margin: 0 0 5px 0;
          color: #2c3e50;
          font-size: 16px;
        }
        .feature-text p {
          margin: 0;
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: #4a6cf7;
          color: white !important;
          text-decoration: none;
          border-radius: 30px;
          font-weight: 600;
          margin: 20px 0;
          text-align: center;
          transition: all 0.3s ease;
          border: 2px solid #4a6cf7;
        }
        .button:hover {
          background: transparent;
          color: #4a6cf7 !important;
        }
        .footer { 
          text-align: center; 
          padding: 25px 20px; 
          color: #777; 
          font-size: 13px;
          line-height: 1.6;
        }
        .social-links { 
          margin: 25px 0;
          text-align: center;
        }
        .social-links a { 
          display: inline-block;
          margin: 0 8px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e9ecef;
          color: #2c3e50;
          text-align: center;
          line-height: 36px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .social-links a:hover {
          background: #4a6cf7;
          color: white;
          transform: translateY(-3px);
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>LIMI Collective</h1>
          <p>Where design meets technology</p>
        </div>
        <div class="content">
          <div class="card">
            <h2>Welcome to the Collective</h2>
            <p style="text-align: center; margin-bottom: 30px; color: #555;">
              We're thrilled to have you join our community of passionate designers and tech enthusiasts.
            </p>
            
            <div class="feature-box">
              <div class="feature-icon">1</div>
              <div class="feature-text">
                <h3>Connect & Collaborate</h3>
                <p>Join discussions with like-minded professionals and share your knowledge with the community.</p>
              </div>
            </div>
            
            <div class="feature-box">
              <div class="feature-icon">2</div>
              <div class="feature-text">
                <h3>Learn & Grow</h3>
                <p>Access exclusive resources, tutorials, and workshops to enhance your skills.</p>
              </div>
            </div>
            
            <div class="feature-box">
              <div class="feature-icon">3</div>
              <div class="feature-text">
                <h3>Showcase Your Work</h3>
                <p>Get feedback on your projects and discover opportunities to collaborate.</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0 20px;">
              <a href="#" class="button">Get Started</a>
            </div>
            
            <p style="text-align: center; font-size: 15px; color: #666; margin-bottom: 0;">
              We can't wait to see what we'll create together!
            </p>
          </div>
          
          <div class="social-links">
            <a href="#">f</a>
            <a href="#">in</a>
            <a href="#">t</a>
            <a href="#">d</a>
            <a href="#">g+</a>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} LIMI Collective. All rights reserved.</p>
            <p>You're receiving this email because you joined LIMI Collective.</p>
            <p>
              <a href="#" style="color: #4a6cf7; text-decoration: none; margin: 0 5px;">Unsubscribe</a> | 
              <a href="#" style="color: #4a6cf7; text-decoration: none; margin: 0 5px;">Preferences</a> | 
              <a href="#" style="color: #4a6cf7; text-decoration: none; margin: 0 5px;">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `
  }
};

// Subscribe to community
const subscribeToCommunity = async (req, res) => {
  try {
    const { email, communityType } = req.body;

    // Basic validation
    if (!email || !communityType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and community type are required' 
      });
    }

    if (!emailTemplates[communityType]) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid community type' 
      });
    }

    // Check if email is already subscribed to this community
    const existing = await CommunitySubscription.findOne({
      email: email,
      communityType: communityType 
    });

    if (existing?.communityType === communityType) {
      return res.status(400).json({ 
        success: false, 
        message: `You're already subscribed to ${communityType}` 
      });
    }

    // Create subscription record using the model
    const subscription = new CommunitySubscription({
      email: email,
      communityType : communityType
    });

    await subscription.save();

    // Send welcome email
    const template = emailTemplates[communityType];
   

    const mailOptions = {
      from: process.env.GMAIL_SECRET_EMAIL,
      to: email,
      subject: template.subject,
      text: template.text,
      html: template.html
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: `Successfully subscribed to ${communityType}`,
      data: subscription
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process subscription',
      error: error.message 
    });
  }
};

// Get all community subscriptions (admin only)
const getCommunitySubscriptions = async (req, res) => {
  try {
    const subscriptions = await CommunitySubscription.find({})

    res.status(200).json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  subscribeToCommunity,
  getCommunitySubscriptions
};
