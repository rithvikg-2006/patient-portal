import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user || user.role === "doctor") {
      alert("Access Denied");
      window.location.href = "/login";
      return;
    }

    axios.get(`http://localhost:5000/api/patients/${user.username}`)
      .then(res => setPatient(res.data))
      .catch(err => {
        console.error(err);
        setPatient(user); // fallback maybe or just error
      });
  }, []);

  if (!patient) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Patient Dashboard</h2>

      <div className="card p-3">
        <h4>{patient.name}</h4>
        <p><strong>Age:</strong> {patient.age || "Not specified"}</p>
        <p><strong>Gender:</strong> {patient.gender || "Not specified"}</p>

        <h5>Medical History</h5>

        {patient.history && patient.history.length > 0 ? (
          patient.history.map((h, i) => (
            <div key={i} className="border p-2 mb-2">
              <p><strong>Date:</strong> {h.date}</p>
              <p><strong>Doctor:</strong> {h.doctorName || "N/A"}</p>
              <p><strong>Disease:</strong> {h.disease}</p>
              <p><strong>Prescription:</strong> {h.prescription}</p>
            </div>
          ))
        ) : (
          <p>No history available</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;