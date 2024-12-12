// server.js

import express from 'express';
import dotenv from 'dotenv';
import { initKafka } from './src/config/kafka.js';

// Load environment variables from .env file
dotenv.config();

// Create the Express app
const app = express();

// Initialize Kafka consumer and producer
initKafka();

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Log that the server is running
  console.log(`Server running on port ${PORT}`);
});
