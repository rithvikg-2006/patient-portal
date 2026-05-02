import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    username: "",
    password: "",
    role: "patient",
    history: []
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.username || !form.password) {
      alert("Fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered Successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Patient Registration</h2>
                <p className="text-muted">Join our portal to manage your health records</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label className="form-label text-secondary small fw-bold">Full Name</label>
                    <input name="name" placeholder="John Doe" className="form-control rounded-3" onChange={handleChange} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label text-secondary small fw-bold">Age</label>
                    <input name="age" type="number" placeholder="25" className="form-control rounded-3" onChange={handleChange} required />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">Gender</label>
                  <select name="gender" className="form-select rounded-3" onChange={handleChange} required value={form.gender}>
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">Username</label>
                  <input name="username" placeholder="Choose a username" className="form-control rounded-3" onChange={handleChange} required />
                </div>

                <div className="mb-4">
                  <label className="form-label text-secondary small fw-bold">Password</label>
                  <input name="password" type="password" placeholder="Create a password" className="form-control rounded-3" onChange={handleChange} required />
                </div>

                <button className="btn btn-primary w-100 rounded-3 shadow-sm py-2 fw-bold mt-2">
                  Create Account
                </button>
              </form>

              <div className="text-center mt-4 pt-2">
                <span className="text-muted">Already have an account?</span>{' '}
                <button 
                  onClick={() => navigate("/login")} 
                  className="btn btn-link text-primary fw-bold text-decoration-none p-0 ms-1"
                >
                  Login here
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <button onClick={() => navigate("/")} className="btn btn-link text-muted small text-decoration-none">← Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;