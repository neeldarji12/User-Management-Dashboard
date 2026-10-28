import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import { getUsers } from "../services/userService";

import SearchBar from "../Components/SearchBar";
import CityFilter from "../Components/CityFilter";
import UserTable from "../Components/UserTable";
import UserCards from "../Components/UserCards";
import Pagination from "../Components/Pagination";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";

import "../Style/Dashboard.css";

// Display 6 users / employees per page for optimal grid alignment
const USERS_PER_PAGE = 6;


function Dashboard() {
 
    
  // 1. Raw users array fetched from JSONPlaceholder API
  const [users, setUsers] = useState([]);

  // 2. Controlled search string (case-insensitive search by name or email)
  const [search, setSearch] = useState("");

  // 3. Selected city filter string ("" represents "All Cities")
  const [selectedCity, setSelectedCity] = useState("");

  // 4. Current pagination page number (1-based index)
  const [currentPage, setCurrentPage] = useState(1);

  // 5. Asynchronous network state indicators
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 6. View Mode layout toggle: "cards" (User Cards Grid) or "table" (Table)
  const [viewMode, setViewMode] = useState("cards");


  // DATA FETCHING (API Integration)
  
  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(
        err.message || "Failed to load users from API. Please verify network."
      );
    } finally {
      setLoading(false);
    }
  }

  // Fetch users when the dashboard component first mounts
  useEffect(() => {
    let isMounted = true;

    async function initialLoad() {
      try {
        setError("");
        const data = await getUsers();
        if (isMounted) {
          setUsers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.message || "Failed to load users from API. Please verify network."
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
  }, []);

 
  // COMPUTED VALUES (Derived State)
  
  // Requirement 4: Dynamic city dropdown based on cities present in records
  const cities = useMemo(() => {
    const cityList = users
      .map((user) => user.address?.city)
      .filter(Boolean);
    return [...new Set(cityList)].sort();
  }, [users]);

  // Requirement 3 & 4: Compound filtering by Name/Email and City
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      // Name or Email matching (case-insensitive)
      const nameMatches = user.name?.toLowerCase().includes(query);
      const emailMatches = user.email?.toLowerCase().includes(query);
      const matchesSearch = query === "" || nameMatches || emailMatches;

      // City filter matching
      const matchesCity =
        selectedCity === "" || user.address?.city === selectedCity;

      return matchesSearch && matchesCity;
    });
  }, [users, search, selectedCity]);

  // Requirement 5: Calculate total pages for 5 users per page
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  );

  // Slice the filtered array to get users for the active page
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  
  // EVENT HANDLERS (Requirement 9: Reset pagination on filter change)

  function handleSearchChange(value) {
    setSearch(value);
    setCurrentPage(1); // Reset to page 1
  }

  function handleCityChange(city) {
    setSelectedCity(city);
    setCurrentPage(1); // Reset to page 1
  }

  function handleClearFilters() {
    setSearch("");
    setSelectedCity("");
    setCurrentPage(1); // Reset to page 1
  }

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll back to table/cards top
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  }

  const hasActiveFilters = search.trim() !== "" || selectedCity !== "";

  
  
  // CONDITIONAL RENDERING: LOADING & ERROR STATES (Requirement 8)
 
  
  if (loading) {
    return (
      <main className="dashboard-container">
        <Loading message="Fetching users list from JSONPlaceholder API..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-container">
        <ErrorMessage
          title="API Request Failed"
          message={error}
          onRetry={loadUsers}
        />
      </main>
    );
  }

  // MAIN DASHBOARD UI
  return (
    <main className="dashboard-container">
      {/* Breadcrumb Navigation */}
      <nav className="dashboard-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Users Directory</span>
      </nav>

      {/* Header Banner & Stats */}
      <section className="dashboard-heading">
        <div className="heading-content">
          <div className="dashboard-eyebrow">
            <span>APPLEN SOLUTIONS</span>
            <span className="eyebrow-divider">•</span>
            <span className="eyebrow-tag">Live REST API</span>
          </div>

          <h1>User Management Directory</h1>

          <p className="dashboard-description">
            Filter, search, and paginate through public user records. Click on any record to view comprehensive details.
          </p>
        </div>

        {/* Quick Stats Metric Cards */}
        <div className="dashboard-metrics">
          <div className="metric-card">
            <span className="metric-label">Total Users</span>
            <strong className="metric-value">{users.length}</strong>
            <span className="metric-subtext">From API</span>
          </div>

          <div className="metric-card">
            <span className="metric-label">Matching</span>
            <strong className="metric-value highlight">{filteredUsers.length}</strong>
            <span className="metric-subtext">Active records</span>
          </div>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <section className="filter-panel">
        <div className="filter-header">
          <div className="filter-title-group">
            <h2>Filter & Search</h2>
            <p>Refine users by name, email, or company headquarters city</p>
          </div>

          {/* Requirement 9: Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              className="clear-filters-btn active"
              onClick={handleClearFilters}
              title="Reset all search and city filters"
            >
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
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              <span>Clear All Filters</span>
            </button>
          )}
        </div>

        {/* Search & City Dropdown Controls */}
        <div className="filter-controls">
          <SearchBar
            search={search}
            onSearchChange={handleSearchChange}
          />

          <CityFilter
            cities={cities}
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
          />
        </div>

        {/* Active Filter Chips/Tags (Quick Remove) */}
        {hasActiveFilters && (
          <div className="active-chips-container">
            <span className="chips-label">Active Filters:</span>
            {search.trim() !== "" && (
              <span className="filter-chip">
                <span>Search: &ldquo;{search}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  aria-label="Remove search filter"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedCity !== "" && (
              <span className="filter-chip">
                <span>City: {selectedCity}</span>
                <button
                  type="button"
                  onClick={() => handleCityChange("")}
                  aria-label="Remove city filter"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}
      </section>

      {/* Results Section */}
      <section className="results-section">
        {/* Results Controls Header (Count + Layout Mode Toggle) */}
        {filteredUsers.length > 0 && (
          <div className="results-header-bar">
            <div className="results-count-meta">
              <span className="results-badge">Directory View</span>
              <p className="results-count-text">
                Showing <strong>{currentUsers.length}</strong> of{" "}
                <strong>{filteredUsers.length}</strong> matching records
              </p>
            </div>

            {/* View Mode Switcher: Cards / Table */}
            <div className="view-mode-toggle" role="group" aria-label="Layout view mode">
              <button
                type="button"
                className={`view-mode-btn ${viewMode === "cards" ? "active" : ""}`}
                onClick={() => setViewMode("cards")}
                title="Card Grid View"
                aria-pressed={viewMode === "cards"}
              >
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
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                <span>Cards</span>
              </button>

              <button
                type="button"
                className={`view-mode-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
                title="Table View"
                aria-pressed={viewMode === "table"}
              >
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
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <span>Table</span>
              </button>
            </div>
          </div>
        )}

        {/* Requirement 8: No results message when filters match no records */}
        {filteredUsers.length === 0 ? (
          <div className="no-results-card">
            <div className="no-results-icon">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="m8 11 6 0" />
              </svg>
            </div>

            <h3>No Matching Users Found</h3>

            <p>
              We couldn&apos;t find any users matching your criteria
              {search && <span> with keyword &ldquo;<strong>{search}</strong>&rdquo;</span>}
              {selectedCity && <span> located in &ldquo;<strong>{selectedCity}</strong>&rdquo;</span>}.
            </p>

            <button
              type="button"
              className="reset-search-btn"
              onClick={handleClearFilters}
            >
              Reset Filters & View All Users
            </button>
          </div>
        ) : (
          <>
            {/* View Mode Switch: User Cards Grid or User Table */}
            {viewMode === "cards" ? (
              <UserCards users={currentUsers} />
            ) : (
              <UserTable users={currentUsers} />
            )}

            {/* Requirement 5: 5 users per page pagination with prev/next & indicators */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredUsers.length}
              pageSize={USERS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
