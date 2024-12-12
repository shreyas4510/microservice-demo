// src/config/queue.js

import { Queue, Worker } from 'bullmq';  
import dotenv from "dotenv";  
import { sendMessageToKafka } from './kafka.js';  

// Load environment variables from .env file
dotenv.config();  

// Ensure the queue is only initialized once during server startup
let notificationQueue;

// Function to add a job to the queue with a specified delay
export const addJobToQueue = async (data, delay) => {
  try {
    // Add the job to the queue with the given delay
    await notificationQueue.add(data.jobType, data, { delay });
    console.log(`${data.jobType} job added to queue with delay: ${delay}ms`); 
  } catch (error) {
    // Log error if adding job fails
    console.error(`Error adding job to queue: ${error}`);
  }
};

// Initialize the queue once during server startup
export const initQueue = () => {
  if (!notificationQueue) {
    // Create a new queue instance using the queue name
    notificationQueue = new Queue(process.env.QUEUE_NAME);
    console.log('Notification Queue initialized');
  }
};

// Worker to process jobs from the queue
const worker = new Worker(
  process.env.QUEUE_NAME,  // Queue name from environment variables
  async (job) => {
    // Process jobs of type 'pre-appointment' or 'post-appointment'
    if (['pre-appointment', 'post-appointment'].includes(job.name)) {
      await processJob(job);
    }
  },
  {
    // Redis connection details from environment variables
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
  }
);

// Generic function to process jobs and send messages to Kafka
export const processJob = async (job) => {
  try {
    const { email, name, message } = job.data;

    // Send job data to Kafka for notification handling
    await sendMessageToKafka(process.env.NOTIFICATION_TOPIC, {
      email,
      name,
      message,
    });
    console.log(`${message} sent to Kafka for ${name}`); 
  } catch (error) {
    // Log error if job processing fails
    console.error(`Error processing job: ${error}`);
  }
};

// Event listener for job completion
worker.on('completed', ({ jobId }) => {
  console.log(`${jobId} completed`);
});

// Event listener for job failure
worker.on(
  'failed',
  ({ jobId, failedReason }) => {
    console.error(`Failed to process job ${jobId} | ${failedReason}`);
  },
);
