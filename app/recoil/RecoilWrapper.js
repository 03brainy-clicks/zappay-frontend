"use client"
import { RecoilRoot } from "recoil";

// Define a wrapper component to provide Recoil state management to the app
const RecoilWrapper = ({ children }) => {
  // Wrap the application with RecoilRoot to enable Recoil state management
  return <RecoilRoot>{children}</RecoilRoot>;
};

// Export the RecoilWrapper component for use in other parts of the application
export default RecoilWrapper;
