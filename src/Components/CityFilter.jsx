import "../Style/CityFilter.css";

/**
 * ============================================================================
 * CITY FILTER COMPONENT
 * ============================================================================
 * Features:
 *   - Dynamically generated city options extracted from loaded API data
 *   - Custom styled select with chevron indicator
 *   - 'All Cities' reset option
 * ============================================================================
 */
function CityFilter({ cities, selectedCity, onCityChange }) {
  return (
    <div className="city-filter">
      <label htmlFor="city-filter" className="city-label">
        Filter by City {cities.length > 0 && `(${cities.length})`}
      </label>

      <div className="city-select-wrapper">
        <select
          id="city-filter"
          value={selectedCity}
          onChange={(event) => onCityChange(event.target.value)}
          className={`city-select ${selectedCity ? "city-select-active" : ""}`}
        >
          <option value="">All Cities (Worldwide)</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Custom Chevron SVG */}
        <span className="city-select-chevron" aria-hidden="true">
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
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default CityFilter;
