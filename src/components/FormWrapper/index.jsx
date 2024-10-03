import React from 'react';
import './style.css';

const ReusableForm = ({ title, children, onSubmit, submitText, loading, authError }) => (
  <div className="form-box">
    <h2>{title}</h2>
    <form id={`${title.toLowerCase()}-form`} onSubmit={onSubmit}>
      {children}
      <button type="submit" className="form-btn" disabled={loading}>
        {loading ? 'Processing...' : submitText}
      </button>
      {authError && <p className="error-message">Error: {authError}</p>}
    </form>
  </div>
);

export default ReusableForm;
