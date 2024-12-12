// src/service/appointmentService.js

import { createAppointmentRepository } from '../repository/appointmentRepository.js';
import { sendMessageToKafka } from '../config/kafka.js';

export const bookAppointmentService = async (appointmentData) => {

  // Create appointment in the repository (database)
  const appointment = await createAppointmentRepository(appointmentData);

  // Send appointment details to Kafka topic
  await sendMessageToKafka(appointment);

  return appointment;
};
