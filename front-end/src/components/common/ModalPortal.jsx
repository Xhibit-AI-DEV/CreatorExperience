import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children, isOpen }) => {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    // Create modal root if it doesn't exist
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      document.body.appendChild(root);
    }
    setModalRoot(root);

    // Cleanup function
    return () => {
      if (root && root.childNodes.length === 0) {
        document.body.removeChild(root);
      }
    };
  }, []);

  if (!modalRoot || !isOpen) {
    return null;
  }

  return createPortal(children, modalRoot);
};

export default ModalPortal; 