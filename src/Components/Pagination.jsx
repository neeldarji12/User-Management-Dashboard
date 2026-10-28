import "../Style/Pagination.css";

/**
 * ============================================================================
 * PAGINATION COMPONENT
 * ============================================================================
 * Provides user-friendly page navigation controls:
 *   - Previous / Next buttons with disable states
 *   - Direct numeric page buttons (e.g. [1] [2])
 *   - Accessible page indicator
 * ============================================================================
 */
function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 6,
  onPageChange,
}) {
  // Generate array of page numbers [1, 2, ..., totalPages]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Calculate items range indicator
  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="pagination-container" aria-label="Pagination Navigation">
      {/* Records Summary */}
      <div className="pagination-summary">
        {totalItems > 0 ? (
          <span>
            Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of{" "}
            <strong>{totalItems}</strong> users
          </span>
        ) : (
          <span>No records to display</span>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="pagination-controls">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn nav-btn"
          aria-label="Previous page"
        >
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
          <span>Previous</span>
        </button>

        {/* Page Number Buttons */}
        <div className="pagination-pages">
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`page-num-btn ${currentPage === page ? "active" : ""}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn nav-btn"
          aria-label="Next page"
        >
          <span>Next</span>
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
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
