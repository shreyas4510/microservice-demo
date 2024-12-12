// src/service/notification-service.js

import { sendEmail } from "./email-service.js";  

// Function to send a notification email
export const sendNotification = async (data) => {
  try {
    // Destructure the data object to extract email, name, and message
    const { email, name, message } = data;

    // Validate if required fields are present
    if (!email || !name || !message) {
      console.error('Invalid message received', data);
      return;
    }

    // Prepare the email content
    const emailContent = {
      to: email,
      subject: 'Notification from Notification Service',
      text: `Hello ${name},\n\n${message}\n\nBest regards,\nNotification Service`,
      html: `<p>Hello <strong>${name}</strong>,</p><p>${message}</p><p>Best regards,<br>Notification Service</p>`,
    };

    // Send the formatted email using the sendEmail function
    await sendEmail(emailContent);  
  } catch (error) {
    // Log any errors that occur during the notification sending process
    console.error(`Error in sending notification: ${error}`);
  }
};
