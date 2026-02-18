import React from 'react';

const ModalLayout = ({ children, onClose }) => (
  <div className="modal-backdrop">
    <div className="modal">
      <button className="modal-close" onClick={onClose}>×</button>
      {children}
    </div>
  </div>
);

export default ModalLayout;
