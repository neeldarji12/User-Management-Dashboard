import { Link } from "react-router-dom";
import "../Style/UserTable.css";

 //* USER TABLE COMPONENT
function UserTable({ users }) {
  // Helper to extract 1 or 2 letter initials from a user's full name
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="user-table-card">
      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Company</th>
              <th scope="col">City</th>
              <th scope="col" className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {/* User column: Avatar + Full Name + Username */}
                <td>
                  <div className="user-profile-cell">
                    <div className="user-table-avatar" aria-hidden="true">
                      {getInitials(user.name)}
                    </div>
                    <div className="user-table-identity">
                      <span className="user-fullname">{user.name}</span>
                      <span className="user-username">@{user.username}</span>
                    </div>
                  </div>
                </td>

                {/* Email with mailto */}
                <td>
                  <a
                    href={`mailto:${user.email}`}
                    className="table-link email-link"
                    title={`Send email to ${user.email}`}
                  >
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
                    <span>{user.email}</span>
                  </a>
                </td>

                {/* Phone with tel */}
                <td>
                  <a
                    href={`tel:${user.phone}`}
                    className="table-link phone-link"
                    title={`Call ${user.phone}`}
                  >
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
                    <span>{user.phone}</span>
                  </a>
                </td>

                {/* Company */}
                <td>
                  <div className="company-cell">
                    <span className="company-name">{user.company?.name || "N/A"}</span>
                  </div>
                </td>

                {/* City Badge */}
                <td>
                  <span className="city-badge">
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
                </td>

                {/* Action button */}
                <td className="text-right">
                  <Link
                    to={`/users/${user.id}`}
                    className="view-details-button"
                    title={`View profile of ${user.name}`}
                  >
                    <span>View Details</span>
                    <svg
                      width="14"
                      height="14"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
