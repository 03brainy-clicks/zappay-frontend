"use client";
import React, { useState } from "react";
import DropDown from "../utils/DropDown";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import UserDetailCard from "../components/cards/UserDetailCard";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/atoms/AuthAtom";
import { fetchAccountBalance, fetchUsers } from "../query/QueryFunctions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Page = () => {
  // State for filtering users
  const [filter, setFilter] = useState({ value: "all", title: "All" });
  // State for storing users data
  const [usersData, setUsersData] = useState([]);
  // State for search input
  const [search, setSearch] = useState("");
  // Get authenticated user information
  const auth = useRecoilValue(authState);

  // Query to fetch account balance
  const {
    isLoading: loadingBalance,
    error: balanceError,
    data: account,
  } = useQuery({
    queryKey: ["userAccountBalance", auth],
    queryFn: () => fetchAccountBalance(auth),
  });

  // Query to fetch users list
  const {
    isLoading: usersLoading,
    error: usersError,
    data: users,
  } = useQuery({
    queryKey: ["users", auth],
    queryFn: () => fetchUsers(auth),
  });

  // Function to handle user search
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "https://paytm-clone-backend-production.up.railway.app/api/users/",
        {
          params: {
            filterBy: filter.value,
            filterValue: search,
          },
          headers: {
            Authorization: auth.JWT,
          },
        }
      );
      setUsersData(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle the error as needed
    }
  };

  // Dropdown filter options
  const filterOptions = [
    { value: "all", title: "All" },
    {
      value: "username",
      title: "User name",
    },
    {
      value: "firstName",
      title: "First Name",
    },
    {
      value: "lastName",
      title: "Last Name",
    },
  ];

  return (
    <div className="w-full md:w-10/12 lg:w-9/12 mx-auto h-screen p-5 overflow-hidden">
      <div className="pt-16 h-full">
        <div className="flex flex-col gap-5 h-full">
          {/* Display account balance */}
          <div className="text-sm text-white">
            Account Balance :{" "}
            <span className="text-orange-600">{account?.accountBalance}</span>
          </div>
          {/* Filter and search input */}
          <div className="flex gap-3 items-center">
            <div className="max-w-32 w-full">
              <DropDown
                options={filterOptions}
                value={filter.title}
                setValue={setFilter}
                icon={<FunnelIcon className="w-5" />}
              />
            </div>
            <input
              type="text"
              className="py-1 px-2 bg-transparent rounded w-full outline-orange-600 border bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="p-2 text-sm bg-orange-600 text-white rounded font-medium"
            >
              <MagnifyingGlassIcon className="w-5" />
            </button>{" "}
          </div>
          {/* Display list of users */}
          <div className="text-sm text-white mt-4">Users</div>
          <div className="text-sm space-y-2 h-full overflow-y-scroll">
            {/* Check if filtered data exists, otherwise display all users */}
            {usersData.length > 0 ? (
              <>
                {usersData?.map((user) => {
                  if (user._id !== auth.userId) {
                    return <UserDetailCard key={user._id} user={user} />;
                  }
                })}
              </>
            ) : (
              <>
                {users?.map((user) => {
                  if (user._id !== auth.userId) {
                    return <UserDetailCard key={user._id} user={user} />;
                  }
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
