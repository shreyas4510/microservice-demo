// server.js

import express from 'express';
import dotenv from 'dotenv';
import { initKafkaProducer } from './src/config/kafka.js';
import { bookAppointment } from './src/controllers/appointmentController.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Initialize Kafka producer (for messaging, if applicable)
initKafkaProducer();

// Route to handle booking appointments
app.post('/book-appointment', bookAppointment);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => { 
  // Start server and log the port it’s running on
  console.log(`Server is running on port ${PORT}`);
});
