const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Patient = require('./Patient');

const Appointment = sequelize.define('Appointment', {
  date: {
    type: DataTypes.STRING,
  },
  doctor: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

Patient.hasMany(Appointment, { as: 'appointments', foreignKey: 'patientId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

module.exports = Appointment;
