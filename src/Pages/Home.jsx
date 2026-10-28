import { Link } from "react-router-dom";
import "../Style/Home.css";

/* HOME / LANDING PAGE */

function Home() {
  return (
    <main className="home-container">
      {/* Hero Welcome Card */}
      <section className="home-hero">
        <div className="hero-badge">
          <span className="badge-pulse"></span>
          <span>APPLEN SOLUTIONS • Frontend Developer Task</span>
        </div>

        <h1 className="hero-title">
          User Management <span>Dashboard</span>
        </h1>

        <p className="hero-subtitle">
          A modern React application integrating public REST APIs with real-time search,
          dynamic city filtering, client-side pagination, and dedicated user detail routing.
        </p>

        {/* Primary Action Button */}
        <div className="hero-actions">
          <Link to="/users" className="primary-action-btn">
            <span>Open Users Directory</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Developer & Task Metadata Card */}
        <div className="developer-meta-card">
          <div className="meta-item">
            <span className="meta-label">Assigned Developer</span>
            <span className="meta-value developer-highlight">Neel Darji</span>
          </div>

          <div className="meta-divider"></div>

          <div className="meta-item">
            <span className="meta-label">Technology Stack</span>
            <span className="meta-value">React 19 + Vite + React Router 7</span>
          </div>

          <div className="meta-divider"></div>

          <div className="meta-item">
            <span className="meta-label">Data Source</span>
            <span className="meta-value">JSONPlaceholder Users API</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
