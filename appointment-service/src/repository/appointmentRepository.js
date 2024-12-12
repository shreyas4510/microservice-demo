// src/repository/appointmentRepository.js
import { appointments } from '../model/appointmentModel.js';

// Simulate saving to a database
export const createAppointmentRepository = (appointmentData) => {
  appointments.push(appointmentData);
  return appointmentData;
};