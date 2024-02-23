import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// TransactionDetailsCard component receives a transaction object and a callback to close the modal
const TransactionDetailsCard = ({ transaction, onClose }) => {
  // Destructure properties from the transaction object
  const { amount, receiver, sender, action, transactionId } = transaction;

  // JSX for the TransactionDetailsCard component
  return (
    <div className="w-[80vw]">
      {/* Header section with title and close icon */}
      <h1 className="font-medium mb-3 flex justify-between items-center">
        <span>Transaction Details</span>{" "}
        {/* Close icon that triggers the onClose callback */}
        <XMarkIcon
          className="w-5 cursor-pointer hover:text-red-600"
          onClick={() => onClose(false)}
        />
      </h1>
      
      {/* Details about the transaction */}
      <h4 className="text-sm">
        Amount: &nbsp;
        {/* Display the transaction amount with appropriate color based on action */}
        <span className={`${action === "send" ? "text-red-600" : "text-green-600"}`}>
          ₹ {amount}
        </span>
      </h4>
      <h4 className="text-sm">Sender: {sender}</h4>
      <h4 className="text-sm">Receiver: {receiver}</h4>
      <h4 className="text-sm">Transaction ID: {transactionId}</h4>
    </div>
  );
};

// Export the TransactionDetailsCard component
export default TransactionDetailsCard;
