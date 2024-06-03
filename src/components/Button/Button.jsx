import React from "react";

export default function Btn({ onClick, text, type, className, disabled }) {
  return (
    <button
      type={type}
      className={`btn btn_submit ${className}`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
