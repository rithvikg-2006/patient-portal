function MedicalHistory() {
  const history = [
    { date: "2024-01-01", diagnosis: "Cold" },
    { date: "2024-02-10", diagnosis: "Fever" }
  ];

  return (
    <div className="mt-4">
      <h3>Medical History</h3>

      {history.map((h, i) => (
        <div key={i} className="card p-2 mb-2">
          <p>{h.date}</p>
          <p>{h.diagnosis}</p>
        </div>
      ))}
    </div>
  );
}

export default MedicalHistory;