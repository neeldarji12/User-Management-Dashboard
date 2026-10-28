import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getUserById } from "../services/userService";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";

import "../Style/UserDetails.css";

/**
 * ============================================================================
 * USER DETAILS PAGE (/users/:id)
 * ============================================================================
 * Developer: Neel Darji | Applen Solutions
 * 
 * Functional Requirements:
 *   - Fetches individual user record by URL parameter (`id`) via getUserById(id)
 *   - Displays complete personal, address, company, and contact details
 *   - Provides navigational back link to return to the Users Directory (/users)
 *   - Includes loading, error, and not found handling
 * ============================================================================
 */
function UserDetails() {
  // Extract user ID from route parameter /users/:id
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the selected user's detailed information (e.g. for Retry button)
  async function loadUser() {
    try {
      setLoading(true);
      setError("");

      const data = await getUserById(id);
      setUser(data);
    } catch (err) {
      setError(
        err.message || `Unable to load details for user #${id}. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  }

  // Fetch user details when the component mounts or URL id changes
  useEffect(() => {
    let isMounted = true;

    async function initialLoad() {
      try {
        setError("");
        const data = await getUserById(id);
        if (isMounted) {
          setUser(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.message || `Unable to load details for user #${id}. Please try again.`
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initialLoad();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <main className="details-container">
        <Loading message={`Retrieving profile details for user #${id}...`} />
      </main>
    );
  }

  // Error state
  if (error || !user) {
    return (
      <main className="details-container">
        <Link to="/users" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Back to Users Directory</span>
        </Link>

        <ErrorMessage
          title="User Profile Not Found"
          message={error || `No user found matching ID #${id}.`}
          onRetry={loadUser}
        />
      </main>
    );
  }

  // Helper to extract user initials
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  // Google Maps URL using geo coordinates
  const mapsUrl =
    user.address?.geo?.lat && user.address?.geo?.lng
      ? `https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}`
      : null;

  return (
    <main className="details-container">
      {/* Back Link */}
      <nav className="details-nav">
        <Link to="/users" className="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Back to Users Directory</span>
        </Link>

        <div className="user-id-badge">
          <span>User ID #{user.id}</span>
        </div>
      </nav>

      {/* User Header Profile Card */}
      <section className="details-header-card">
        <div className="user-avatar-large" aria-hidden="true">
          {initials}
        </div>

        <div className="header-info">
          <div className="header-tags">
            <span className="profile-tag">Public API Record</span>
            <span className="city-pill">📍 {user.address?.city}</span>
          </div>

          <h1 className="user-name-title">{user.name}</h1>

          <div className="header-submeta">
            <span className="user-handle">@{user.username}</span>
            <span className="meta-dot">•</span>
            <span className="user-company-quick">{user.company?.name}</span>
          </div>
        </div>
      </section>

      {/* Detailed Information Grid */}
      <div className="details-sections-grid">
        {/* Section 1: Contact & Personal Info */}
        <section className="details-card">
          <div className="card-header">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2>Personal & Contact Information</h2>
          </div>

          <div className="details-grid">
            <div className="detail-field">
              <span className="field-label">Full Name</span>
              <p className="field-value highlight">{user.name}</p>
            </div>

            <div className="detail-field">
              <span className="field-label">Username</span>
              <p className="field-value">@{user.username}</p>
            </div>

            <div className="detail-field">
              <span className="field-label">Email Address</span>
              <p className="field-value">
                <a href={`mailto:${user.email}`} className="action-link">
                  {user.email}
                </a>
              </p>
            </div>

            <div className="detail-field">
              <span className="field-label">Phone Number</span>
              <p className="field-value">
                <a href={`tel:${user.phone}`} className="action-link">
                  {user.phone}
                </a>
              </p>
            </div>

            <div className="detail-field full-width">
              <span className="field-label">Official Website</span>
              <p className="field-value">
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="external-link"
                >
                  <span>https://{user.website}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Address Information */}
        <section className="details-card">
          <div className="card-header">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h2>Address & Location</h2>
          </div>

          <div className="details-grid">
            <div className="detail-field">
              <span className="field-label">Street Address</span>
              <p className="field-value">{user.address?.street}</p>
            </div>

            <div className="detail-field">
              <span className="field-label">Suite / Apt</span>
              <p className="field-value">{user.address?.suite}</p>
            </div>

            <div className="detail-field">
              <span className="field-label">City</span>
              <p className="field-value">{user.address?.city}</p>
            </div>

            <div className="detail-field">
              <span className="field-label">Zip Code</span>
              <p className="field-value">{user.address?.zipcode}</p>
            </div>

            {/* Geo Coordinates */}
            {user.address?.geo && (
              <div className="detail-field full-width">
                <span className="field-label">Geo Coordinates</span>
                <div className="geo-location-box">
                  <span className="geo-coordinates">
                    Lat: {user.address.geo.lat} | Lng: {user.address.geo.lng}
                  </span>
                  {mapsUrl && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="maps-button"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                        <line x1="9" y1="3" x2="9" y2="18" />
                        <line x1="15" y1="6" x2="15" y2="21" />
                      </svg>
                      <span>Open in Maps</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Company Information */}
        <section className="details-card full-grid-width">
          <div className="card-header">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h2>Company & Employment</h2>
          </div>

          <div className="details-grid three-columns">
            <div className="detail-field">
              <span className="field-label">Company Name</span>
              <p className="field-value company-title">{user.company?.name}</p>
            </div>

            <div className="detail-field">
              <span className="field-label">Catchphrase</span>
              <p className="field-value quote-text">&ldquo;{user.company?.catchPhrase}&rdquo;</p>
            </div>

            <div className="detail-field">
              <span className="field-label">Business Strategy (BS)</span>
              <p className="field-value">{user.company?.bs}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default UserDetails;
