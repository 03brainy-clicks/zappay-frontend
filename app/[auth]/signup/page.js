"use client";
// Import necessary modules and components
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import axios from "axios";
import {
  validateName,
  validatePassword,
  validateUsername,
} from "@/app/utils/ValidationFunctions"; // Assuming this path is correct, check if it's accurate

// Define the functional component for the signup page
const Page = () => {
  // State variables for form input and error handling
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    firstNameErr: false,
    lastNameErr: false,
    usernameErr: false,
    passwordErr: false,
  });

  const router = useRouter();

  // Reset form input fields
  const handleReset = useCallback(() => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
  }, []);

  // Handle the signup process
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate input fields
    const usernameValid = validateUsername(username);
    const firstNameValid = validateName(firstName);
    const lastNameValid = validateName(lastName);
    const passwordValid = validatePassword(password);

    // Set error states based on validation results
    setError({
      firstNameErr: !firstNameValid,
      lastNameErr: !lastNameValid,
      usernameErr: !usernameValid,
      passwordErr: !passwordValid,
    });

    // If all fields are valid, proceed with signup
    if (usernameValid && firstNameValid && lastNameValid && passwordValid) {
      try {
        // Make a POST request to the signup API endpoint
        const response = await axios.post(
          "https://paytm-clone-backend-production.up.railway.app/api/users/signup",
          { firstName, lastName, username, password }
        );

        // Get data from the response
        const data = await response.data;

        // Reset form fields and navigate to the signin page
        handleReset();
        console.log(data);
        router.push("/auth/signin");
      } catch (error) {
        // Log any errors that occur during the signup process
        console.error(error);
      }
    }
  };

  // JSX for the signup form
  return (
    <div className="w-screen h-screen flex items-center p-5 justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 p-5 rounded bg-white">
        <h2 className="font-bold text-2xl mb-2 tracking-tight flex items-center justify-center gap-1">
          Sign Up
        </h2>
        <p className="text-gray-600 text-center">
          To make smooth transactions!
        </p>
        <form action="" className="space-y-2 mt-5">
          {/* First Name Input */}
          <div>
            <label htmlFor="firstName" className="text-xs font-medium">
              First Name
            </label>
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

          {/* Last Name Input */}
          <div>
            <label htmlFor="lastName" className="text-xs font-medium">
              Last Name
            </label>
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

          {/* Username Input */}
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
                Username must be between 4 and 19 characters.
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="text-xs font-medium">
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
          </div>

          {/* Signup and Reset buttons */}
          <div className="pt-3 clas flex items-center gap-3">
            <button
              onClick={handleSignup}
              className="py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium w-1/2"
            >
              Sign up
            </button>
            <button
              onClick={handleReset}
              className="py-2 text-sm border border-orange-600 text-orange-600 px-5 rounded font-medium w-1/2"
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

        {/* Already have an account? Login link */}
        <p className="text-center text-xs">
          Already have an account?{" "}
          <Link href={"/auth/signin"}>
            <span className="text-orange-600 cursor-pointer">Login</span>
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

// Export the component as the default export
export default Page;
