import { useState, useEffect } from "react";
import axios from "axios";

function DoctorPanel() {
  const [searchUsername, setSearchUsername] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);

  const [record, setRecord] = useState({
    disease: "",
    prescription: "",
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "doctor") {
      alert("Access Denied");
      window.location.href = "/login";
    }
  }, []);

  const handleSearchPatient = async () => {
    if (!searchUsername) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/patients/${searchUsername}`);
      setSelectedPatient(res.data);
      setEditingRecord(null);
    } catch (err) {
      alert("Patient not found");
      setSelectedPatient(null);
    }
  };

  const handleAddRecord = async () => {
    if (!selectedPatient) {
      alert("Please search and select a patient first");
      return;
    }

    if (!record.disease.trim() || !record.prescription.trim()) {
      alert("Please fill in both Disease and Prescription fields.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const doctorName = user?.name || "Unknown Doctor";

    try {
      const res = await axios.post(`http://localhost:5000/api/patients/${selectedPatient.username}/history`, {
        ...record,
        doctorName
      });
      alert("Record Added!");
      setRecord({ disease: "", prescription: "", date: new Date().toISOString().split('T')[0] });
      setSelectedPatient(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error adding record");
      console.error(err);
    }
  };

  const handleDeleteRecord = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await axios.delete(`http://localhost:5000/api/patients/history/${id}`);
      alert("Record Deleted!");
      setSelectedPatient(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting record");
      console.error(err);
    }
  };

  const handleEditRecord = (h) => {
    setEditingRecord(h);
    setRecord({ disease: h.disease, prescription: h.prescription, date: h.date });
  };

  const handleUpdateRecord = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/patients/history/${editingRecord.id}`, record);
      alert("Record Updated!");
      setEditingRecord(null);
      setRecord({ disease: "", prescription: "", date: new Date().toISOString().split('T')[0] });
      setSelectedPatient(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error updating record");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Doctor Panel</h2>

      {/* Patient Search Section */}
      <div className="card shadow-sm p-4 mb-4 border-0 bg-light">
        <h5 className="mb-3">Search Patient</h5>
        <div className="d-flex gap-2">
          <input 
            type="text" 
            placeholder="Enter Patient Username" 
            className="form-control form-control-lg"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
          <button className="btn btn-primary px-4" onClick={handleSearchPatient}>Search</button>
        </div>
      </div>

      {selectedPatient && (
        <div className="card shadow-sm p-4 mb-4 border-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-dark m-0">Patient Records: {selectedPatient.name}</h4>
            <span className="badge bg-info text-dark">
              {selectedPatient.age || "N/A"} years | {selectedPatient.gender || "N/A"}
            </span>
          </div>

          <h5 className="mt-4 mb-3 text-secondary">Medical History</h5>
          {selectedPatient.history && selectedPatient.history.length > 0 ? (
            <div className="row">
              {selectedPatient.history.map((h) => (
                <div key={h.id} className="col-12 mb-3">
                  <div className="card h-100 border-start border-primary border-4 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <small className="text-muted d-block">{h.date}</small>
                          <h6 className="card-title text-primary mb-1">{h.disease}</h6>
                        </div>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-warning" onClick={() => handleEditRecord(h)}>Edit</button>
                          <button className="btn btn-outline-danger" onClick={() => handleDeleteRecord(h.id)}>Delete</button>
                        </div>
                      </div>
                      <p className="card-text text-dark mb-1"><strong>Prescription:</strong> {h.prescription}</p>
                      <small className="text-muted italic">By: {h.doctorName || "Unknown"}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-warning py-2">No medical history found for this patient.</div>
          )}
        </div>
      )}

      {/* Add / Edit Record Section */}
      {selectedPatient && (
        <div className="card shadow-sm p-4 border-0 mb-5">
          <h5 className="mb-3 text-primary">{editingRecord ? "Edit Medical Record" : "Add New Medical Record"}</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small text-muted">Disease / Diagnosis</label>
              <input 
                placeholder="Enter disease name" 
                className="form-control"
                value={record.disease}
                onChange={(e) => setRecord({ ...record, disease: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">Consultation Date</label>
              <input 
                type="date" 
                className="form-control"
                value={record.date}
                onChange={(e) => setRecord({ ...record, date: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label className="form-label small text-muted">Prescription / Treatment Plan</label>
              <textarea 
                placeholder="Enter medication and instructions" 
                className="form-control" 
                rows="3"
                value={record.prescription}
                onChange={(e) => setRecord({ ...record, prescription: e.target.value })}
              ></textarea>
            </div>
            <div className="col-12 d-flex gap-2">
              {editingRecord ? (
                <>
                  <button className="btn btn-success px-4" onClick={handleUpdateRecord}>Update Record</button>
                  <button className="btn btn-secondary px-4" onClick={() => {
                    setEditingRecord(null);
                    setRecord({ disease: "", prescription: "", date: new Date().toISOString().split('T')[0] });
                  }}>Cancel</button>
                </>
              ) : (
                <button className="btn btn-primary px-5" onClick={handleAddRecord}>Add Record</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorPanel;