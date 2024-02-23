"use client";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const PasswordCard = ({ auth }) => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState({
    newPassErr: false,
    confirmPassErr: false,
  });
  const router = useRouter();

  const handleReset = useCallback(() => {
    setConfirmPass("");
    setNewPass("");
    setError({
      newPassErr: false,
      confirmPassErr: false,
    });
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    // Password requirements
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    const newPassValid =
      newPass.length >= 8 &&
      passwordRegex.test(newPass) &&
      newPass === confirmPass;
    const confirmPassValid = newPass === confirmPass;

    setError({
      newPassErr: !newPassValid,
      confirmPassErr: !confirmPassValid,
    });

    if (newPassValid && confirmPassValid) {
      try {
        // API call to update the password
        const response = await axios.put(
          `https://paytm-clone-backend-production.up.railway.app/api/users/resetpassword/${auth.userId}`,
          {
            currentPassword: currentPass,
            updatedPassword: newPass,
          },
          {
            headers: {
              Authorization: auth.JWT,
            },
          }
        );
        router.push("/");
      } catch (error) {
        console.error("Password update failed:", error);
        // Additional error handling can be added here, e.g., show an error message to the user
      }
    }
  };

  // JSX for rendering the password update form
  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-5 rounded bg-white">
        <form action="" className="space-y-3">
          {/* Input for current password */}
          <div>
            <input
              type="password"
              name="currentPass"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              placeholder="Current Password"
              className="w-full rounded text-sm py-1 px-2 outline-orange-600 border"
            />
          </div>
          {/* Input for new password with validation messages */}
          <div>
            <input
              type="password"
              name="newPass"
              value={newPass}
              placeholder="New Password"
              onChange={(e) => setNewPass(e.target.value)}
              className={`w-full rounded text-sm py-1 px-2 outline-orange-600 border ${
                error.newPassErr ? "border-red-600" : ""
              }`}
            />
            {error.newPassErr && (
              <p className="text-xs mt-1 text-red-600">
                Password must be at least 8 characters long and contain at least
                one special character and one number.
              </p>
            )}
          </div>
          {/* Input for confirming new password with validation messages */}
          <div>
            <input
              type="password"
              name="confirmPass"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm Password"
              className={`w-full rounded text-sm py-1 px-2 outline-orange-600 border ${
                error.confirmPassErr ? "border-red-600" : ""
              }`}
            />
            {error.confirmPassErr && (
              <p className="text-xs mt-1 text-red-600">
                Passwords do not match.
              </p>
            )}
          </div>
          {/* Button for updating the password */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleUpdatePassword}
              className={`py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium `}
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordCard;
