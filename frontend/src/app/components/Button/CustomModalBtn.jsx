import React from 'react';

const ModalButton = ({ handleClick, modalId, children, onClose }) => {
  return (
    <button
      className="btn btn-primary me-1"
      onClick={() =>{ handleClick(modalId)}}
    >
      {children}
    </button>
  );
};

export default ModalButton;
