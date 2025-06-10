import React from 'react'

const BooleanButton = ({ disable,booleanValue, onClick,Yes,No }) => {
    return (
      <button
        className={`btn ${booleanValue ? "btn-outline-primary" : "btn-outline-danger"} rounded-0 w-100`}
        onClick={onClick}
        disabled={disable}
      >
        {booleanValue ? Yes||"Yes" : No||"No"}
      </button>
    );
  };
  
  export default BooleanButton;
  
