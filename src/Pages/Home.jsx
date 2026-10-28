import { Link } from "react-router-dom";
import "../Style/Home.css";

/**
 * ============================================================================
 * HOME / LANDING PAGE
 * ============================================================================
 * Purpose:
 *   Welcome overview for APPLEN SOLUTIONS User Management Dashboard.
 *   Provides clear project context, developer info, architecture breakdown,
 *   and a direct call-to-action to open the interactive Users Directory.
 * ============================================================================
 */
function Home() {
  const highlights = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      ),
      title: "REST API Integration",
      description: "Direct asynchronous fetch from JSONPlaceholder public users endpoint with complete error and loading handling."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      ),
      title: "Real-time Search",
      description: "Case-insensitive instant filtering by user name or email with automated pagination reset to page 1."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      ),
      title: "Dynamic City Filter",
      description: "Dropdown dynamically populated from retrieved city records, combinable with search queries."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      ),
      title: "Client-side Pagination",
      description: "Calculates total pages for 5 records per page with Previous/Next controls and page indicators."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: "Dedicated User Profiles",
      description: "React Router dynamic route (/users/:id) rendering complete personal, address, and company details."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Clean Modular Architecture",
      description: "Reusable components, decoupled API services, and dedicated individual stylesheets in Style/ folder."
    }
  ];

  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-badge">
          <span className="badge-pulse"></span>
          <span>APPLEN SOLUTIONS • Frontend Developer Task</span>
        </div>

        <h1 className="hero-title">
          User Management <span>Dashboard</span>
        </h1>

        <p className="hero-subtitle">
          A high-performance React application integrating public REST APIs with real-time search, 
          city filtering, client-side pagination, and dedicated user detail routing.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <Link to="/users" className="primary-action-btn">
            <span>Open Users Directory</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          <a href="#architecture" className="secondary-action-btn">
            <span>View Data Flow</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
        </div>

        {/* Developer Metadata Card */}
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

      {/* Feature Highlights Grid */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-tag">Key Capabilities</span>
          <h2>Implemented Requirements & Features</h2>
          <p>Designed with clean code standards, separation of concerns, and full responsive design.</p>
        </div>

        <div className="features-grid">
          {highlights.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture & Data Flow Guide */}
      <section id="architecture" className="architecture-section">
        <div className="section-header">
          <span className="section-tag">System Design</span>
          <h2>How Logic & Data Flow Works</h2>
          <p>A step-by-step trace of state and data from initial network call to UI render.</p>
        </div>

        <div className="data-flow-steps">
          <div className="flow-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>API Service Layer (`userService.js`)</h4>
              <p>
                Separates network requests from React components. Invokes <code>fetch()</code> against JSONPlaceholder, parses JSON, and handles HTTP error responses.
              </p>
            </div>
          </div>

          <div className="flow-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>State Management in `Dashboard.jsx`</h4>
              <p>
                Holds <code>users</code>, <code>search</code>, <code>selectedCity</code>, <code>currentPage</code>, <code>loading</code>, and <code>error</code> states with standard React hooks.
              </p>
            </div>
          </div>

          <div className="flow-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Compound Filtering Logic</h4>
              <p>
                Filters downloaded records in memory: matches name or email (case-insensitive) AND matches selected city. Dynamically extracts unique cities list.
              </p>
            </div>
          </div>

          <div className="flow-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Pagination Computation</h4>
              <p>
                Calculates total pages as <code>Math.ceil(filteredUsers.length / 5)</code>. Slices the current 5 records to pass into <code>UserTable</code>. Resets to page 1 on filter changes.
              </p>
            </div>
          </div>

          <div className="flow-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>Dynamic Routing (`UserDetails.jsx`)</h4>
              <p>
                Clicking &quot;View Details&quot; triggers React Router to <code>/users/:id</code>, extracting the ID with <code>useParams()</code> to load deep profile data.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="cta-banner">
          <div>
            <h3>Ready to test the interactive dashboard?</h3>
            <p>Access the directory to test real-time search, city filters, and pagination.</p>
          </div>
          <Link to="/users" className="cta-banner-btn">
            Go to Users Directory →
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
