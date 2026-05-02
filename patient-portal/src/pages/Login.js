import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [login, setLogin] = useState({
    username: "",
    password: "",
    role: location.state?.role || "patient"
  });

  useEffect(() => {
    if (location.state?.role) {
      setLogin((prev) => ({ ...prev, role: location.state.role }));
    }
  }, [location.state]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", login);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      if (response.data.role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Welcome Back</h2>
                <p className="text-muted">{login.role === 'doctor' ? 'Doctor Login Portal' : 'Patient Login Portal'}</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">Username</label>
                  <input
                    placeholder="Enter your username"
                    className="form-control rounded-3"
                    onChange={(e) => setLogin({ ...login, username: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-secondary small fw-bold">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="form-control rounded-3"
                    onChange={(e) => setLogin({ ...login, password: e.target.value })}
                    required
                  />
                </div>

                {!location.state?.role && (
                  <div className="mb-4">
                    <label className="form-label text-secondary small fw-bold">Login As</label>
                    <select className="form-select rounded-3"
                      value={login.role}
                      onChange={(e) => setLogin({ ...login, role: e.target.value })}
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100 rounded-3 shadow-sm py-2 fw-bold">
                  Login
                </button>
              </form>

              {login.role !== 'doctor' && (
                <div className="text-center mt-4 pt-2">
                  <span className="text-muted">Don't have an account?</span>{' '}
                  <Link to="/register" className="text-primary fw-bold text-decoration-none ms-1">
                    Register here
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="/" className="text-muted small text-decoration-none">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;