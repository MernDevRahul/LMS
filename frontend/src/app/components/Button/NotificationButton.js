import React from 'react'
  
export default function NotificationButton({ NotificationCount,onClick,Label }) {
    return (
      <button
        onClick={onClick}
        className="btn btn-outline-primary mx-1"
        style={{ position: "relative" }}
        title={`You have ${NotificationCount} follow-ups for today.\nClick here to view all.`}
      >
        {Label}{" "}
        {NotificationCount > 0 && (
          <span
            style={{ position: "absolute", right: "-10px", top: "-10px" }}
            className="text-light text-center bg-danger rounded-pill px-2"
          >
            {NotificationCount}
          </span>
        )}
      </button>
    );
  }
  
