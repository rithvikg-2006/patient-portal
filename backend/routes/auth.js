const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Optional: Init hardcoded doctors if none exist
router.get('/init', async (req, res) => {
  try {
    const doctorsCount = await Doctor.count();
    if (doctorsCount === 0) {
      await Doctor.bulkCreate([
        { username: "doctor1", password: "1234", name: "Dr. Ravi" },
        { username: "doctor2", password: "1234", name: "Dr. Victor" },
        { username: "doctor3", password: "1234", name: "Dr. James" }
      ]);
      return res.json({ message: "Doctors initialized" });
    }
    return res.json({ message: "Doctors already exist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Patient Registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, name, age, gender } = req.body;
    let existingPatient = await Patient.findOne({ where: { username } });
    if (existingPatient) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const newPatient = await Patient.create({ username, password, name, age, gender });
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    if (role === 'doctor') {
      const doctor = await Doctor.findOne({ where: { username, password } });
      if (doctor) {
        return res.json({ role: 'doctor', username: doctor.username, name: doctor.name });
      }
      return res.status(401).json({ message: "Invalid Doctor Login" });
    }

    // Role is patient
    const patient = await Patient.findOne({ 
      where: { username, password },
      include: ['history', 'appointments']
    });
    if (patient) {
      return res.json(patient);
    }
    return res.status(401).json({ message: "Invalid Patient Login" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
