# Appointment Booking System

This repository contains a distributed system for booking appointments, which consists of the following microservices:

- **appointment-service**: Manages appointment creation and scheduling.
- **job-scheduler-service**: Schedules and manages background tasks for appointment handling.
- **notification-service**: Handles notification logic for appointment.

## Prerequisites

Before you run the services, ensure the following services are up and running:

1. **Kafka**: Used for service communication.
2. **Redis**: Used for queuing.

## Setup Instructions

Follow these steps to set up and run the services locally:

### 1. Clone the repository

Clone this repository to your local machine:

```bash
git clone https://github.com/shreyas4510/microservice-demo.git
cd microservice-demo
```
### 2. Install Dependencies
Each service has its own set of dependencies. Navigate to each service's directory and install the required packages:

```
cd appointment-service
npm install

cd ../job-scheduler-service
npm install

cd ../notification-service
npm install
```

### 3. Environment Configuration
- Copy the .env.example file to .env for each service.
- Update the .env file with your local configurations

### 4. Run the Services
Each service can be started using nodemon:
```
cd appointment-service
nodemon server.js

cd ../job-scheduler-service
nodemon server.js

cd ../notification-service
nodemon server.js
```
**Note: Make sure to start each service in separate terminal windows or tabs.**

### API Testing
 Test the appointment booking functionality, you can use **curl** to send a POST request to the **appointment-service** API.
 
 #### Sample API Call (Book Appointment)
 ```
curl --location 'localhost:8081/book-appointment' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "John Doe",
  "age": 34,
  "contact": "+9876543210",
  "email": "johndoe123@example.com",
  "hospital": "Green Valley Hospital",
  "doctor": "Dr. Emily Johnson",
  "appointmentDate": "20-12-2024",
  "slot": "2:00 PM"
}'
```
#### Expected Response:
```
{
  "message": "Appointment booked successfully",
  "appointmentDetails": {
    "name": "John Doe",
    "age": 34,
    "contact": "+9876543210",
    "email": "johndoe123@example.com",
    "hospital": "Green Valley Hospital",
    "doctor": "Dr. Emily Johnson",
    "appointmentDate": "20-12-2024",
    "slot": "2:00 PM"
  }
}
```
