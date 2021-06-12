import React from "react";

const Radio = ({ name, id, value, label }) => {
  return (
    <div>
      <input
        style={{ cursor: "pointer" }}
        class="form-check-input"
        type="radio"
        name={name}
        id={id}
        value={value}
      />
      <label style={{ cursor: "pointer" }} class="form-check-label" for={id}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
