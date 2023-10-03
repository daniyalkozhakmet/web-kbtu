import React from "react";

export const Spinner = () => {
  return (
    <div
      className="spinner-border d-flex justify-content-between align-items-center"
      role="status"
      style={{
        position: "relative",
        translate: "(-50%, -50%)",
        top: "50%",
        left: "45%",
        height:'150px',width:"150px"
      }}
    >
      <span className="sr-only" ></span>
    </div>
  );
};
