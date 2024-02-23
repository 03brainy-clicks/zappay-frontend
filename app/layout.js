// Import the Inter font from Google Fonts
import { Inter } from "next/font/google";

// Import global styles from the "globals.css" file
import "./globals.css";

// Import components and wrappers
import QueryWrapper from "./query/QueryWrapper";
import RecoilWrapper from "./recoil/RecoilWrapper";
import Navigation from "./components/layout/Navigation";

// Create an instance of the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata for the website
export const metadata = {
  title: "ZapPay",
  description: "Pay anyone anytime anywhere",
};

// Define the RootLayout component
export default function RootLayout({ children }) {
  return (
    // HTML document structure with lang attribute
    <html lang="en">
      <body className={`${inter.className} bg-black background`}>
        {/* Wrap the application with Recoil and React Query providers */}
        <RecoilWrapper>
          <QueryWrapper>
            {/* Render the navigation component */}
            <Navigation />
            
            {/* Render the main content */}
            {children}
          </QueryWrapper>
        </RecoilWrapper>
      </body>
    </html>
  );
}
