import React from 'react';

const CustomModal = ({id, isVisible, onClose, title, children, scrollable }) => {
  return (
    <div
      id={id}
      className={`modal fade ${isVisible ? 'show d-block' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: isVisible ? 'rgba(0,0,0,0.5)' : 'transparent' }}
    >
      <div className={`modal-dialog modal-xl ${scrollable}`}
      style={{padding:"10px"}}
      role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
