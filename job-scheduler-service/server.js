// server.js

import express from 'express';
import dotenv from 'dotenv';
import { initKafka } from './src/config/kafka.js';
import { initQueue } from './src/config/queue.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Initialize Kafka Consumer
initKafka();

// Initialize the queue to manage scheduling
initQueue();

// Start the server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Job Scheduler Service running on port ${PORT}`);
});
