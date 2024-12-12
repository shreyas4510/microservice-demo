// src/controllers/appointmentController.js

import { bookAppointmentService } from '../service/appointmentService.js';

export const bookAppointment = async (req, res) => {
  
  // Destructure data from request body
  const { name, age, contact, email, hospital, doctor, appointmentDate, slot } = req.body;

  // Check if all required fields are provided
  if (
    !name || !age || !contact || !email || !hospital || !doctor || !appointmentDate || !slot) {
    return res.status(400).json({ error: 'All fields are required' }); // Return error if any field is missing
  }

  try {
    // Call the service function to book the appointment
    const appointment = await bookAppointmentService({
      name,
      age,
      contact,
      email,
      hospital,
      doctor,
      appointmentDate,
      slot,
    });

    // Return success response with appointment details
    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (error) {
    // Handle errors and return a failure response
    res.status(500).json({ error: 'Failed to book appointment' });
  }
};
