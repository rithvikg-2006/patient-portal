    import { Link } from "react-router-dom";
    import "./Home.css";

    function Home() {
    return (
        <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
            <h1 className="hero-title">Welcome to Patient Portal</h1>
            <p className="hero-subtitle">
            The central access point for tracking health records, appointments, and seamless communication between patients and doctors.
            </p>

            {/* Navigation Cards */}
            <div className="nav-cards">
            <Link to="/login" state={{ role: "patient" }} className="nav-card patient-card">
                <div className="nav-icon">👤</div>
                <h3 className="nav-title">Patient Login</h3>
                <p className="nav-desc">Access your medical records and appointments.</p>
            </Link>

            <Link to="/login" state={{ role: "doctor" }} className="nav-card doctor-card">
                <div className="nav-icon">🩺</div>
                <h3 className="nav-title">Doctor Login</h3>
                <p className="nav-desc">Manage patients and view their health history.</p>
            </Link>

            <Link to="/register" className="nav-card register-card">
                <div className="nav-icon">📝</div>
                <h3 className="nav-title">Register</h3>
                <p className="nav-desc">New here? Create a patient account today.</p>
            </Link>
            </div>
        </section>

        {/* Key Features Highlight */}
        {/*
        <section className="features-section">
            <h2 className="section-title">Key Features of the System</h2>
            <div className="features-grid">
            <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <h3>Secure Health Records</h3>
                <p>
                Your privacy is our priority. We offer robust data protection ensuring sensitive medical 
                information remains secure and confidential at all times.
                </p>
            </div>
            <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h3>Quick Registration</h3>
                <p>
                Join the portal in minutes. A streamlined registration flow means you get instant 
                access to a doctor directory and personal dashboard.
                </p>
            </div>
            <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h3>Centralized Dashboard</h3>
                <p>
                Role-based dashboards specifically tailored for doctors and patients providing 
                a neat overview of history, appointments, and upcoming follow-ups.
                </p>
            </div>
            </div>
        </section>
        */}
        </div>
    );
    }

    export default Home;