const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Patient = require('./Patient');

const MedicalHistory = sequelize.define('MedicalHistory', {
  date: {
    type: DataTypes.STRING,
  },
  disease: {
    type: DataTypes.STRING,
  },
  prescription: {
    type: DataTypes.TEXT,
  },
  doctorName: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

Patient.hasMany(MedicalHistory, { as: 'history', foreignKey: 'patientId' });
MedicalHistory.belongsTo(Patient, { foreignKey: 'patientId' });

module.exports = MedicalHistory;
