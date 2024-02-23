// Import necessary dependencies
"use client";
import React, { useState, useEffect, useRef } from "react";

// Define the 'DropDown' component
const DropDown = ({ title, value, options, setValue, icon }) => {
  // State to manage the visibility of the dropdown
  const [toggle, setToggle] = useState(false);

  // Ref to track the dropdown container for detecting clicks outside
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown visibility
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  // Function to handle option selection
  const handleSelect = (selectedOption) => {
    setValue(selectedOption);
    handleToggle(); // Close the dropdown after selecting an option
  };

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown container
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setToggle(false); // Close the dropdown if clicked outside
    }
  };

  // Effect to add and remove event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // Main container for the dropdown
    <div className=" w-full rounded">
      <div
        className="relative w-full rounded "
        ref={dropdownRef}
      >
        {/* Dropdown header (toggle button) */}
        <div
          onClick={handleToggle}
          className="py-2 bg-orange-600  flex items-center gap-1 justify-center text-white px-2 rounded-md text-sm w-full "
        >
          {icon && icon} {value}
        </div>

        {/* Dropdown content */}
        {toggle && (
          <div className="z-50 absolute top-10 w-full m-0 p-0  rounded-md">
            {/* Display options in the dropdown */}
            <div className="flex flex-col gap-1  p-2 rounded-md text-xs bg-[#0f0f0f] w-full  ">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className="p-1 px-2 rounded-md hover:bg-gray-800 bg-black text-white"
                >
                  {option.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Export the 'DropDown' component for use in other parts of the application
export default DropDown;
