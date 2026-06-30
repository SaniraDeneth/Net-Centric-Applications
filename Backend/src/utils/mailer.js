const nodemailer = require('nodemailer');

const getTransporter = async () => {
  // Check if custom SMTP env variables are configured
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // Fallback: Create Ethereal test account
  console.log('No SMTP config found. Generating Ethereal test account...');
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
};

const sendInvitationEmail = async (email, role, inviteLink) => {
  try {
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: '"UniShowcase Portal" <noreply@unishowcase.edu>',
      to: email,
      subject: `You have been invited to join UniShowcase as a ${role}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 12px;">
          <h2 style="color: #4f46e5; margin-bottom: 20px;">Welcome to UniShowcase!</h2>
          <p>Hi there,</p>
          <p>You have been invited to register as a <strong>${role}</strong> on our university's exclusive project showcase platform.</p>
          <p>Click the button below to register and sign in with your Google account:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${inviteLink}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: bold; display: inline-block;">Register with Google</a>
          </div>
          <p style="color: #71717a; font-size: 14px;">If the button above does not work, copy and paste this link into your browser:</p>
          <p style="color: #4f46e5; font-size: 14px; word-break: break-all;">${inviteLink}</p>
          <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p style="color: #a1a1aa; font-size: 12px;">This invitation is valid for 7 days. If you did not expect this email, you can safely ignore it.</p>
        </div>
      `
    });

    console.log(`Email sent successfully to ${email}`);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`Ethereal Email Preview URL: ${previewUrl}`);
      return { messageId: info.messageId, previewUrl };
    }
    return { messageId: info.messageId };
  } catch (error) {
    console.error('Error sending invitation email:', error);
    throw error;
  }
};

module.exports = {
  sendInvitationEmail
};
