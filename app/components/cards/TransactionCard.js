// Import necessary modules
"use client";
import Modal from "@/app/utils/Modal";
import React, { useState } from "react";
import TransactionDetailsCard from "./TransactionDetailsCard";

// TransactionCard component receives a transaction object
const TransactionCard = ({ transaction }) => {
  // Destructure properties from the transaction object
  const { amount, action, transactionId } = transaction;

  // State to manage the modal open/close state
  const [isModalOpen, setModalOpen] = useState(false);

  // JSX for the TransactionCard component
  return (
    <>
      {/* Transaction card container, clickable to toggle the modal */}
      <div
        onClick={() => setModalOpen(!isModalOpen)}
        className="text-white flex gap-5 text-sm items-center border-b border-zap-lightBlack hover:bg-zap-hoverBlack p-2 cursor-pointer"
      >
        {/* Icon or indicator for the transaction */}
        <div className="w-7 h-7 rounded-full border  flex items-center justify-center">
          <span>T</span>
        </div>
        {/* Details section of the transaction card */}
        <div className="flex justify-between flex-1">
          <div>
            {/* Transaction ID label */}
            <h4>Transaction ID</h4>
            {/* Display a shortened version of the transaction ID */}
            <span className="text-xs line-clamp-1 uppercase">
              {transactionId.slice(0, 8)}
            </span>
          </div>
          <div className="text-right">
            {/* Display the transaction amount with appropriate color based on action */}
            <span className={`${action === "send" ? "text-red-600" : "text-green-600"}`}>
              ₹ {amount}
            </span>
          </div>
        </div>
      </div>

      {/* Modal component that displays detailed transaction information */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <TransactionDetailsCard transaction={transaction} onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  );
};

// Export the TransactionCard component
export default TransactionCard;
