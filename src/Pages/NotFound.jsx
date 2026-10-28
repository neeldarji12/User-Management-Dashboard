import { Link } from "react-router-dom";
import "../Style/NotFound.css";

/**
 * ============================================================================
 * 404 NOT FOUND PAGE
 * ============================================================================
 * Handles invalid routes gracefully with clear navigation back to active pages.
 * ============================================================================
 */
function NotFound() {
  return (
    <main className="not-found-container">
      <div className="not-found-card">
        <span className="not-found-badge">404 ERROR</span>
        <h1>Page Not Found</h1>
        <p>
          The page or route you are looking for does not exist or may have been moved.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn-secondary">
            Return Home
          </Link>
          <Link to="/users" className="btn-primary">
            Go to Users Directory →
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
