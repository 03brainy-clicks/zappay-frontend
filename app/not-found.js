// Import necessary dependencies
import React from "react";
import PageNotFound from "../public/404.svg";
import Image from "next/image";

// Define the NotFound component
const NotFound = () => {
  return (
    // Main container with Tailwind CSS classes
    <div className="w-full md:w-10/12 lg:w-9/12 mx-auto h-screen p-5 overflow-hidden">
      <div className="pt-16 h-full text-white flex items-center justify-center">
        {/* Render the 404 image using the Next.js Image component */}
        <Image
          src={PageNotFound}
          alt="404"
          className="md:w-1/2 mx-auto mb-10"
        />
      </div>
    </div>
  );
};

// Export the NotFound component for use in other parts of the application
export default NotFound;
