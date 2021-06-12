import React from "react";

const Radio = ({ name, id, value, label }) => {
  return (
    <div>
      <input
        style={{ cursor: "pointer" }}
        className="form-check-input"
        type="radio"
        name={name}
        id={id}
        value={value}
      />
      <label
        style={{ cursor: "pointer" }}
        className="form-check-label"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Radio;
