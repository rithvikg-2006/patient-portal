import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 shadow-sm mb-4" style={{ background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(200, 210, 224, 0.4)" }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary" style={{ letterSpacing: "1px" }} to="/">
          🏥 PatientPortal
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark" to="/">Home</Link>
            </li>
            
            {!currentUser ? (
              <>
                <li className="nav-item ms-lg-3">
                  <Link className="btn btn-outline-primary btn-sm px-4 rounded-pill fw-bold" to="/login" state={{ role: "patient" }}>Login</Link>
                </li>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <Link className="btn btn-primary btn-sm px-4 rounded-pill fw-bold" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ms-lg-3">
                  <Link className="nav-link fw-semibold text-primary" to={currentUser.role === "doctor" ? "/doctor" : "/dashboard"}>
                    👋 Welcome, {currentUser.name || currentUser.username}
                  </Link>
                </li>
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <button className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;