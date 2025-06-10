import React from "react";

export default function Login({children}) {
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100 w-100">
      {/* Left Section (Hidden on Mobile) */}
      <div className="d-none d-md-flex flex-column align-items-center justify-content-center w-100 p-4 bg-white">
        <div className="mb-4" style={{ maxWidth: "240px", width: "100%" }}>
          <img
            src="/Logo/TechStack.png"
            alt="Telania Learning University"
            width={240}
            height={80}
            className="img-fluid"
          />
        </div>
        {/* <h6 className="text-primary text-center fw-semibold">Learning University</h6> */}
      </div>

      {/* Right Section (Takes Full Width on Mobile) */}
      <div
        className="d-flex right-div align-items-center justify-content-center w-100 w-md-50 p-4"
        // style={{  }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
