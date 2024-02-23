"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/app/recoil/atoms/UserAtom";

// UserCard component receives auth object as a prop
const UserCard = ({ auth }) => {
  // Retrieve user state and setUser function from Recoil state
  const [user, setUser] = useRecoilState(userState);

  // State variables for first name, last name, and error handling
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [error, setError] = useState({
    firstNameErr: false,
    lastNameErr: false,
  });

  // Reset the form fields and error states
  const handleReset = useCallback(() => {
    setFirstName("");
    setLastName("");
    setError({
      firstNameErr: false,
      lastNameErr: false,
    });
  }, []);

  // Handle user update functionality
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate first name and last name
    const firstNameValid = firstName.length >= 1 && firstName.length <= 20;
    const lastNameValid = lastName.length >= 1 && lastName.length <= 20;

    // Set error states based on validation
    setError({
      firstNameErr: !firstNameValid,
      lastNameErr: !lastNameValid,
    });

    // If both first name and last name are valid, send update request
    if (firstNameValid && lastNameValid) {
      try {
        const response = await axios.put(
          `https://paytm-clone-backend-production.up.railway.app/api/users/update/${auth.userId}`,
          {
            firstName,
            lastName,
          },
          {
            headers: {
              Authorization: auth.JWT,
            },
          }
        );
        const data = await response.data;

        // Update Recoil user state with new data
        setUser({ ...user, firstName: firstName, lastName: lastName });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // JSX for the UserCard component
  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-5 rounded bg-white">
        <form className="space-y-3">
          {/* Display username */}
          <div className=" text-sm uppercase font-medium">
            <span>{user.username}</span>
          </div>
          {/* Input field for first name */}
          <div>
            <input
              type="text"
              name="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full rounded text-sm py-1 px-2 outline-orange-600 border ${
                error.firstNameErr ? "border-red-600" : ""
              }`}
            />
            {error.firstNameErr && (
              <p className="text-xs mt-1 text-red-600">
                First name must be between 1 and 20 characters.
              </p>
            )}
          </div>
          {/* Input field for last name */}
          <div>
            <input
              type="text"
              name="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full rounded text-sm py-1 px-2 outline-orange-600 border ${
                error.lastNameErr ? "border-red-600" : ""
              }`}
            />
            {error.lastNameErr && (
              <p className="text-xs mt-1 text-red-600">
                Last name must be between 1 and 20 characters.
              </p>
            )}
          </div>
          {/* Button for updating user information */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleUpdate}
              className={`py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium `}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export the UserCard component
export default UserCard;
