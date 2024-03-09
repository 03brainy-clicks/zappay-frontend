"use client";
import React from "react";
import UserCard from "../components/cards/UserCard";
import PasswordCard from "../components/cards/PasswordCard";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/atoms/AuthAtom";

const Page = () => {
  // Get authentication state using Recoil
  const auth = useRecoilValue(authState);

  return (
    <div className="w-full h-screen p-5 overflow-hidden">
      <div className="pt-16 h-full">
        {/* Container for user-related components */}
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/4 p-5 rounded mx-auto flex flex-col gap-5" >
          {/* UserCard component for managing user details */}
          <UserCard auth={auth} />
          
          {/* PasswordCard component for updating passwords */}
          <PasswordCard auth={auth} />
        </div>
      </div>
    </div>
  );
};

export default Page;
