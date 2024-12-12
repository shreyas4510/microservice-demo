// src/service/email-service.js

import nodemailer from 'nodemailer';  

// Function to send an email with the provided content
export const sendEmail = async (emailContent) => {
  try {
    // Create a transporter using SMTP configuration from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,   // SMTP host
      port: process.env.EMAIL_PORT,   // SMTP port
      auth: {
        user: process.env.EMAIL_USER,  // Email user
        pass: process.env.EMAIL_PASS,  // Email password
      },
    });

    // Send the email using the specified content
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,  // Sender's email address
      to: emailContent.to,           // Recipient's email address
      subject: emailContent.subject, // Subject of the email
      text: emailContent.text,       // Plain text version of the email
      html: emailContent.html,       // HTML version of the email
    });

    // Log the response from the email service (confirmation)
    console.log('Email sent: ' + info.response);
  } catch (error) {
    // Log any errors that occur while sending the email
    console.error('Error sending email: ', error);
  }
};
