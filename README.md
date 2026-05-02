# Patient Portal Application

A full-stack web application designed to seamlessly manage patient information, medical histories, and appointments. It provides dedicated interfaces for both patients and doctors.

## 🌟 Features

* **Role-Based Access:** Unified login system for both "Patients" and "Doctors".
* **Patient Dashboard:** Patients can view their personal details, track their medical history, and view booked appointments.
* **Doctor Panel:** Doctors can view a list of all registered patients, inspect their medical histories, and add, update, or delete medical records.
* **RESTful API:** Robust Node.js/Express backend providing endpoints for authentication, patient data retrieval, and medical history management.

## 🛠️ Technology Stack

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL
* **ORM:** Sequelize
* **Middleware:** CORS, dotenv

### Frontend
* **Framework:** React.js
* **Routing:** React Router v7
* **HTTP Client:** Axios
* **Styling:** Bootstrap & CSS Modules

## 📁 Project Structure

```text
fsd_pro/
├── backend/                  # Node.js Express server
│   ├── config/               # Database configuration
│   ├── models/               # Sequelize data models
│   ├── routes/               # API endpoint routes
│   └── index.js              # Server entry point
│
└── patient-portal/           # React frontend
    ├── public/               # Static assets
    └── src/                  # React source code
        ├── components/       # Reusable UI components
        ├── pages/            # Page components (Home, Login, Register)
        ├── App.js            # Main application component
        └── index.js          # React DOM rendering entry
```

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites
* Node.js installed
* MySQL Server installed and running

### 1. Database Setup
Ensure you have a MySQL database created for this project and update your backend environment variables accordingly. 
* Navigate to `backend/.env` and ensure your database credentials (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST) are set correctly.

### 2. Backend Installation
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```
*(Note: The server runs on port 5000 by default. It will automatically sync the database schema and initialize default doctor accounts on the first run.)*

### 3. Frontend Installation
Open a **new** terminal window:
```bash
# Navigate to the frontend directory
cd patient-portal

# Install dependencies
npm install

# Start the React application
npm start
```
*(The React app will typically run on http://localhost:3000)*

## 🗄️ Database Schema overview
The MySQL database is managed via Sequelize and includes the following core entities:
- **Doctors:** Stores doctor login credentials and details.
- **Patients:** Stores patient login credentials, age, and gender.
- **MedicalHistories:** Stores specific consultation records linked to a patient.
- **Appointments:** Stores appointment schedules linked to a patient.

## 📝 License
This project is open-source and available under the ISC License.
