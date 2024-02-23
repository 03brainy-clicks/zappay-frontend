"use client";

import { useState } from "react";
import { WalletIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  validatePassword,
  validateUsername,
} from "@/app/utils/ValidationFunctions";
import { useSetRecoilState } from "recoil";
import { authState } from "@/app/recoil/atoms/AuthAtom";

const SigninPage = () => { // Updated component name to reflect its purpose
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    usernameErr: false,
    passwordErr: false,
  });
  const setAuth = useSetRecoilState(authState);
  const router = useRouter();

  // Resetting the state
  const handleReset = () => {
    setUsername("");
    setPassword("");
  };

  // Signin function
  const handleSignin = async (e) => {
    e.preventDefault();
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);

    setError({
      usernameErr: !usernameValid,
      passwordErr: !passwordValid,
    });

    if (usernameValid && passwordValid) {
      try {
        // API call to authenticate user
        const response = await axios.post(
          "https://paytm-clone-backend-production.up.railway.app/api/users/signin",
          { username, password }
        );
        const data = await response.data;

        // Reset form, set authentication state, and navigate to dashboard
        handleReset();
        setAuth({
          JWT: `Bearer ${data.token}`,
          auth: true,
          userId: data.userId,
        });
        router.push("/dashboard");
      } catch (error) {
        console.error("Signin failed:", error);
        // Additional error handling can be added here, e.g., show an error message to the user
      }
    }
  };

  // JSX for rendering the signin form
  return (
    <div className="w-screen h-screen flex items-center p-5 justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 p-5 rounded bg-white">
        <h2 className="font-bold text-2xl mb-2 tracking-tight flex items-center justify-center gap-1">
          Welcome to Zap <WalletIcon className="w-8 text-orange-600" />
        </h2>
        <p className="text-gray-600 text-center">
          Quick, Fast and Secure payments
        </p>
        <form action="" className="space-y-2 mt-5">
          {/* Form fields with validation messages */}
          <div>
            <label htmlFor="username" className="text-xs font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full rounded text-sm py-1 px-2 outline-orange-600 border ${
                error.usernameErr ? "border-red-600" : ""
              }`}
            />
            {error.usernameErr && (
              <p className="text-xs mt-1 text-red-600">
                Username must be greater than 3 characters.
              </p>
            )}
          </div>
          {/* Password input with validation messages and reset link */}
          <div>
            <label htmlFor="firstName" className="text-xs font-medium">
              Password{" "}
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded text-sm py-1 px-2 outline-orange-600 border ${
                error.passwordErr ? "border-red-600" : ""
              }`}
            />
            {error.passwordErr && (
              <p className="text-xs mt-1 text-red-600">
                Password must be at least 8 characters long and contain at least
                one special character and one number.
              </p>
            )}
            <p className="text-xs mt-1">
              Forgot your password?{" "}
              <Link href={"/auth/reset-password"}>
                <span className="text-orange-600 cursor-pointer">Reset</span>
              </Link>
              .
            </p>
          </div>
          {/* Signin and Reset buttons */}
          <div className="pt-3 clas flex items-center gap-3">
            <button
              onClick={handleSignin}
              className="py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium w-1/2"
            >
              Login
            </button>{" "}
            <button
              onClick={handleReset}
              className="py-2 text-sm border border-orange-600 text-orange-600 px-5 rounded font-medium w-1/2"
            >
              Reset
            </button>
          </div>
        </form>
        {/* Separators and Registration link */}
        <div className="flex items-center gap-3">
          <div className="border-b flex-1 "> </div>
          <p className="text-center text-xs py-3 text-gray-500">OR</p>
          <div className="border-b flex-1"> </div>
        </div>
        <p className="text-center text-xs">
          Don&apos;t have an account?{" "}
          <Link href={"/auth/signup"}>
            <span className="text-orange-600 cursor-pointer">Register</span>
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SigninPage; 
