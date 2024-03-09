"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  validatePassword,
  validateUsername,
} from "@/app/utils/ValidationFunctions"; // Import the necessary validation function for username

const Page = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggle, setToggle] = useState(false);

  // Separate error states for username and userId
  const [errors, setErrors] = useState({
    userName: false,
    userId: false,
  });

  // Separate error states for password and confirmPassword
  const [errorsPasswords, setErrorsPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  // Reset error states
  const resetErrors = () => {
    setErrors({
      userName: false,
      userId: false,
    });
    setErrorsPasswords({
      password: false,
      confirmPassword: false,
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Validate input fields for password reset
    const passwordValid = validatePassword(password);
    const confirmPasswordValid = validatePassword(password, confirmPassword);

    // Set error states for password and confirmPassword
    setErrorsPasswords({
      password: !passwordValid,
      confirmPassword: !confirmPasswordValid,
    });

    // If all fields are valid, proceed with the password reset
    if (passwordValid && confirmPasswordValid) {
      // Your password reset logic here
    }
  };

  const handleCheckAccount = (e) => {
    e.preventDefault()
    // Validate input fields for checking account
    const userNameValid = validateUsername(userName);
    const userIdValid = userId; // Placeholder for actual validation

    // Set error states for username and userId
    setErrors({
      userName: !userNameValid,
      userId: !userIdValid,
    });

    // Reset password-related errors when checking account

    // If all fields are valid, proceed with checking the account
    if (userNameValid && userIdValid) {
      // Your check account logic here
    } else {
      setErrorsPasswords({
        password: false,
        confirmPassword: false,
      });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center p-5 justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/4 p-5 rounded bg-white">
        <h2 className="font-bold text-2xl mb-2 tracking-tight flex items-center justify-center gap-1">
          Reset Your Password
        </h2>
        <p className="text-gray-600 text-center">
          Forgot your password? No problem, reset it in two steps.
        </p>

        {toggle ? (
          <>
            {/* Form for new password */}
            <form className="space-y-2 mt-5">
              {/* New Password Input */}
              <div>
                <label htmlFor="newpassword" className="text-xs font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  name="newpassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-lg text-sm py-1 px-2 outline-orange-600 border ${
                    errorsPasswords.password ? "border-red-600" : ""
                  }`}
                />
                {errorsPasswords.password && (
                  <p className="text-xs mt-1 text-red-600">
                    {/* Add error message for password validation */}
                  </p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="text-xs font-medium"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full rounded-lg text-sm py-1 px-2 outline-orange-600 border ${
                    errorsPasswords.confirmPassword ? "border-red-600" : ""
                  }`}
                />
                {errorsPasswords.confirmPassword && (
                  <p className="text-xs mt-1 text-red-600">
                    {/* Add error message for confirmPassword validation */}
                  </p>
                )}
              </div>

              {/* Buttons for new password */}
              <div className="pt-3 clas flex items-center gap-3">
                <button
                  onClick={handleResetPassword}
                  className="py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium w-1/2"
                >
                  Reset Password
                </button>
                <button
                  className="py-2 text-sm border border-orange-600 text-orange-600 px-5 rounded font-medium w-1/2"
                  onClick={() => setToggle(false)}
                >
                  Back
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* Form for username and userId */}
            <form action="" className="space-y-2 mt-5">
              {/* Username Input */}
              <div>
                <label htmlFor="username" className="text-xs font-medium">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className={`w-full rounded-lg text-sm py-1 px-2 outline-orange-600 border ${
                    errors.userName ? "border-red-600" : ""
                  }`}
                />
                {errors.userName && (
                  <p className="text-xs mt-1 text-red-600">
                    Username must be between 4 and 19 characters.
                  </p>
                )}
              </div>

              {/* UserId Input */}
              <div>
                <label htmlFor="userId" className="text-xs font-medium">
                  User ID
                </label>
                <input
                  type="text"
                  name="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className={`w-full rounded-lg text-sm py-1 px-2 outline-orange-600 border ${
                    errors.userId ? "border-red-600" : ""
                  }`}
                />
                {errors.userId && (
                  <p className="text-xs mt-1 text-red-600">
                    {/* Add error message for userId validation */}
                  </p>
                )}
              </div>

              {/* Buttons for password reset */}
              <div className="pt-3 clas flex items-center gap-3">
                <button
                  onClick={handleCheckAccount}
                  className="py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium w-1/2"
                >
                  Check Account
                </button>
                <button
                  className="py-2 text-sm border border-orange-600 text-orange-600 px-5 rounded font-medium w-1/2"
                  onClick={() => setToggle(true)}
                >
                  Reset
                </button>
              </div>
            </form>
            {/* Separator and Login link */}
            <div className="flex items-center gap-3">
              <div className="border-b flex-1 "> </div>
              <p className="text-center text-xs py-3 text-gray-500">OR</p>
              <div className="border-b flex-1"> </div>
            </div>
            <p className="text-center text-xs">
              Don&apos;t have an account?{" "}
              <Link href={"/signup"}>
                <span className="text-orange-600 cursor-pointer">Register</span>
              </Link>
              .
            </p>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
