// src/config/kafka.js

import { Kafka } from 'kafkajs';  
import dotenv from 'dotenv';      

dotenv.config();                 

// Kafka client setup
const kafka = new Kafka({
  clientId: 'appointment-service',  
  brokers: [process.env.KAFKA_BROKER],  
});

// Initialize Kafka producer
const producer = kafka.producer();

// Function to connect the Kafka producer
export const initKafkaProducer = async () => {

  // Connect to Kafka broker
  await producer.connect();
  console.log('Kafka Producer connected successfully');
};

// Function to send a message to Kafka
export const sendMessageToKafka = async (message) => {
  try {
    // Send message to Kafka topic
    await producer.send({
      topic: process.env.APPOINTMENT_BOOKING_TOPIC,      
      messages: [{ value: JSON.stringify(message) }]
    });

    // Log successful message sending
    console.log('Message sent to Kafka successfully');
  } catch (error) {
    console.error('Error sending message to Kafka:', error);
  }
};
