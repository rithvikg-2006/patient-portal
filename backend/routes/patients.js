const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const MedicalHistory = require('../models/MedicalHistory');

// Get all patients (for doctors)
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.findAll({
      include: ['history', 'appointments']
    });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single patient
router.get('/:username', async (req, res) => {
  try {
    const patient = await Patient.findOne({ 
      where: { username: req.params.username },
      include: ['history', 'appointments']
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add history record
router.post('/:username/history', async (req, res) => {
  try {
    const { date, disease, prescription, doctorName } = req.body;

    if (!disease || !prescription) {
      return res.status(400).json({ message: "Disease and prescription are required" });
    }

    const patient = await Patient.findOne({ where: { username: req.params.username } });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    
    const newHistory = await MedicalHistory.create({
      date,
      disease,
      prescription,
      doctorName,
      patientId: patient.id
    });
    
    // Return updated patient with history
    const updatedPatient = await Patient.findOne({
      where: { id: patient.id },
      include: ['history', 'appointments']
    });
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update history record
router.put('/history/:id', async (req, res) => {
  try {
    const { date, disease, prescription } = req.body;
    const history = await MedicalHistory.findByPk(req.params.id);
    
    if (!history) return res.status(404).json({ message: "Record not found" });
    
    await history.update({ date, disease, prescription });
    
    // Return the updated patient
    const updatedPatient = await Patient.findOne({
      where: { id: history.patientId },
      include: ['history', 'appointments']
    });
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete history record
router.delete('/history/:id', async (req, res) => {
  try {
    const history = await MedicalHistory.findByPk(req.params.id);
    if (!history) return res.status(404).json({ message: "Record not found" });
    
    const patientId = history.patientId;
    await history.destroy();
    
    // Return the updated patient
    const updatedPatient = await Patient.findOne({
      where: { id: patientId },
      include: ['history', 'appointments']
    });
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
