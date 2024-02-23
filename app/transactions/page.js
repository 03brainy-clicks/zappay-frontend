// Import necessary dependencies
"use client";
import React from "react";
import TransactionCard from "../components/cards/TransactionCard";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { fetchTransactions } from "../query/QueryFunctions";
import { authState } from "../recoil/atoms/AuthAtom";

// Define the functional component 'Page'
const Page = () => {
  // Retrieve authentication state using Recoil
  const auth = useRecoilValue(authState);

  // Use React Query to fetch transactions data
  const { isLoading, error, data } = useQuery({
    queryKey: ["transactions", auth],
    queryFn: () => fetchTransactions(auth),
  });
  
  return (
    // Main content container with Tailwind CSS classes
    <div className="w-full md:w-10/12 lg:w-9/12  h-screen p-5 overflow-hidden mx-auto">
      <div className="pt-16 h-full">
        <div className="flex flex-col gap-5 h-full">
          {/* Title for the transactions section */}
          <div className="text-sm text-white">Transactions</div>
          
          {/* Container for displaying transaction cards with scrollbar */}
          <div className="text-sm space-y-2  h-full overflow-y-scroll">
            {/* Map through the 'data' array and render TransactionCard component for each transaction */}
            {data?.map((transaction) => (
              <TransactionCard
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the 'Page' component for use in other parts of the application
export default Page;
