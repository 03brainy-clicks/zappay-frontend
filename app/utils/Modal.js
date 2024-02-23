// Import necessary dependencies
"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

// Define the 'Modal' component
const Modal = ({ isOpen, onClose, children }) => {
  // State to track whether the component is rendered in the browser
  const [isBrowser, setIsBrowser] = useState(false);

  // Ref to track the modal container for detecting clicks outside
  const modalRef = useRef();

  // Set isBrowser to true on component mount
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add/remove event listener based on modal state
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup function to remove the event listener when modal unmounts or closes
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Render modal content using ReactDOM.createPortal
  const modalContent = isOpen && isBrowser && (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-80 z-50"></div>
      <div ref={modalRef} className="z-50 bg-white p-5 rounded shadow-md">
        {children}
      </div>
    </div>
  );

  // Use ReactDOM.createPortal to render modal content into the document body
  return isBrowser ? ReactDOM.createPortal(modalContent, document.body) : null;
};

export default Modal;
