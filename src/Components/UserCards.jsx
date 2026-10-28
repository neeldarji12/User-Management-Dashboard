import { Link } from "react-router-dom";
import "../Style/UserCards.css";

/**
 * ============================================================================
 * USER CARDS GRID COMPONENT
 * ============================================================================
 * Developer: Neel Darji | Applen Solutions
 * 
 * Features:
 *   - Responsive card grid layout for the users directory
 *   - Shows Name, Avatar, Username, Company, City, Email, and Phone on each card
 *   - Interactive contact links (mailto: and tel:)
 *   - Direct "View Details →" action button linking to /users/:id
 * ============================================================================
 */
function UserCards({ users }) {
  // Helper to extract 2-letter initials
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="user-cards-grid" role="list" aria-label="User Cards Directory">
      {users.map((user) => (
        <article key={user.id} className="user-list-card" role="listitem">
          {/* Card Top Banner / Badge */}
          <div className="card-top-bar">
            <span className="card-user-id">ID #{user.id}</span>
            <span className="card-city-pill">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{user.address?.city || "Unknown"}</span>
            </span>
          </div>

          {/* User Header (Avatar + Name + Username) */}
          <div className="card-profile-header">
            <div className="card-avatar" aria-hidden="true">
              {getInitials(user.name)}
            </div>

            <div className="card-profile-meta">
              <h3 className="card-user-name">{user.name}</h3>
              <p className="card-user-handle">@{user.username}</p>
            </div>
          </div>

          {/* User Details Body */}
          <div className="card-details-body">
            {/* Company */}
            <div className="card-info-row">
              <div className="info-icon" title="Company">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div className="info-text">
                <span className="info-label">Company</span>
                <span className="info-val company-val">
                  {user.company?.name || "N/A"}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="card-info-row">
              <div className="info-icon" title="Email">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="info-text">
                <span className="info-label">Email</span>
                <a
                  href={`mailto:${user.email}`}
                  className="info-link"
                  title={`Send email to ${user.email}`}
                >
                  {user.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="card-info-row">
              <div className="info-icon" title="Phone">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="info-text">
                <span className="info-label">Phone</span>
                <a
                  href={`tel:${user.phone}`}
                  className="info-link"
                  title={`Call ${user.phone}`}
                >
                  {user.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Card Footer Action */}
          <div className="card-footer-action">
            <Link
              to={`/users/${user.id}`}
              className="card-view-btn"
              title={`View full profile of ${user.name}`}
            >
              <span>View Details</span>
              <svg
                width="15"
                height="15"
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
        </article>
      ))}
    </div>
  );
}

export default UserCards;
