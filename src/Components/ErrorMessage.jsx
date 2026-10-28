import "../Style/ErrorMessage.css";

/* ERROR MESSAGE COMPONENT */
 
function ErrorMessage({
  title = "Failed to Fetch Data",
  message = "Something went wrong while connecting to the users API.",
  onRetry,
}) {
  return (
    <div className="error-container" role="alert" aria-live="assertive">
      <div className="error-card">
        {/* Warning / Error Icon */}
        <div className="error-icon-circle">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h3 className="error-title">{title}</h3>
        <p className="error-text">{message}</p>

        {onRetry && (
          <button
            type="button"
            className="error-retry-btn"
            onClick={onRetry}
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
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
