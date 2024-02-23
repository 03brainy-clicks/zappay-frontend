"use client";
import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-screen h-screen flex items-center p-5 justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2  lg:w-2/5 p-5 rounded-lg bg-white">
        <h2 className="font-bold text-2xl mb-2 tracking-tight flex items-center justify-center gap-1">
          Reset Your Password
        </h2>
        <p className="text-gray-600 text-center">
          Forgot your password? no problem reset it in two steps.
        </p>
        <>
          <form action="" className="space-y-2 mt-5">
            <div>
              <label htmlFor="username" className="text-xs font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full rounded-lg text-sm py-1 px-2 outline-orange-600 border"
              />
            </div>{" "}
            <div className="pt-3 clas flex items-center gap-3">
              <button className="py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium w-1/2">
                Reset Password
              </button>{" "}
              <button className="py-2 text-sm border border-orange-600 text-orange-600 px-5 rounded font-medium w-1/2">
                Reset
              </button>
            </div>
          </form>
          <div className="flex items-center gap-3">
            <div className="border-b flex-1 "> </div>
            <p className="text-center text-xs py-3 text-gray-500">OR</p>
            <div className="border-b flex-1"> </div>
          </div>
          <p className="text-center text-xs">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"}>
              <span className="text-orange-600 cursor-pointer">Resgister</span>
            </Link>
            .
          </p>
        </>
        <form className="space-y-2 mt-5">
          <div>
            <label htmlFor="newpassword" className="text-xs font-medium">
              New Password
            </label>
            <input
              type="text"
              name="username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg text-sm py-1 px-2 outline-orange-600 border"
            />
          </div>{" "}
          <div>
            <label htmlFor="confirmpassword" className="text-xs font-medium">
              Confirm Password
            </label>
            <input
              type="text"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg text-sm py-1 px-2 outline-orange-600 border"
            />
          </div>{" "}
          <div className="pt-3 clas flex items-center gap-3">
            <button className="py-2 text-sm bg-orange-600 text-white px-5 rounded font-medium w-1/2">
              Reset Password
            </button>{" "}
            <button className="py-2 text-sm border border-orange-600 text-orange-600 px-5 rounded font-medium w-1/2">
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
