import React from 'react';
import './style.css';

const ReusableInput = ({
  type,
  value,
  onChange,
  placeholder,
  icon,
  id,
  error,
  required = false,
  toggleVisibilityIcon,
  togglePasswordVisibility,
  onBlur,
}) => (
  <div className={`input-box ${error ? 'input-box-error' : ''}`}>
    <span className="input-icon">{icon}</span>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      placeholder={placeholder}
      className={error ? 'input-error' : ''}
    />
    {toggleVisibilityIcon && (
      <span
        className="input-eye-icon"
        onClick={togglePasswordVisibility}
      >
        {toggleVisibilityIcon}
      </span>
    )}
    {error && <div className="error-message">{error}</div>}
  </div>
);

export default ReusableInput;
