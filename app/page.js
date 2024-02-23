// Import necessary dependencies
import Image from "next/image";
import Transaction from "../public/transaction.svg";

// Define the 'page' component
const page = () => {
  return (
    // Main container with Tailwind CSS classes
    <div className="w-9/12 mx-auto flex items-center min-h-screen  justify-center">
      <div>
        {/* Render the 'Transaction' image using the Next.js Image component */}
        <Image
          src={Transaction}
          alt="Transaction"
          className="md:w-1/2 mx-auto mb-10"
        />
        
        {/* Render a heading */}
        <h1 className="text-white text-center text-4xl font-bold">
          Make Payments Fast, Easy and Secure.
        </h1>
      </div>
    </div>
  );
};

// Export the 'page' component for use in other parts of the application
export default page;
