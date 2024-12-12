// src/service/jobService.js

import moment from 'moment';  
import { addJobToQueue, processJob } from '../config/queue.js';  

// Function to handle scheduling pre and post notifications and appointment booking notifications
export const scheduleNotification = async (appointment) => {
  try {
    const { appointmentDate, slot, email, name } = appointment;
    const appointmentDateTime = moment(`${appointmentDate} ${slot}`, 'DD-MM-YYYY hh:mm A');

    // Calculate pre and post notification times (30 minutes before and after)
    const preNotificationTime = appointmentDateTime.clone().subtract(30, 'minutes').valueOf();
    const postNotificationTime = appointmentDateTime.clone().add(30, 'minutes').valueOf();

    // Add Pre-appointment job to the queue with delay (30 minutes before)
    await addJobToQueue({
      jobType: 'pre-appointment',
      email,
      name,
      message: 'Pre-appointment reminder'
    }, preNotificationTime - moment().valueOf());
  
    // Add Post-appointment job to the queue with delay (30 minutes after)
    await addJobToQueue({
      jobType: 'post-appointment',
      email,
      name,
      message: 'Post-appointment reminder'
    }, postNotificationTime - moment().valueOf());
  
    // Send immediate 'Appointment booked' notification to Kafka (no delay)
    await processJob({
      data: {
        email,
        name,
        message: 'Appointment booked successfully'
      }
    }); 
  } catch (error) {
    // Log error if something goes wrong during the scheduling process
    console.error(`Schedule notification error: ${error}`);
  }
};
