import "../Style/SearchBar.css";

/* SEARCH BAR COMPONENT */

function SearchBar({ search, onSearchChange }) {
  return (
    <div className="search-box">
      <label htmlFor="user-search" className="search-label">
        Search Users
      </label>

      <div className="search-input-wrapper">
        {/* Search Icon */}
        <span className="search-icon" aria-hidden="true">
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>

        {/* Input Field */}
        <input
          id="user-search"
          type="text"
          placeholder="Search by name or email address..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="search-input"
          autoComplete="off"
        />

        {/* Quick Clear Button (Only visible if input has text) */}
        {search && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange("")}
            title="Clear search"
            aria-label="Clear search input"
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
