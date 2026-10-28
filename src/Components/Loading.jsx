import "../Style/Loading.css";

/* LOADING COMPONENT */

function Loading({ message = "Connecting to JSONPlaceholder API..." }) {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="loading-card">
        <div className="spinner-wrapper">
          <div className="loading-spinner"></div>
        </div>
        <h3 className="loading-title">Loading User Records</h3>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
}

export default Loading;
