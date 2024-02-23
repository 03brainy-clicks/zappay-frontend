"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  WalletIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authState } from "@/app/recoil/atoms/AuthAtom";
import { fetchUserDetails } from "@/app/query/QueryFunctions";
import { useQuery } from "@tanstack/react-query";
import { userState } from "@/app/recoil/atoms/UserAtom";

const Navigation = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  // Function to handle user logout
  const handleLogout = () => {
    router.push("/");
    setAuth({ JWT: "", auth: false, userId: "" });
    setUser({});
  };

  return (
    <>
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 w-full">
        <div className="md:w-10/12 lg:w-9/12 w-full p-5 flex md:justify-between items-center gap-2 mx-auto">
          {/* Logo */}
          <h1 className="text-white font-bold flex gap-1 items-center logo text-lg">
            Zap <WalletIcon className="w-7 text-orange-600" />
          </h1>

          {/* Conditional rendering of navigation based on authentication status */}
          {auth?.auth ? (
            <AuthenticatedRoutes
              auth={auth}
              setUser={setUser}
              handleLogout={handleLogout}
            />
          ) : (
            <UnauthenticatedRoutes />
          )}
        </div>
      </div>
    </>
  );
};

// Component for Authenticated Routes
const AuthenticatedRoutes = ({ auth, setUser, handleLogout }) => {
  const path = usePathname();

  // Fetch user details using React Query
  const { isLoading, error, data } = useQuery({
    queryKey: ["userDetails", auth, setUser],
    queryFn: () => fetchUserDetails(auth, setUser),
  });

  const [menuToggle, setMenuToggle] = useState(false);

  // Array of routes for authenticated users
  const routes = [
    { route: "Dashboard", path: "/dashboard" },
    { route: "Transactions", path: "/transactions" },
    { route: "Profile", path: "/profile" },
  ];

  // Function to toggle the mobile menu
  const handleToggle = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-5 mx-auto">
        {routes.map((item) => (
          <Link href={item.path} key={item.route}>
            <div
              className={`text-sm font-light text-white py-1 border-b animate cursor-pointer ${
                path.includes(item.path)
                  ? "border-orange-600"
                  : "border-transparent"
              }`}
            >
              {item.route}
            </div>
          </Link>
        ))}
      </div>

      {/* User Details Section (visible on desktop) */}
      <div className="sm:flex hidden gap-3 text-white">
        <Link href="/profile">
          <div className="w-7 h-7 rounded-full border  flex items-center justify-center">
            <span>{data?.firstName[0]}</span>
          </div>
        </Link>
        <div className="block">
          <h4 className="text-xs font-bold leading-3">
            {data?.firstName} {data?.lastName}
          </h4>
          <span className="text-xs font-thin uppercase">{data?.username}</span>
        </div>
        <div className="flex items-center">
          {/* Logout Button */}
          <ArrowRightStartOnRectangleIcon
            onClick={handleLogout}
            className="w-5 text-gray-500 hover:text-red-600 animate cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <>
        {/* Mobile Menu Icon */}
        <div className="flex gap-3 text-white sm:hidden ml-auto">
          <div className="w-7 h-7 rounded-full border  flex items-center justify-center">
            <span>{data?.firstName[0]}</span>
          </div>
          <ArrowRightStartOnRectangleIcon
            onClick={handleLogout}
            className="w-5 text-gray-500 hover:text-red-600 animate cursor-pointer"
          />
        </div>

        {/* Mobile Menu (visible on small screens) */}
        <div className="sm:hidden block">
          <Bars3Icon
            onClick={handleToggle}
            className="w-7 text-orange-600"
          />
          {menuToggle && (
            <div className="w-screen h-screen absolute z-50 bg-black text-white top-0 left-0 p-5 flex flex-col ">
              <div className="pb-5">
                {/* Close Menu Icon */}
                <XMarkIcon
                  onClick={handleToggle}
                  className="w-6 text-orange-600 float-right"
                />
              </div>
              <div className="flex-1 w-full flex flex-col items-center justify-center ">
                <div className="flex flex-col gap-5 text-center">
                  {/* Mobile Menu Items */}
                  {routes.map((item) => (
                    <Link href={item.path} key={item.route}>
                      <div
                        onClick={handleToggle}
                        className={`text-sm font-light py-1 text-white border-b animate cursor-pointer ${
                          path.includes(item.path)
                            ? "border-orange-600"
                            : "border-transparent"
                        }`}
                      >
                        {item.route}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
};

// Component for Unauthenticated Routes
const UnauthenticatedRoutes = () => {
  return (
    <>
      <div className="flex gap-5 items-center ml-auto">
        {/* Login Link */}
        <Link href={"/auth/signin"}>
          <div
            className={`text-sm font-light text-white py-1 border-b border-transparent hover:border-orange-600 animate cursor-pointer`}
          >
            Login
          </div>
        </Link>{" "}
        
        {/* Get Started Button */}
        <Link href={"/auth/signup"}>
          <button className="py-2 text-sm bg-orange-600 text-white px-5 rounded">
            Get Started
          </button>
        </Link>
      </div>
    </>
  );
};

// Export the Navigation component
export default Navigation;
