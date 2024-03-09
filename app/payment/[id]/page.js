"use client";
import React, { useState } from "react";
import axios from "axios";
import { WalletIcon } from "@heroicons/react/24/outline";
import { useRecoilValue } from "recoil";
import { useParams, useRouter } from "next/navigation";
import { authState } from "@/app/recoil/atoms/AuthAtom";

const PaymentModelCard = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState(0);
  const auth = useRecoilValue(authState);
  const router = useRouter();

  const handlePay = async (e) => {
    e.preventDefault();

    try {
      if (amount && id) {
        const transferDetails = { receiver: id, amount };
        const response = await axios.post(
          "https://paytm-clone-backend-production.up.railway.app/api/account/transfer",
          transferDetails,
          {
            headers: {
              Authorization: auth.JWT,
            },
          }
        );
        const data = await response.data;
        console.log("Transaction successful ", data);
        setAmount(0);
        router.push("/dashboard");
      } else {
        // Handle case where amount or id is not present
        console.log("Invalid amount or receiver ID");
      }
    } catch (error) {
      console.log("Transaction failed ", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center p-5 justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/4 p-5 rounded bg-white">
        <h1 className="font-bold flex gap-1 items-center">
          Zap <WalletIcon className="w-6 text-orange-600" />
        </h1>
        <form className="space-y-2 mt-3">
          <div>
            <label htmlFor="amount" className="text-xs font-medium">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg text-sm py-1 px-2 outline-orange-600 border"
            />
          </div>
          <div className="pt-3 clas flex items-center gap-3">
            <button
              onClick={handlePay}
              className="py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium w-1/2"
            >
              Pay
            </button>{" "}
            <button className="py-2 text-sm border border-orange-600 text-orange-600 px-5 rounded font-medium w-1/2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(PaymentModelCard);
