const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize, connectDB } = require('./config/db');

// Import Models for Sync
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const MedicalHistory = require('./models/MedicalHistory');
const Appointment = require('./models/Appointment');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Sync Database and Initialize Data
connectDB().then(async () => {
  await sequelize.sync({ alter: true }); // Ensure schema matches models
  console.log('Database synced');

  // Ensure doctors exist
  const count = await Doctor.count();
  if (count === 0) {
    await Doctor.bulkCreate([
      { username: "doctor1", password: "1234", name: "Dr. Ravi" },
      { username: "doctor2", password: "1234", name: "Dr. Victor" },
      { username: "doctor3", password: "1234", name: "Dr. James" }
    ]);
    console.log('Doctors initialized');
  }
}).catch(err => console.error('Database sync error:', err));

// Routes
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
