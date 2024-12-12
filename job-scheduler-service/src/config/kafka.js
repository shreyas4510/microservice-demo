// src/config/kafka.js

import { Kafka } from 'kafkajs';
import { scheduleNotification } from '../service/jobService.js';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Kafka client setup
const kafka = new Kafka({
  // Unique client ID for the service
  clientId: 'job-scheduler-service',

  // Kafka broker URL from environment variables
  brokers: [process.env.KAFKA_BROKER],
});

// Initialize Kafka consumer with group ID (for consumer group management)
const consumer = kafka.consumer({ groupId: 'job-scheduler-group' });

// Initialize Kafka producer
const producer = kafka.producer();

// Initialize Kafka consumer and producer
export const initKafka = async () => {

  // Connect the consumer and producer to the Kafka broker
  await consumer.connect();
  await producer.connect();

  // Log successful connection to Kafka
  console.log('Kafka Consumer and Producer connected');

  // Subscribe to the appointment topic
  await consumer.subscribe({
    topics: [process.env.APPOINTMENT_BOOKING_TOPIC],
    fromBeginning: true
  });

  // Listen to incoming messages
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Check if the message is from the appointment booking topic
      if (topic === process.env.APPOINTMENT_BOOKING_TOPIC) {

        // Parse the incoming message (appointment details)
        const appointment = JSON.parse(message.value.toString());

        // Call the job service to schedule a notification
        await scheduleNotification(appointment);
      }
    },
  });
};

// Send message to Kafka producer
export const sendMessageToKafka = async (topic, message) => {

  // Send the message to the specified Kafka topic
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }]
  });
};
