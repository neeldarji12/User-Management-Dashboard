import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getUserById } from "../services/userService";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";

import "../Style/UserDetails.css";

/* USER DETAILS PAGE (/users/:id) — PROFILE CARD VIEW8*/

function UserDetails() {
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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

  // Helper to extract 2-letter user initials
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
      {/* Top Navigation Bar */}
      <nav className="details-nav">
        <Link to="/users" className="back-link">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Back to Users Directory</span>
        </Link>

        <div className="breadcrumb-info">
          <span>Users</span>
          <span className="crumb-slash">/</span>
          <span className="crumb-active">{user.name}</span>
        </div>
      </nav>

      {/* MASTER USER PROFILE CARD */}
      <article className="user-profile-master-card">
        {/* Cover Gradient Banner */}
        <div className="card-cover-banner">
          <span className="cover-badge">APPLEN ID #{user.id}</span>
          <span className="cover-city-tag">📍 {user.address?.city}</span>
        </div>

        {/* Profile Card Header Info */}
        <div className="card-header-body">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar-circle" aria-hidden="true">
              {initials}
            </div>
            <span className="avatar-status-badge" title="Active User"></span>
          </div>

          <div className="profile-identity">
            <div className="identity-title-row">
              <h1 className="profile-full-name">{user.name}</h1>
              <span className="verified-check" title="Verified Record">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </span>
            </div>

            <p className="profile-username">@{user.username}</p>

            <p className="profile-company-role">
              Works at <strong>{user.company?.name}</strong> • Based in{" "}
              <strong>{user.address?.city}</strong>
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="profile-quick-actions">
            <a
              href={`mailto:${user.email}`}
              className="quick-btn primary-quick-btn"
              title={`Send email to ${user.email}`}
            >
              <svg
                width="16"
                height="16"
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
              <span>Email</span>
            </a>

            <a
              href={`tel:${user.phone}`}
              className="quick-btn secondary-quick-btn"
              title={`Call ${user.phone}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call</span>
            </a>

            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noreferrer noopener"
              className="quick-btn secondary-quick-btn"
              title={`Visit ${user.website}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>Website</span>
            </a>
          </div>
        </div>

        {/* Card Content Divider */}
        <div className="card-divider"></div>

        {/* Card Sections Body */}
        <div className="card-sections-container">
          {/* Section 1: Personal & Contact Information */}
          <section className="card-inner-section">
            <div className="section-title-bar">
              <div className="section-title-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3>Personal & Contact Information</h3>
            </div>

            <div className="info-fields-grid">
              <div className="info-field">
                <span className="field-label">Full Name</span>
                <span className="field-data font-semibold">{user.name}</span>
              </div>

              <div className="info-field">
                <span className="field-label">Username</span>
                <span className="field-data">@{user.username}</span>
              </div>

              <div className="info-field">
                <span className="field-label">Email Address</span>
                <a href={`mailto:${user.email}`} className="field-link">
                  {user.email}
                </a>
              </div>

              <div className="info-field">
                <span className="field-label">Phone Number</span>
                <a href={`tel:${user.phone}`} className="field-link">
                  {user.phone}
                </a>
              </div>

              <div className="info-field span-full">
                <span className="field-label">Official Website</span>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="field-link external"
                >
                  <span>https://{user.website}</span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* Section 2: Address & Location */}
          <section className="card-inner-section">
            <div className="section-title-bar">
              <div className="section-title-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3>Address & Location</h3>
            </div>

            <div className="info-fields-grid">
              <div className="info-field">
                <span className="field-label">Street Address</span>
                <span className="field-data">{user.address?.street}</span>
              </div>

              <div className="info-field">
                <span className="field-label">Suite / Apartment</span>
                <span className="field-data">{user.address?.suite}</span>
              </div>

              <div className="info-field">
                <span className="field-label">City</span>
                <span className="field-data">{user.address?.city}</span>
              </div>

              <div className="info-field">
                <span className="field-label">Zip Code</span>
                <span className="field-data">{user.address?.zipcode}</span>
              </div>

              {/* Geo Coordinates with Map Action */}
              {user.address?.geo && (
                <div className="info-field span-full">
                  <span className="field-label">Geographical Coordinates</span>
                  <div className="coordinates-pill-box">
                    <span className="coords-code">
                      Lat: {user.address.geo.lat} • Lng: {user.address.geo.lng}
                    </span>
                    {mapsUrl && (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="map-action-pill"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                          <line x1="9" y1="3" x2="9" y2="18" />
                          <line x1="15" y1="6" x2="15" y2="21" />
                        </svg>
                        <span>View on Google Maps</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section 3: Company & Employment */}
          <section className="card-inner-section">
            <div className="section-title-bar">
              <div className="section-title-icon">
                <svg
                  width="18"
                  height="18"
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
              <h3>Company & Organization</h3>
            </div>

            <div className="info-fields-grid three-col">
              <div className="info-field">
                <span className="field-label">Company Name</span>
                <span className="field-data company-name-highlight">
                  {user.company?.name}
                </span>
              </div>

              <div className="info-field">
                <span className="field-label">Catchphrase</span>
                <span className="field-data catchphrase-quote">
                  &ldquo;{user.company?.catchPhrase}&rdquo;
                </span>
              </div>

              <div className="info-field">
                <span className="field-label">Business Domain (BS)</span>
                <span className="field-data">{user.company?.bs}</span>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}

export default UserDetails;
