import nodemailer from "nodemailer";

// IMPORTANT: the transporter is created lazily (inside a function), not at
// module load time. Because ES module imports are hoisted and run before
// dotenv.config() executes, creating the transporter at the top level would
// read process.env values before they're loaded — causing nodemailer to
// silently fall back to 127.0.0.1 and throw ECONNREFUSED.
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false for others
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

/**
 * Sends an email.
 * @param {Object} options
 * @param {string} options.to - recipient email address
 * @param {string} options.subject - email subject
 * @param {string} options.html - email HTML body
 */
export const sendEmail = async ({ to, subject, html }) => {
  await getTransporter().sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  });
};

/**
 * Sends the "registration successful" welcome email to a newly signed up student.
 * @param {Object} student - the created student document
 */
export const sendRegistrationEmail = async (student) => {
  await sendEmail({
    to: student.email,
    subject: "Registration Successful",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Welcome, ${student.firstName}!</h2>
        <p>Your registration was successful. Here are your account details:</p>
        <ul>
          <li><strong>Username:</strong> ${student.username}</li>
          <li><strong>Email:</strong> ${student.email}</li>
        </ul>
        <p>You can now sign in using your username and password.</p>
        <p>Best regards,<br/>The School Team</p>
      </div>
    `,
  });
};