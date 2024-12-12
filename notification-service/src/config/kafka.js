// src/config/kafka.js

import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
import { sendNotification } from '../service/notification-service.js';

// Load environment variables from .env file
dotenv.config();  

// Create Kafka client instance
const kafka = new Kafka({
  // Set client ID for the Kafka consumer and producer
  clientId: 'notification-service',  

  // Kafka broker address from environment variables
  brokers: [process.env.KAFKA_BROKER],  
});

// Initialize Kafka consumer with a group ID (for consumer group management)
const consumer = kafka.consumer({ groupId: 'notification-group' });

// Initialize Kafka producer
const producer = kafka.producer();

// Function to initialize the Kafka consumer and producer
export const initKafka = async () => {
  // Connect the consumer and producer to Kafka
  await consumer.connect();
  await producer.connect();

  // Log successful consumer connection
  console.log('Kafka Consumer connected');

  // Subscribe to the specified topic from the beginning
  await consumer.subscribe({
    topics: [process.env.NOTIFICATION_TOPIC],
    fromBeginning: true
  });

  // Listen for incoming messages
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Check if the message is from the desired notification topic
      if (topic === process.env.NOTIFICATION_TOPIC) {
        
        // Parse the incoming message (notification job)
        const job = JSON.parse(message.value.toString());
        
        // Send the notification for the job
        await sendNotification(job);
      }
    },
  });
};
