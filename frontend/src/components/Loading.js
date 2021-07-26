import React from "react";

const Loading = () => {
  return (
    <div>
      <div style={{ height: "6vh" }}></div>
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem", color: "#0b528cee" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
